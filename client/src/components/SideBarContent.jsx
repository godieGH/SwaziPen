import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import api from "@api/axios.js";
import socket from "@api/socket.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useLoadedFileStore from "@stores/loadedFile.js";
import FileTree from "@components/FileTree.jsx";
import Skeleton from "@components/Skeletons/Skeleton.jsx";
import { 
  VscFiles, 
  VscSearch, 
  VscSourceControl, 
  VscExtensions,
  VscDebugAlt,
  VscAccount,
  VscSettingsGear 
} from "react-icons/vsc";

import SettingsPanel from '@components/SettingsPanel.jsx';
import SearchPanel from '@components/SearchPanel.jsx';
import DebugPanel from '@components/DebugPanel.jsx';
import SourceControl from '@components/SourceControl.jsx';
import ProfilePanel from '@components/ProfilePanel.jsx';
import ExtensionsPanel from '@components/ExtensionsPanel.jsx';

async function fetchFileTree() {
   const { data } = await api.get("/api/filetree");
   return data;
}

async function fetchFileContent(payload) {
   const { data } = await api.post("/api/get/file/content", payload);
   return data;
}

function SideBarContent({ onFileLoad }) {
   const [activeView, setActiveView] = useState("explorer");
   const queryClient = useQueryClient();

   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["filetree"],
      queryFn: fetchFileTree,
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
      retry: 3
   });

   useEffect(() => {
      function handleTreePayload(payload) {
         if (!payload) return;
         queryClient.setQueryData(["filetree"], payload);
      }

      function handleError(err) {
         console.error("filetree socket error:", err);
      }

      socket.on("filetree:init", handleTreePayload);
      socket.on("filetree:update", handleTreePayload);
      socket.on("filetree:error", handleError);

      return () => {
         socket.off("filetree:init", handleTreePayload);
         socket.off("filetree:update", handleTreePayload);
         socket.off("filetree:error", handleError);
      };
   }, [queryClient]);

   const setTreeFileData = useLoadedFileStore(state => state.setTreeFileData);
   const loadFileName = useLoadedFileStore(state => state.loadFileName);
   const loadContent = useLoadedFileStore(state => state.loadContent);

   const debouncedSelect = useRef(
      debounce(payload => {
         setTreeFileData(payload);
         fileContentMutation.mutate(payload);
      }, 300)
   ).current;

   const fileContentMutation = useMutation({
      mutationFn: fetchFileContent,
      onSuccess: (data, variables) => {
         loadFileName(variables.node.path);
         loadContent(data.code);
         queryClient.setQueryData(
            ["file", variables.node.path, variables.node.id],
            data
         );
         onFileLoad?.();
      },
      onError: err => {
         console.error("Failed to fetch file content:", err);
      }
   });

   const handleFileSelect = useCallback(
      payload => {
         debouncedSelect(payload);
      },
      [debouncedSelect]
   );

   const handleNewFile = async payload => {
      try {
         await api.post("/api/create/new/file", payload);
      } catch (e) {
         window.alert(e.message);
      }
   };

   const handleNewFolder = async payload => {
      try {
         await api.post("/api/create/new/folder", payload);
      } catch (e) {
         window.alert(e.message);
      }
   };

   const handleDelete = async payload => {
      try {
         await api.post("/api/remove/dir/file/", payload);
      } catch (e) {
         window.alert(e.message);
      }
   };

   const handleRename = async payload => {
      try {
         await api.post("/api/rename/dir/file/", payload);
      } catch (e) {
         window.alert(e.message);
      }
   };

   const handlePaste = async payload => {
      try {
         await api.post("/api/paste", payload);
      } catch (e) {
         window.alert(e.message);
      }
   };

   const getPreviousOpenedFile = useCallback(async () => {
      try {
         const { data } = await api.get("/api/get/previous/opened/file");
         if (data && data.path) {
            setTreeFileData(data);
            fileContentMutation.mutate(data);
         }
      } catch (e) {
         console.error(e);
      }
   }, []);

   useEffect(() => {
      getPreviousOpenedFile();
   }, []);

   const iconButtons = [
      { id: "explorer", icon: VscFiles, label: "Explorer" },
      { id: "search", icon: VscSearch, label: "Search" },
      { id: "source-control", icon: VscSourceControl, label: "Source Control" },
      { id: "debug", icon: VscDebugAlt, label: "Run and Debug" },
      { id: "extensions", icon: VscExtensions, label: "Extensions" }
   ];

   const bottomIcons = [
      { id: "account", icon: VscAccount, label: "Account" },
      { id: "settings", icon: VscSettingsGear, label: "Settings" }
   ];

   const renderContent = () => {
      
    if (activeView === "search") {
      return <SearchPanel />;
    }
    if (activeView === "source-control") {
      return <SourceControl />;
    }
    if (activeView === "debug") {
      return <DebugPanel />;
    }
    if (activeView === "extensions") {
      return <ExtensionsPanel />;
    }
    if (activeView === "account") {
      return <ProfilePanel />;
    }
    if (activeView === "settings") {
      return <SettingsPanel />;
    }
      
      if (activeView !== "explorer") {
         return (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
               {activeView === "search" && "Search functionality"}
               {activeView === "source-control" && "Source Control"}
               {activeView === "debug" && "Run and Debug"}
               {activeView === "extensions" && "Extensions"}
               {activeView === "account" && "Account"}
               {activeView === "settings" && "Settings"}
            </div>
         );
      }

      if (isLoading) {
         return (
            <div className="p-2.5">
               <Skeleton
                  variant="text"
                  count={5}
                  lineWidths={["100%", "96%", "100%", "60%", "66%"]}
                  height={18}
               />
            </div>
         );
      }

      if (isError) {
         return (
            <div className="p-5 px-2.5 text-red-500">
               Error: {error.message}
            </div>
         );
      }

      return (
         <>
            {fileContentMutation.isLoading && (
               <div className="py-2 px-2.5 text-xs">
                  Loading file…
               </div>
            )}
            {fileContentMutation.isError && (
               <div className="py-2 px-2.5 text-orange-500 text-xs">
                  Could not load file: {fileContentMutation.error?.message}
               </div>
            )}

            <FileTree
               fileTree={data?.filetree}
               onSelect={handleFileSelect}
               onNewFile={handleNewFile}
               onNewFolder={handleNewFolder}
               onDelete={handleDelete}
               onRename={handleRename}
               onPaste={handlePaste}
            />
         </>
      );
   };

   return (
      <div className="flex h-full">
         {/* Activity Bar - Thin Icon Column */}
         <div className="w-12 flex flex-col items-center border-r border-[#191919]">
            {/* Top Icons */}
            <div className="flex-1 flex flex-col items-center pt-2">
               {iconButtons.map(({ id, icon: Icon, label }) => (
                  <button
                     key={id}
                     onClick={() => setActiveView(id)}
                     className={`w-12 h-12 flex items-center justify-center relative group transition-colors ${
                        activeView === id 
                           ? "text-white" 
                           : "text-gray-400 hover:text-white"
                     }`}
                     title={label}
                  >
                     <Icon size={24} />
                     {activeView === id && (
                        <div className="absolute left-0 w-0.5 h-12 bg-[#00bac8]" />
                     )}
                  </button>
               ))}
            </div>

            {/* Bottom Icons */}
            <div className="flex flex-col items-center pb-2">
               {bottomIcons.map(({ id, icon: Icon, label }) => (
                  <button
                     key={id}
                     onClick={() => setActiveView(id)}
                     className={`w-12 h-12 flex items-center justify-center relative group transition-colors ${
                        activeView === id 
                           ? "text-white" 
                           : "text-gray-400 hover:text-white"
                     }`}
                     title={label}
                  >
                     <Icon size={24} />
                     {activeView === id && (
                        <div className="absolute left-0 w-0.5 h-12 bg-white" />
                     )}
                  </button>
               ))}
            </div>
         </div>

         {/* Main Sidebar Content */}
         <div className="flex-1 overflow-scroll">
            {renderContent()}
         </div>
      </div>
   );
}

export default SideBarContent;