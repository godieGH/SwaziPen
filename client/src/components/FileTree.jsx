import {
   FaFile,
   FaRegFolder,
   FaFolder,
   FaLink,
   FaExclamationTriangle
} from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import React, { useState, useRef, useEffect } from "react";
import "@scss/FileTree.scss";

/*
  Reusable FileTree component
  - Accepts a prop `fileTree` (array) as immutable input.
  - Keeps an internal deep-cloned copy for local editing.
  - Exposes callbacks for actions:
      onDelete(payload), onCopy(payload), onCut(payload),
      onPaste(payload), onRename(payload), onNewFile(payload), onNewFolder(payload), onSelect(payload)

  Changes made:
  - Added a protective layer that disables interaction for any node that is NOT a "file" or "folder".
    Disabled nodes:
      - cannot be selected
      - cannot be renamed
      - do not show a menu button
      - cannot be used as menu target for new/copy/cut/paste/delete/rename actions
    Visual/accessibility cues:
      - disabled nodes get aria-disabled="true" and are not tabbable
      - CSS class "disabled" is added (you can style it in your SCSS)
*/

function uuid() {
   return "xxxx-xxxx-4xxx-yxxx-xxxx".replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
         v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
   });
}

function deepClone(node) {
   return JSON.parse(JSON.stringify(node));
}

function resolveName(children, name, type) {
   let base = name,
      i = 1;
   let exists = () =>
      children.some(child => child.name === name && child.type === type);
   while (exists()) {
      name = `${base}-copy${i > 1 ? i : ""}`;
      i++;
   }
   return name;
}

/* Minimal fallback fileTree */
const defaultFiles = [
   {
      id: "root-1",
      name: "My Project",
      type: "folder",
      children: [
         { id: "readme-1", name: "README.md", type: "file" },
         {
            id: "src-1",
            name: "src",
            type: "folder",
            children: [{ id: "index-1", name: "index.js", type: "file" }]
         }
      ]
   }
];

// Helpers to locate node, parent, index and path
function getNodeMeta(tree, id, parent = null, path = []) {
   for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      const currentPath = [
         ...path,
         { id: node.id, name: node.name, type: node.type }
      ];
      if (node.id === id) {
         return { node, parent, index: i, path: currentPath };
      }
      if (node.type === "folder" && node.children) {
         const res = getNodeMeta(node.children, id, node, currentPath);
         if (res) return res;
      }
   }
   return null;
}

function removeNode(tree, id) {
   for (let i = 0; i < tree.length; i++) {
      if (tree[i].id === id) {
         const removed = tree.splice(i, 1)[0];
         return removed;
      }
      if (tree[i].type === "folder" && tree[i].children) {
         const res = removeNode(tree[i].children, id);
         if (res) return res;
      }
   }
   return null;
}

/* Insert node into a destination array (handles name collision) */
function insertNodeIntoArray(destinationArray, node, insertIndex = undefined) {
   node.name = resolveName(destinationArray, node.name, node.type);
   if (
      insertIndex === undefined ||
      insertIndex === null ||
      insertIndex > destinationArray.length
   ) {
      destinationArray.push(node);
   } else {
      destinationArray.splice(insertIndex, 0, node);
   }
}

/* Utility: determine if node should be actionable (selectable, renamable, menuable) */
function isActionableNode(node) {
   // Only "file" and "folder" are actionable per requirement
   return node && (node.type === "file" || node.type === "folder");
}

