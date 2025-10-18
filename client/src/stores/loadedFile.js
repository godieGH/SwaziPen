import { create } from "zustand";

const initialState = {
  treeFileData: null,
  filename: "",
  content: "",
  newContent: "",
  notsaved: false,
  deleted: false,
  mode: null,
};

// Map file extensions to Ace editor modes
const getAceMode = (filename) => {
  if (!filename) return null;
  
  const lower = filename.toLowerCase();
  const extension = lower.split('.').pop();
  
  // Extension to Ace mode mapping
  const modeMap = {
    // Programming languages
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    py: "python",
    java: "java",
    c: "c_cpp",
    cpp: "c_cpp",
    cc: "c_cpp",
    cxx: "c_cpp",
    h: "c_cpp",
    hpp: "c_cpp",
    cs: "csharp",
    php: "php",
    rb: "ruby",
    go: "golang",
    rs: "rust",
    swift: "swift",
    kt: "kotlin",
    scala: "scala",
    
    // Web languages
    html: "html",
    htm: "html",
    css: "css",
    scss: "scss",
    sass: "sass",
    less: "less",
    
    // Markup/Config
    json: "json",
    xml: "xml",
    yaml: "yaml",
    yml: "yaml",
    toml: "toml",
    md: "markdown",
    markdown: "markdown",
    
    // Shell/Scripts
    sh: "sh",
    bash: "sh",
    zsh: "sh",
    bat: "batchfile",
    cmd: "batchfile",
    ps1: "powershell",
    
    // Database
    sql: "sql",
    
    // Other
    txt: "text",
    log: "text",
    
    // Custom - Swazi language
    sl: "swazilang",
    swz: "swazilang",
  };
  
  return modeMap[extension] || null;
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
    set(() => ({
      filename: name,
      mode: getAceMode(name),
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