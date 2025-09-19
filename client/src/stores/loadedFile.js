// src/stores/loadedFile.js
import { create } from "zustand";

const useLoadedFileStore = create((set) => ({
  filename: "untitled.txt",
  content: "# start your code with swazi",
  newContent: "",

  loadFileName: (name) => set(() => ({ filename: name })),
  loadContent: (source) => set(() => ({ content: source })),

  // FIXED: use the parameter you receive
  updateSource: (newSource) => set(() => ({ newContent: newSource })),

  // commit helper: copy newContent -> content (you can call this after debounce)
  applyNewContent: () =>
    set((state) => ({ content: state.newContent, newContent: "" })),

  // optional: add a saveToServer action later
}));

export default useLoadedFileStore;