import {useState } from "react"
import api from "../api/axios.js";
import { useQuery } from "@tanstack/react-query";
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
   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["filetree"],
      queryFn: fetchFileTree
   });
   const loadFileName = useLoadedFileStore(state => state.loadFileName);
   const loadContent = useLoadedFileStore(state => state.loadContent);
   
   const handleFileSelect = async (payload) => {
      loadFileName(payload.node.path);
      const fcont = await fetchFileContent(payload)
      console.log(fcont)
      loadContent(fcont.code);
      onFileLoad();
   };

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
   return (
      <>
         <FileTree
            fileTree={data.filetree}
            onSelect={handleFileSelect}
            onChange={d => console.log(d)}
         />
      </>
   );
}

export default SideBarContent;
