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
  if (!p) return '.';
  if (p === '.') return '.';
  return p.split(path.sep).join('/');
}

/**
 * scanDirectory now accepts opts.onNode(node) (optional) which will be called
 * after a node object is constructed (for both files and directories).
 * This is non-breaking: if no onNode passed, nothing happens.
 */
async function scanDirectory(dirPath, basePath, rootPath = basePath, opts = { followSymlinks: false }) {
  let stats;
  try {
    stats = await fs.lstat(dirPath);
  } catch (err) {
    throw err;
  }

  if (stats.isSymbolicLink() && !opts.followSymlinks) {
    const node = {
      id: generateId(dirPath, basePath),
      name: path.basename(dirPath),
      type: 'symlink',
      path: normalizeForOutput(path.relative(rootPath, dirPath) || '.'),
    };
    if (typeof opts.onNode === 'function') opts.onNode(node);
    return node;
  }

  const isDirectory = stats.isDirectory();
  const name = path.basename(dirPath);
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
      if (typeof opts.onNode === 'function') opts.onNode(node);
      return node;
    }

    const childPromises = children
      .filter(item => !item.startsWith('.'))
      .map(async item => {
        const childPath = path.join(dirPath, item);
        const resolvedChild = path.resolve(childPath);

        const rel = path.relative(rootPath, resolvedChild);
        if (rel.startsWith('..')) {
          const skipped = {
            id: generateId(resolvedChild, basePath),
            name: item,
            type: 'skipped',
            path: normalizeForOutput(path.relative(rootPath, resolvedChild) || '.'),
            reason: 'outside root (symlink or mount)',
          };
          if (typeof opts.onNode === 'function') opts.onNode(skipped);
          return skipped;
        }

        return scanDirectory(resolvedChild, basePath, rootPath, opts);
      });

    node.children = await Promise.all(childPromises);
  }

  if (typeof opts.onNode === 'function') opts.onNode(node);
  return node;
}

async function scanProject(projectPath, opts = { followSymlinks: false }) {
  const abs = path.resolve(projectPath);
  return await scanDirectory(abs, abs, abs, opts);
}

export default scanProject;