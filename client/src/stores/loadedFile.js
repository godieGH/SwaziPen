import { create } from "zustand";

const initialState = {
  treeFileData: null,
  filename: "",
  content: "",
  newContent: "",
  notsaved: false,
  deleted: false,
  theme: "swazipen"/*"github_dark"*/,
  mode: null,
};

const useLoadedFileStore = create((set) => ({
  ...initialState,

  // Actions
  setTreeFileData: (data) => {
    set(() => ({
      treeFileData: data
    }));
  },

  loadFileName: (name) => {
    const lower = (name || "").toLowerCase();
    const isSwazi = /\.sl$|\.swz$/i.test(lower); // matches .sl or .swz
    set(() => ({
      filename: name,
      mode: isSwazi ? "swazilang" : null,
      theme: isSwazi ? "swazipen" : "swazipen"
    }));
  },

  loadContent: (source) =>
    set(() => ({
      content: source,
      notsaved: false,
      deleted: false,
      newContent: "" 
    })),

  updateSource: (newSource) =>
    set(() => ({
      newContent: newSource,
      notsaved: true
    })),

  applyNewContent: () =>
    set((state) => ({
      content: state.newContent,
      newContent: ""
    })),

  reset: () =>
    set(() => ({
      ...initialState
    }))
}));

export default useLoadedFileStore;
