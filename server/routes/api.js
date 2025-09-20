import { Router } from "express"
import chalk from "chalk"
import fs from "fs-extra"
import path from "path"

const router = Router()

// Helper: safe logging; logs only if req.quiet is falsy
function safeLog(req, colorFn, message, ...args) {
  if (!req.quiet) {
    console.log(colorFn(message), ...args)
  }
}

/**
 * Helpers
 */
// Compute repository base root (the code used to resolve everything with "..")
function getBaseRoot(scannedWD) {
  if (!scannedWD) throw new Error("Missing req.scannedWD")
  return path.resolve(scannedWD, "..")
}

// Join path segments provided as array of objects like [{name: 'a'}, {name: 'b'}]
// Validates the input shape and returns an array of safe names
function extractNamesFromPathArray(arr = []) {
  if (!Array.isArray(arr)) return []
  return arr.map((pn) => {
    // defensive: if pn is object with name property - coerce to string
    if (pn && typeof pn.name !== "undefined") return String(pn.name)
    // fallback: if pn is primitive already (older clients might send string array)
    return String(pn)
  })
}

// Resolve a target path under the base root and ensure it does not escape it.
// Throws an Error when resolved target is outside baseRoot.
function resolveAndValidateUnderBase(scannedWD, segments = []) {
  const baseRoot = getBaseRoot(scannedWD)
  const joined = segments.join(path.sep)
  const resolved = path.resolve(baseRoot, joined)

  const relative = path.relative(baseRoot, resolved)
  // If relative starts with ".." then resolved is outside baseRoot
  if (relative === "" || (!relative.split(path.sep)[0] || relative.split(path.sep)[0] === "")) {
    // relative === "" => same directory (allowed)
  }
  if (relative.split(path.sep).some((p) => p === "..")) {
    throw new Error(`Resolved path escapes base root: ${resolved}`)
  }
  // For extra safety avoid deleting/moving the base root itself in destructive endpoints
  return { baseRoot, resolved }
}

/**
 * Routes
 */

router.get("/", (req, res) => {
  // Return whatever middleware populated; preserve existing consumer contract.
  // If it's absent, return null (keeps response shape predictable instead of erroring).
  res.json(typeof req.initialFileTree !== "undefined" ? req.initialFileTree : null)
})

router.get("/filetree", (req, res) => {
  // Keep the original response shape: { filetree: [ req.initialFileTree ] }
  res.json({
    filetree: [typeof req.initialFileTree !== "undefined" ? req.initialFileTree : null]
  })
})

router.post("/get/file/content", async (req, res) => {
  try {
    const { node, parent, path: p } = req.body || {}
    const names = extractNamesFromPathArray(p)

    const { resolved: resourcePath } = resolveAndValidateUnderBase(req.scannedWD, names)

    const exists = await fs.pathExists(resourcePath)
    if (!exists) {
      const msg = `File not found: ${resourcePath}`
      safeLog(req, chalk.yellow, msg)
      return res.status(404).json(msg)
    }

    const content = await fs.readFile(resourcePath, "utf8")
    safeLog(req, chalk.green, `Served file content: ${resourcePath}`)
    // Preserve original success payload shape: { code: content, meta: { node, parent } }
    res.json({ code: content, meta: { node, parent } })
  } catch (err) {
    console.error(chalk.red(`Error in /get/file/content: ${err.message}`))
    res.status(500).json(err.message)
  }
})

router.post("/save/file", async (req, res) => {
  try {
    const { content, filename, treeFileData } = req.body || {}
    const names = extractNamesFromPathArray((treeFileData && treeFileData.path) || [])

    const { resolved: saveToPath } = resolveAndValidateUnderBase(req.scannedWD, names)

    // Write file (ensure parent directory exists)
    await fs.outputFile(saveToPath, content, "utf8")
    safeLog(req, chalk.green, `Saved file: ${saveToPath}`)
    // Preserve original success response ("saved")
    res.json("saved")
  } catch (err) {
    console.error(chalk.red(`Error in /save/file: ${err.message}`))
    res.status(500).json(err.message)
  }
})

router.post("/create/new/file", async (req, res) => {
  try {
    const { node, path: nodePath } = req.body || {}
    const names = extractNamesFromPathArray(nodePath)

    const { resolved: newFilePath } = resolveAndValidateUnderBase(req.scannedWD, names)

    await fs.ensureFile(newFilePath)
    safeLog(req, chalk.green, `Created file (ensured): ${newFilePath}`)
    // Keep original success response: empty string
    res.json("")
  } catch (err) {
    console.error(chalk.red(`Error in /create/new/file: ${err.message}`))
    res.json(err.message)
  }
})

router.post("/create/new/folder", async (req, res) => {
  try {
    const { node, path: nodePath } = req.body || {}
    const names = extractNamesFromPathArray(nodePath)

    const { resolved: newFolderPath } = resolveAndValidateUnderBase(req.scannedWD, names)

    await fs.ensureDir(newFolderPath)
    safeLog(req, chalk.green, `Created folder (ensured): ${newFolderPath}`)
    // Keep original success response: empty string
    res.json("")
  } catch (err) {
    console.error(chalk.red(`Error in /create/new/folder: ${err.message}`))
    res.json(err.message)
  }
})

