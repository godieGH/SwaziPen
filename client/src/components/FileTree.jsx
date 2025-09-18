import { FaFile, FaRegFolder, FaFolder } from "react-icons/fa";
import React, { useState } from 'react';
import "@scss/FileTree.scss";

// Dummy file/folder data
const dummyFiles = [
  {
    name: 'src',
    type: 'folder',
    children: [
      { name: 'index.js', type: 'file' },
      { name: 'App.js', type: 'file' },
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'SideBar.js', type: 'file' },
          { name: 'Editor.js', type: 'file' },
        ],
      },
    ],
  },
  { name: 'package.json', type: 'file' },
  { name: 'vite.config.js', type: 'file' },
];

function FileTreeNode({ node }) {
  const [open, setOpen] = useState(false);

  const isFolder = node.type === 'folder';

  return (
    <div className="file-node">
      <div
        className={`file-node__label ${isFolder ? 'folder' : 'file'}`}
        onClick={() => isFolder && setOpen(!open)}
      >
        {isFolder ? (open ? <FaRegFolder/> : <FaFolder/>) : <FaFile color="#929292"/>} <span style={{padding: "0 5px"}}></span> {node.name}
      </div>
      {isFolder && open && node.children && (
        <div className="file-node__children">
          {node.children.map((child, idx) => (
            <FileTreeNode key={idx} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

function FileTree() {
  return (
    <div className="file-tree">
      {dummyFiles.map((node, idx) => (
        <FileTreeNode key={idx} node={node} />
      ))}
    </div>
  );
}

export default FileTree;