/* FileTreeNode - presentational + interaction; relies on callbacks via parent FileTree */
function FileTreeNode({
   node,
   tree,
   setTree,
   openMenu,
   setOpenMenu,
   clipboard,
   setClipboard,
   renameId,
   setRenameId,
   renameValue,
   setRenameValue,
   parent,
   isRoot = false,
   selectedId,
   setSelectedId,
   onSelect,
   commitRename,
   openFolders, // Set of folder ids that should be open
   highlightedId // id of node to highlight (transient, e.g., after paste)
}) {
   const [open, setOpen] = useState(false);
   const inputRef = useRef(null);

   const actionable = isActionableNode(node);

   // auto-open if this node is considered root or if parent wants it open
   useEffect(() => {
      if (isRoot && actionable) setOpen(true);
   }, [isRoot, actionable]);

   // When the shared openFolders contains this node id, ensure this folder is open
   useEffect(() => {
      if (node.type === "folder" && openFolders && openFolders.has(node.id)) {
         setOpen(true);
      }
   }, [openFolders, node.id, node.type]);

   useEffect(() => {
      if (renameId === node.id && inputRef.current) inputRef.current.focus();
   }, [renameId, node.id]);

   const clickTimer = useRef();

   // Cut visual state: true when clipboard indicates this node is cut
   const isCut = clipboard && clipboard.cut && clipboard.originalId === node.id;

   function handleClick(e) {
      // if node is not actionable, ignore click
      if (!actionable) {
         e.stopPropagation();
         return;
      }

      clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => {
         if (node.type === "folder") {
            setOpen(o => !o);
         } else {
            setSelectedId && setSelectedId(node.id);
            if (typeof onSelect === "function") {
               const meta = getNodeMeta(tree, node.id);
               const payload = {
                  node: deepClone(meta ? meta.node : node),
                  parent: deepClone(meta ? meta.parent : parent),
                  path: meta
                     ? meta.path
                     : [{ id: node.id, name: node.name, type: node.type }],
                  index: meta ? meta.index : -1,
                  newTree: deepClone(tree)
               };
               onSelect(payload);
            }
         }
      }, 200);
   }

   function handleDoubleClick() {
      // only allow rename on actionable nodes
      if (!actionable) return;
      clearTimeout(clickTimer.current);
      setRenameId(node.id);
      setRenameValue(node.name);
   }

   function handleMenuBtn(e) {
      e.stopPropagation();
      // show menu only for actionable nodes
      if (!actionable) return;
      setOpenMenu({
         id: node.id,
         name: node.name,
         type: node.type,
         parent: parent
      });
   }

   function onRenameCommitLocal() {
      // If rename was attempted on a non-actionable node, just close
      if (!actionable) {
         setRenameId(null);
         setRenameValue("");
         return;
      }

      if (typeof commitRename === "function") {
         commitRename(node.id, renameValue);
      } else {
         // fallback local commit if parent commitRename not provided
         const meta = getNodeMeta(tree, node.id);
         if (!meta) {
            setRenameId(null);
            return;
         }
         const { node: actualNode, parent: actualParent } = meta;
         const siblings = actualParent
            ? (actualParent.children || []).filter(c => c.id !== node.id)
            : tree.filter(c => c.id !== node.id);
         const exists = siblings.some(
            child =>
               child.name === renameValue && child.type === actualNode.type
         );
         actualNode.name = exists
            ? resolveName(siblings, renameValue, actualNode.type)
            : renameValue;
         setTree([...tree]);
         setRenameId(null);
         setRenameValue("");
      }
   }

   const isSelected = selectedId === node.id;
   const isHighlighted = highlightedId === node.id;

   return (
      <div
         className={`file-node ${isRoot ? "root-node" : ""}`}
         tabIndex={actionable ? 0 : -1}
         aria-label={node.name}
         aria-disabled={!actionable}
         role="treeitem"
      >
         <div
            className={`file-node__label ${
               node.type === "folder" ? "folder" : "file"
            } ${isRoot ? "header" : ""} ${isSelected ? "selected" : ""} ${
               isCut ? "cut" : ""
            } ${isHighlighted ? "highlight" : ""} ${
               !actionable ? "disabled" : ""
            }`}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
         >
            {node.type === "folder" ? (
               open ? (
                  <FaRegFolder />
               ) : (
                  <FaFolder />
               )
            ) : node.type === "symlink" ? (
               <FaLink
                  color="#929292"
                  title="Symbolic link"
                  aria-label="symlink"
               />
            ) : node.type === "skipped" ? (
               <FaExclamationTriangle
                  color="#d5a00190"
                  size={15}
                  title={node.reason || "Skipped"}
                  aria-label="skipped"
               />
            ) : (
               <FaFile color="#929292" />
            )}
            <span style={{ padding: "0 5px" }}></span>
            {renameId === node.id ? (
               <input
                  ref={inputRef}
                  className="rename-input"
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  onBlur={onRenameCommitLocal}
                  onKeyDown={e => {
                     if (e.key === "Enter") onRenameCommitLocal();
                     if (e.key === "Escape") {
                        setRenameId(null);
                        setRenameValue("");
                     }
                  }}
               />
            ) : (
               <span className="file-node__name node-name">{node.name}</span>
            )}

            {/* Only show menu button for actionable nodes */}
            {actionable && (
               <button
                  className="file-node__menu-btn"
                  onClick={handleMenuBtn}
                  aria-label="Open menu"
                  tabIndex={-1}
               >
                  <FiMoreVertical />
               </button>
            )}
         </div>

         {node.type === "folder" && open && node.children && (
            <div className="file-node__children">
               {node.children.map(child => (
                  <FileTreeNode
                     key={child.id}
                     node={child}
                     tree={tree}
                     setTree={setTree}
                     openMenu={openMenu}
                     setOpenMenu={setOpenMenu}
                     clipboard={clipboard}
                     setClipboard={setClipboard}
                     renameId={renameId}
                     setRenameId={setRenameId}
                     renameValue={renameValue}
                     setRenameValue={setRenameValue}
                     parent={node}
                     isRoot={false}
                     selectedId={selectedId}
                     setSelectedId={setSelectedId}
                     onSelect={onSelect}
                     commitRename={commitRename}
                     openFolders={openFolders}
                     highlightedId={highlightedId}
                  />
               ))}
            </div>
         )}
      </div>
   );
}