router.post("/remove/dir/file/", async (req, res) => {
  try {
    const { node, path: nodePath } = req.body || {}
    const names = extractNamesFromPathArray(nodePath)

    const { baseRoot, resolved: reSourceToRemovePath } = resolveAndValidateUnderBase(req.scannedWD, names)

    // Prevent removing the base root itself
    const normalizedBase = path.normalize(baseRoot)
    const normalizedTarget = path.normalize(reSourceToRemovePath)
    if (normalizedBase === normalizedTarget) {
      const msg = `Refusing to remove base root: ${normalizedTarget}`
      safeLog(req, chalk.yellow, msg)
      return res.json(msg)
    }

    await fs.remove(reSourceToRemovePath)
    safeLog(req, chalk.green, `Removed resource: ${reSourceToRemovePath}`)
    // Keep original success response: empty string
    res.json("")
  } catch (err) {
    console.error(chalk.red(`Error in /remove/dir/file/: ${err.message}`))
    res.json(err.message)
  }
})

router.post("/rename/dir/file/", async (req, res) => {
  try {
    const { node, path: nodePath } = req.body || {}

    const names = extractNamesFromPathArray(nodePath)
    if (names.length === 0) {
      const msg = "Invalid nodePath for rename"
      safeLog(req, chalk.yellow, msg)
      return res.status(400).json({ error: msg })
    }

    // 1. Build source path
    const src = path.resolve(getBaseRoot(req.scannedWD), ...names)

    // 2. Compute destination path: same parent dir, new name
    const parentDir = path.dirname(src)
    const dest = path.join(parentDir, node && node.name ? String(node.name) : path.basename(src))

    safeLog(req, chalk.blueBright, "Rename requested")
    safeLog(req, chalk.blue, "SRC:", src)
    safeLog(req, chalk.blue, "DEST:", dest)

    // 3. Normalize paths
    const srcNorm = path.normalize(src)
    const destNorm = path.normalize(dest)

    // 4. Validate both are under base root
    const { baseRoot } = resolveAndValidateUnderBase(req.scannedWD, []) // will throw if scannedWD missing
    if (path.relative(baseRoot, srcNorm).split(path.sep).some((p) => p === "..")) {
      return res.status(400).json({ error: `Source path is outside base root: ${srcNorm}` })
    }
    if (path.relative(baseRoot, destNorm).split(path.sep).some((p) => p === "..")) {
      return res.status(400).json({ error: `Destination path is outside base root: ${destNorm}` })
    }

    // 5. Check if src exists
    const existsSrc = await fs.pathExists(srcNorm)
    if (!existsSrc) {
      return res.status(400).json({ error: `Source path does not exist: ${srcNorm}` })
    }

    // 6. Check if src and dest are same
    if (srcNorm === destNorm) {
      safeLog(req, chalk.yellow, "Source and destination are the same. No rename performed.")
      return res.status(200).json({ message: "Source and destination are the same. No rename needed." })
    }

    // 7. Move with overwrite = true
    await fs.move(srcNorm, destNorm, { overwrite: true })

    safeLog(req, chalk.green, `Rename successful: ${srcNorm} -> ${destNorm}`)
    // Preserve previous success response shape with added info (still 200)
    res.status(200).json({ message: "Rename successful", src: srcNorm, dest: destNorm })
  } catch (err) {
    console.error(chalk.red(`Rename error: ${err && err.message ? err.message : String(err)}`))
    res.status(500).json({ error: err.message || String(err) })
  }
})

router.post("/paste", async (req, res) => {
  try {
    const { node, path: clipboardPath, operation, srcPath, destPath, parent } = req.body || {}
    if (!node || !clipboardPath || !operation || !srcPath || !destPath) {
      return res.status(400).json({ error: "Missing required clipboard information" })
    }

    // Extract names arrays from clipboard paths
    const srcNames = extractNamesFromPathArray(srcPath)
    const destNames = extractNamesFromPathArray(destPath)

    const { baseRoot, resolved: srcResolved } = resolveAndValidateUnderBase(req.scannedWD, srcNames)
    const { resolved: destResolved } = resolveAndValidateUnderBase(req.scannedWD, destNames)

    safeLog(req, chalk.blueBright, "Paste requested", { operation, srcResolved, destResolved })

    // Validate source exists
    const srcExists = await fs.pathExists(srcResolved)
    if (!srcExists) {
      return res.status(404).json({ error: `Source does not exist: ${srcResolved}` })
    }

    // Make sure destination parent directory exists
    const parentOfDest = path.dirname(destResolved)
    await fs.ensureDir(parentOfDest)

    if (operation === "cut") {
      // Move operation
      // If dest is same as src, no-op
      const srcNorm = path.normalize(srcResolved)
      const destNorm = path.normalize(destResolved)
      if (srcNorm === destNorm) {
        safeLog(req, chalk.yellow, "Cut: source and destination are the same, skipping move")
        return res.status(200).json({ message: "Source and destination are the same. No action taken." })
      }

      await fs.move(srcResolved, destResolved, { overwrite: true })
      safeLog(req, chalk.green, `Moved (cut) ${srcResolved} → ${destResolved}`)
      return res.status(200).json({ message: "Cut successful", src: srcResolved, dest: destResolved })

    } else if (operation === "copy") {
      // Copy operation
      // If destination exists, you may decide whether to overwrite or not
      // Here let's overwrite
      await fs.copy(srcResolved, destResolved, { overwrite: true })
      safeLog(req, chalk.green, `Copied ${srcResolved} → ${destResolved}`)
      return res.status(200).json({ message: "Copy successful", src: srcResolved, dest: destResolved })
    } else {
      return res.status(400).json({ error: `Unsupported operation: ${operation}` })
    }
  } catch (err) {
    console.error(chalk.red(`Error in /paste: ${err && err.message ? err.message : String(err)}`))
    return res.status(500).json({ error: err.message || String(err) })
  }
})

export default router
