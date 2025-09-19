import { Router } from "express"
import chalk from "chalk"
import fs from "fs-extra"
import path from "path"

const router = Router()

router.get("/", (req, res) => {
   res.json(/*req.initialFileTree*/)
})

router.get("/filetree", (req, res) => {
   res.json({
      filetree: [req.initialFileTree]
   })
})

router.post("/get/file/content", async (req, res) => {
   try {
   const { node, parent } = req.body
   const resourcePath = path.join(req.scannedWD, node.path)
   const content = await fs.readFile(resourcePath, "utf8")
   res.json({code: content, meta : {node, parent}})
   } catch (err) {
      console.error(chalk.grey(err.message))
      res.status(500).json(err.message)
   }
})


router.post("/save/file", async (req, res) => {
   try {
      const {content, filename, treeFileData} = req.body
      const saveToPath = path.resolve(req.scannedWD, ".." , treeFileData.path.map(pn => pn.name).join("/"))
      await fs.outputFile(saveToPath, content, "utf8")
      res.json("saved")
   } catch (err) {
      console.error(chalk.grey(err.message))
      res.status(500).json(err.message)
   }
})

export default router