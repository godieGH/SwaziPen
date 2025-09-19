// src/stores/loadedFile.js
import { create } from "zustand";

const useLoadedFileStore = create((set) => ({
  treeFileData: null,
  filename: "untitled.txt",
  content: "",
  newContent: "",
  theme: "github_dark",
  mode: null,
  
  setTreeFileData: (data) => {
     set(() => ({
        treeFileData: data
     }))
  },

  // set filename and update mode when extension matches
  loadFileName: (name) => {
    const lower = (name || "").toLowerCase();
    const isSwazi = /\.sl$|\.swz$/i.test(lower); // matches .sl or .swz
    set(() => ({ filename: name, mode: isSwazi ? "swazilang" : null, theme: isSwazi? "swazipen": "github_dark" }));
  },

  loadContent: (source) => set(() => ({ content: source })),

  // FIXED: use the parameter you receive
  updateSource: (newSource) => set(() => ({ newContent: newSource })),

  // commit helper: copy newContent -> content (you can call this after debounce)
  applyNewContent: () =>
    set((state) => ({ content: state.newContent, newContent: "" })),

  // optional: add a saveToServer action later
}));

export default useLoadedFileStore;