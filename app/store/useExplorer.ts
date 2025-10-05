import { create } from "zustand";

type ExplorerState = {
  folder: any;
  updateFolder: () => void;
};

let folderView = [
  {
    name: "TestApplication1",
    type: "folder",
    data: [
      { name: ".gitignore", type: "file", content: ".env\n.sf.env" },
      { name: "main.sf", type: "file", content: 'write ("Hello, World!")' },
      { name: ".sf.env", type: "file", content: "SF_CACHE_DIR=sfcache/\n" },
      {
        name: "build",
        type: "folder",
        data: [
          { name: ".cache1", type: "file", content: "// cache goes here" },
          { name: ".cache2", type: "file", content: "// cache goes here" },
        ],
      },
      {
        name: "tests",
        type: "folder",
        data: [
          { name: "test1.sf", type: "file", content: 'write ("Test 1")' },
          { name: "test2.sf", type: "file", content: 'write ("Test 2")' },
        ],
      },
    ],
  },
  {
    name: "External Libraries",
    type: "folder",
    data: [
      {
        name: "sf-xml",
        type: "folder",
        data: [
          { name: ".gitignore", type: "file", content: ".env\n.sf.env" },
          { name: "main.sf", type: "file", content: "Default data goes here" },
          { name: ".sf.env", type: "file", content: "Default data goes here" },
        ],
      },
      {
        name: "lilac-ui",
        type: "folder",
        data: [
          { name: ".gitignore", type: "file", content: ".env\n.sf.env" },
          { name: "main.sf", type: "file", content: "Default data goes here" },
          { name: ".sf.env", type: "file", content: "Default data goes here" },
        ],
      },
      {
        name: "april",
        type: "folder",
        data: [
          { name: ".gitignore", type: "file", content: ".env\n.sf.env" },
          { name: "main.sf", type: "file", content: "Default data goes here" },
          { name: ".sf.env", type: "file", content: "Default data goes here" },
        ],
      },
    ],
  },
  {
    name: "Scratches and Consoles",
    type: "file",
    content: "test file",
  },
];

export const useExplorer = create<ExplorerState>((set) => ({
  folder: folderView,
  updateFolder: () => set((state) => ({ folder: state.folder })),
}));
