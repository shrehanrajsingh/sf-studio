import { create } from "zustand";

type FileEntry = {
  name: string;
  content: string;
  isActive: boolean;
};

type FiletabState = {
  files: Array<FileEntry>;
  updateFiles: (newFiles: Array<FileEntry>) => void;
};

export const useFileEntry = create<FiletabState>((set) => ({
  files: [{ name: "Untitled", content: "# Start typing", isActive: true }],
  updateFiles: (newFiles) => set((state) => ({ files: newFiles })),
}));