/* Main reusable FileTree component */
function FileTree({
   fileTree = defaultFiles,
   onDelete,
   onCopy,
   onCut,
   onPaste,
   onRename,
   onNewFile,
   onNewFolder,
   onSelect,
   onChange // optional generic callback that receives full newTree and last action
}) {
   // internal copy so incoming prop remains immutable
   const [internalTree, setInternalTree] = useState(deepClone(fileTree || []));
   const [openMenu, setOpenMenu] = useState(null);
   const [clipboard, setClipboard] = useState(null); // { node, cut: bool, originalId? }
   const [renameId, setRenameId] = useState(null);
   const [renameValue, setRenameValue] = useState("");
   const [selectedId, setSelectedId] = useState(null);

   // New: control folder open state centrally so we can programmatically expand ancestors
   const [openFolders, setOpenFolders] = useState(new Set());
   // Highlight id (transient) to show destination after paste
   const [highlightedId, setHighlightedId] = useState(null);

   const menuRef = useRef(null);
   let highlightTimeoutRef = useRef(null);

   // sync to prop changes
   useEffect(() => {
      setInternalTree(deepClone(fileTree || []));
      // ensure selectedId still exists
      if (selectedId) {
         const meta = getNodeMeta(fileTree || [], selectedId);
         if (!meta) setSelectedId(null);
      }
   }, [fileTree]);

   useEffect(() => {
      function onKey(e) {
         if (e.key === "Escape") setOpenMenu(null);
      }
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
   }, []);

   useEffect(() => {
      return () => {
         if (highlightTimeoutRef.current)
            clearTimeout(highlightTimeoutRef.current);
      };
   }, []);

   function notify(actionName, payload) {
      const clonedTree = deepClone(internalTree);
      const basePayload = { ...payload, newTree: clonedTree };

      switch (actionName) {
         case "delete":
            if (typeof onDelete === "function") onDelete(basePayload);
            break;
         case "copy":
            if (typeof onCopy === "function") onCopy(basePayload);
            break;
         case "cut":
            if (typeof onCut === "function") onCut(basePayload);
            break;
         case "paste":
            if (typeof onPaste === "function") onPaste(basePayload);
            break;
         case "rename":
            if (typeof onRename === "function") onRename(basePayload);
            break;
         case "newfile":
            if (typeof onNewFile === "function") onNewFile(basePayload);
            break;
         case "newfolder":
            if (typeof onNewFolder === "function") onNewFolder(basePayload);
            break;
         case "select":
            if (typeof onSelect === "function") onSelect(basePayload);
            break;
         default:
         // noop
      }

      if (typeof onChange === "function") {
         onChange({ action: actionName, ...basePayload });
      }
   }

   // Helper: open a list of folder ids (adds to openFolders set)
   function expandFoldersByIds(ids = []) {
      if (!ids || ids.length === 0) return;
      setOpenFolders(prev => {
         const next = new Set(prev);
         ids.forEach(id => next.add(id));
         return next;
      });
   }

   // Actions
   function handleMenuAction(action) {
      const menu = openMenu;
      if (!menu) return;
      const { id } = menu;

      const meta = getNodeMeta(internalTree, id);
      const node = meta ? meta.node : null;

      // Protect against acting on non-actionable node - defensive check
      if (!isActionableNode(node)) {
         setOpenMenu(null);
         return;
      }

      const parent = meta ? meta.parent : null;
      const path = meta ? meta.path : [];
      const index = meta ? meta.index : -1;

      if (action === "copy") {
         setClipboard({ node: deepClone(node), cut: false });
         notify("copy", {
            node: deepClone(node),
            parent: deepClone(parent),
            path,
            index
         });
      } else if (action === "cut") {
         setClipboard({
            node: deepClone(node),
            cut: true,
            originalId: node.id
         });
         notify("cut", {
            node: deepClone(node),
            parent: deepClone(parent),
            path,
            index
         });
      } else if (action === "paste") {
         if (!clipboard) {
            setOpenMenu(null);
            return;
         }
         const targetMeta = getNodeMeta(internalTree, id);
         const targetNode = targetMeta ? targetMeta.node : null;

         // Since paste button is only shown for folders in UI, targetNode should be a folder
         if (!targetNode || targetNode.type !== "folder") {
            // safety: do nothing
            setOpenMenu(null);
            return;
         }

         targetNode.children = targetNode.children || [];
         const destinationArray = targetNode.children;

         if (clipboard.cut && clipboard.originalId) {
            const movingMeta = getNodeMeta(internalTree, clipboard.originalId);
            if (
               movingMeta &&
               movingMeta.node &&
               movingMeta.node.type === "folder"
            ) {
               const descendantIds = [];
               function buildIds(n) {
                  descendantIds.push(n.id);
                  if (n.children) n.children.forEach(buildIds);
               }
               buildIds(movingMeta.node);
               const targetId = targetNode ? targetNode.id : null;
               if (targetId && descendantIds.includes(targetId)) {
                  window.alert(
                     "Cannot move a folder into one of its own descendants."
                  );
                  setOpenMenu(null);
                  return;
               }
            }
         }

         const toPaste = deepClone(clipboard.node);
         if (clipboard.cut && clipboard.originalId) {
            const removed = removeNode(internalTree, clipboard.originalId);
            toPaste.id = clipboard.originalId;
         } else {
            toPaste.id = uuid();
         }

         insertNodeIntoArray(destinationArray, toPaste);
         setInternalTree([...internalTree]);

         // Expand ancestors + target folder so the new node is visible
         // targetMeta.path is path from root to target folder; open them all
         const ancestorIds = targetMeta ? targetMeta.path.map(p => p.id) : [];
         expandFoldersByIds(ancestorIds);

         // Highlight the newly pasted node briefly
         setHighlightedId(toPaste.id);
         if (highlightTimeoutRef.current)
            clearTimeout(highlightTimeoutRef.current);
         highlightTimeoutRef.current = setTimeout(() => {
            setHighlightedId(null);
         }, 2500);

         // Prepare a path that ends with the pasted node
         const newPath = (targetMeta ? targetMeta.path : []).concat({
            id: toPaste.id,
            name: toPaste.name,
            type: toPaste.type
         });

         notify("paste", {
            node: deepClone(toPaste),
            parent: deepClone(targetNode),
            path: newPath,
            index: destinationArray.length - 1,
            clipboard: deepClone(clipboard)
         });

         if (clipboard.cut) setClipboard(null);
      } else if (action === "delete") {
         if (!node) {
            setOpenMenu(null);
            return;
         }
         if (
            node.type === "folder"
         ) {
            if (!window.confirm("Delete folder and all its contents?")) {
               setOpenMenu(null);
               return;
            }
         }
         if(node.type === "file") {
            if (!window.confirm("Confirm to `delete` this file?")) {
               setOpenMenu(null);
               return;
            }
         }
         const removed = removeNode(internalTree, node.id);
         setInternalTree([...internalTree]);

         // if we deleted the node that was cut, clear clipboard
         if (clipboard && clipboard.cut && clipboard.originalId === node.id) {
            setClipboard(null);
         }

         if (
            selectedId &&
            removed &&
            (removed.id === selectedId ||
               (removed.type === "folder" &&
                  getNodeMeta([removed], selectedId)))
         ) {
            setSelectedId(null);
         }
         notify("delete", {
            node: deepClone(removed),
            parent: deepClone(parent),
            path,
            index
         });
      } else if (action === "newfile" || action === "newfolder") {
         const targetMeta = getNodeMeta(internalTree, id);
         const targetNode = targetMeta ? targetMeta.node : null;

         // Only allow creating inside actionable folders
         const parentForNew =
            targetNode && targetNode.type === "folder"
               ? targetNode
               : menu.parent;
         const container = parentForNew
            ? (parentForNew.children = parentForNew.children || [])
            : internalTree;

         if (action === "newfile") {
            const newNode = {
               id: uuid(),
               name: resolveName(container, "untitled.txt", "file"),
               type: "file"
            };
            container.push(newNode);
            setInternalTree([...internalTree]);
            // open parent folder(s) to show new item
            const ancestorIds = targetMeta
               ? targetMeta.path.map(p => p.id)
               : [];
            if (parentForNew) expandFoldersByIds(ancestorIds);
            // highlight
            setHighlightedId(newNode.id);
            if (highlightTimeoutRef.current)
               clearTimeout(highlightTimeoutRef.current);
            highlightTimeoutRef.current = setTimeout(
               () => setHighlightedId(null),
               2500
            );
            notify("newfile", {
               node: deepClone(newNode),
               parent: deepClone(parentForNew),
               path: targetMeta
                  ? targetMeta.path.concat({
                       id: newNode.id,
                       name: newNode.name,
                       type: newNode.type
                    })
                  : [],
               index: container.length - 1
            });
         } else {
            const newNode = {
               id: uuid(),
               name: resolveName(container, "untitled", "folder"),
               type: "folder",
               children: []
            };
            container.push(newNode);
            setInternalTree([...internalTree]);
            const ancestorIds = targetMeta
               ? targetMeta.path.map(p => p.id)
               : [];
            if (parentForNew) expandFoldersByIds(ancestorIds);
            setHighlightedId(newNode.id);
            if (highlightTimeoutRef.current)
               clearTimeout(highlightTimeoutRef.current);
            highlightTimeoutRef.current = setTimeout(
               () => setHighlightedId(null),
               2500
            );
            notify("newfolder", {
               node: deepClone(newNode),
               parent: deepClone(parentForNew),
               path: targetMeta
                  ? targetMeta.path.concat({
                       id: newNode.id,
                       name: newNode.name,
                       type: newNode.type
                    })
                  : [],
               index: container.length - 1
            });
         }
      }

      setOpenMenu(null);
   }

   // commit rename (called by FileTreeNode)
   function commitRename(nodeId, newName) {
      const meta = getNodeMeta(internalTree, nodeId);
      if (!meta) {
         // ensure rename input is closed even if meta missing
         setRenameId(null);
         setRenameValue("");
         return;
      }

      // Defensive: only rename actionable nodes
      if (!isActionableNode(meta.node)) {
         setRenameId(null);
         setRenameValue("");
         return;
      }

      const { node, parent, path, index } = meta;
      const siblings = parent
         ? (parent.children || []).filter(c => c.id !== nodeId)
         : internalTree.filter(c => c.id !== nodeId);
      const exists = siblings.some(
         child => child.name === newName && child.type === node.type
      );
      node.name = exists ? resolveName(siblings, newName, node.type) : newName;
      setInternalTree([...internalTree]);

      // IMPORTANT: hide the rename input after commit
      setRenameId(null);
      setRenameValue("");

      notify("rename", {
         node: deepClone(node),
         parent: deepClone(parent),
         path,
         index
      });
   }

   // selection handler invoked by node
   function handleSelect(payload) {
      // Defensive: block selection callbacks triggered for non-actionable nodes
      if (!payload || !isActionableNode(payload.node)) return;
      notify("select", payload);
   }

   return (
      <div className="file-tree" role="tree" aria-label="File explorer">
         {internalTree.map((node, idx) => (
            <FileTreeNode
               key={node.id}
               node={node}
               tree={internalTree}
               setTree={setInternalTree}
               openMenu={openMenu}
               setOpenMenu={setOpenMenu}
               clipboard={clipboard}
               setClipboard={setClipboard}
               renameId={renameId}
               setRenameId={setRenameId}
               renameValue={renameValue}
               setRenameValue={setRenameValue}
               parent={null}
               isRoot={idx === 0}
               selectedId={selectedId}
               setSelectedId={setSelectedId}
               onSelect={handleSelect}
               commitRename={commitRename}
               openFolders={openFolders}
               highlightedId={highlightedId}
            />
         ))}

         {openMenu && (
            <div
               className="modal-menu-overlay"
               onMouseDown={() => {
                  setOpenMenu(null);
               }}
            >
               <div
                  className="modal-menu"
                  ref={menuRef}
                  onMouseDown={e => {
                     e.stopPropagation();
                  }}
               >
                  <div className="modal-menu__title">
                     <b>{openMenu.name}</b>
                  </div>
                  <div className="modal-menu__actions">
                     {/* Note: top-level UI will only show menus for actionable nodes,
                         but we keep defensive checks in handleMenuAction */}
                     <button onClick={() => handleMenuAction("delete")}>
                        Delete
                     </button>
                     <button onClick={() => handleMenuAction("copy")}>
                        Copy
                     </button>
                     <button onClick={() => handleMenuAction("cut")}>
                        Cut
                     </button>

                     {/* Show paste only for folders (target must be a folder to paste into) */}
                     {openMenu.type === "folder" && (
                        <button
                           onClick={() => handleMenuAction("paste")}
                           disabled={!clipboard}
                        >
                           {clipboard && clipboard.cut ? "Move Here" : "Paste"}
                        </button>
                     )}

                     {openMenu.type === "folder" && (
                        <>
                           <button onClick={() => handleMenuAction("newfile")}>
                              New File
                           </button>
                           <button
                              onClick={() => handleMenuAction("newfolder")}
                           >
                              New Folder
                           </button>
                        </>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default FileTree;
