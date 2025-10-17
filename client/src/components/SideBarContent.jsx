import { useCallback, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import api from "@api/axios.js";
import socket from "@api/socket.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useLoadedFileStore from "@stores/loadedFile.js";
import FileTree from "@components/FileTree.jsx";
import Skeleton from "@components/Skeletons/Skeleton.jsx";

async function fetchFileTree() {
   const { data } = await api.get("/api/filetree");
   return data;
}

async function fetchFileContent(payload) {
   const { data } = await api.post("/api/get/file/content", payload);
   return data;
}

function SideBarContent({ onFileLoad }) {
   const queryClient = useQueryClient();

   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["filetree"],
      queryFn: fetchFileTree,
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
      retry: 3
   });

   // Listen for socket pushes and keep the react-query cache in sync.
   // We rely on the server to emit the same payload shape your REST API returns:
   // { filetree: [...] } so replacing the query data with the socket payload will
   // update `data` used below and re-render the FileTree.
   useEffect(() => {
      function handleTreePayload(payload) {
         if (!payload) return;
         // Overwrite the cached filetree query with the new payload from socket
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
      [
         debouncedSelect,
         fileContentMutation,
         queryClient,
         loadFileName,
         loadContent,
         onFileLoad
      ]
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
        //useLoadedFileStore.getState().reset()
         await api.post("/api/remove/dir/file/", payload);
      } catch (e) {
         window.alert(e.message);
      }
   };
   const handleRename = async payload => {
      try {
         //useLoadedFileStore.getState().reset()
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
        const {data} = await api.get("/api/get/previous/opened/file")
       if(data && data.path) {
         //handleFileSelect(data)
         setTreeFileData(data)
         fileContentMutation.mutate(data)
       }
     } catch (e) {
       console.error(e)
     }
   }, [])
   
   useEffect(() => {
     getPreviousOpenedFile()
   }, [])




   if (isLoading) {
      return (
         <div style={{ padding: "10px" }}>
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
         <div style={{ padding: "20px 10px", color: "red" }}>
            Error: {error.message}
         </div>
      );
   }

   // NOTE: data is expected to be the same shape returned by your API: { filetree: [...] }
   return (
      <>
         {fileContentMutation.isLoading && (
            <div style={{ padding: "8px 10px", fontSize: 12 }}>
               Loading file…
            </div>
         )}
         {fileContentMutation.isError && (
            <div style={{ padding: "8px 10px", color: "orange", fontSize: 12 }}>
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
}

export default SideBarContent;
