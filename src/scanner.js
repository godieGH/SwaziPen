import fs from 'fs-extra';
import path from 'path';
import { createHash } from 'crypto';

function generateId(dirPath, basePath, { hashLength = 8 } = {}) {
  const abs = path.resolve(dirPath);

  const rel = path.relative(basePath, dirPath) || '.';
  const parts = rel.split(path.sep).filter(Boolean);

  const rawName = parts.length ? parts.join('-') : path.basename(basePath) || 'root';
  const safeName = String(rawName).replace(/[^\w\-\.]/g, '_').slice(0, 200) || 'node';

  const hash = createHash('sha1').update(abs).digest('hex').slice(0, hashLength);

  return `${safeName}-${hash}`;
}

function normalizeForOutput(p) {
  // Use '.' for root, normalize separators to '/'
  if (!p) return '.';
  if (p === '.') return '.';
  return p.split(path.sep).join('/');
}

async function scanDirectory(dirPath, basePath, rootPath = basePath, opts = { followSymlinks: false }) {
  let stats;
  try {
    // use lstat so we can detect symlinks
    stats = await fs.lstat(dirPath);
  } catch (err) {
    // can't stat (permissions, broken symlink, etc.) — surface as a minimal node or skip
    throw err;
  }

  // if it's a symlink and we're not following symlinks, skip descending
  if (stats.isSymbolicLink() && !opts.followSymlinks) {
    return {
      id: generateId(dirPath, basePath),
      name: path.basename(dirPath),
      type: 'symlink',
      path: normalizeForOutput(path.relative(rootPath, dirPath) || '.'),
    };
  }

  const isDirectory = stats.isDirectory();
  const name = path.basename(dirPath);

  // compute path relative to the original root
  const relToRoot = path.relative(rootPath, dirPath) || '.';
  const relativePathForNode = normalizeForOutput(relToRoot);

  const id = generateId(dirPath, basePath);

  const node = {
    id,
    name,
    type: isDirectory ? 'folder' : 'file',
    path: relativePathForNode,
  };

  if (isDirectory) {
    let children;
    try {
      children = await fs.readdir(dirPath);
    } catch (err) {
      node.children = [];
      node.error = `readdir failed: ${err.message}`;
      return node;
    }

    const childPromises = children
      .filter(item => !item.startsWith('.')) // Exclude dotfiles
      .map(async item => {
        const childPath = path.join(dirPath, item);
        const resolvedChild = path.resolve(childPath);

        // Security check: ensure the resolved child is inside the rootPath
        const rel = path.relative(rootPath, resolvedChild);
        // If rel starts with '..' then the child is outside root (possible via symlink)
        if (rel.startsWith('..')) {
          return {
            id: generateId(resolvedChild, basePath),
            name: item,
            type: 'skipped',
            path: normalizeForOutput(path.relative(rootPath, resolvedChild) || '.'),
            reason: 'outside root (symlink or mount)',
          };
        }

        // Recurse with the same rootPath and options
        return scanDirectory(resolvedChild, basePath, rootPath, opts);
      });

    node.children = await Promise.all(childPromises);
  }

  return node;
}

async function scanProject(projectPath, opts = { followSymlinks: false }) {
  const abs = path.resolve(projectPath);
  return await scanDirectory(abs, abs, abs, opts);
}

export default scanProject;