"use client";

import Image from "next/image";
import avatars from "../avatarlist";
import {
  BellIcon,
  BoxesIcon,
  BugIcon,
  ClipboardIcon,
  CloudIcon,
  CopyIcon,
  FolderClosedIcon,
  FolderOpenIcon,
  PlayIcon,
  Redo2Icon,
  ReplaceIcon,
  SaveIcon,
  ScissorsIcon,
  SearchIcon,
  SquareIcon,
  ToolCaseIcon,
  Undo2Icon,
} from "lucide-react";
import { Inter, Roboto } from "next/font/google";
import { useRef, useState, useEffect } from "react";

import EditorMenuMonaco from "../components/EditorMenu";
import { useExplorer } from "../store/useExplorer";
import { useFileEntry } from "../store/useFiletab";

const subheadingFont = Inter({
  subsets: ["latin"],
});

const headingFont = Roboto({
  subsets: ["latin"],
});

function FileMenuBar() {
  return (
    <div className="w-full py-8 bg-white px-4 flex gap-12 border-2 border-gray-400/40">
      {/* section 1 */}
      <div className="flex gap-8">
        {[
          {
            icon: <SaveIcon />,
            text: "Save",
          },
          {
            icon: <Undo2Icon />,
            text: "Undo",
          },
          {
            icon: <Redo2Icon />,
            text: "Redo",
          },
        ].map((i, key) => (
          <div
            className="flex flex-col justify-center items-center cursor-pointer gap-3 group"
            key={key}
          >
            {i.icon}
            <h1 className="text-sm group-hover:underline">{i.text}</h1>
          </div>
        ))}
      </div>
      {/* end section 1 */}

      <div className="w-1 h-16 bg-gray-300 rounded-2xl"></div>

      {/* section 2 */}
      <div className="flex gap-8">
        {[
          {
            icon: <PlayIcon />,
            text: "Run",
          },
          {
            icon: <BugIcon />,
            text: "Debug",
          },
          {
            icon: <SquareIcon />,
            text: "Stop",
          },
        ].map((i, key) => (
          <div
            className="flex flex-col justify-center items-center cursor-pointer gap-3 group"
            key={key}
          >
            {i.icon}
            <h1 className="text-sm group-hover:underline">{i.text}</h1>
          </div>
        ))}
      </div>
      {/* end section 2 */}

      <div className="w-1 h-16 bg-gray-300 rounded-2xl"></div>

      {/* section 3 */}
      <div className="flex gap-8">
        {[
          {
            icon: <ScissorsIcon />,
            text: "Cut",
          },
          {
            icon: <CopyIcon />,
            text: "Copy",
          },
          {
            icon: <ClipboardIcon />,
            text: "Paste",
          },
        ].map((i, key) => (
          <div
            className="flex flex-col justify-center items-center cursor-pointer gap-3 group"
            key={key}
          >
            {i.icon}
            <h1 className="text-sm group-hover:underline">{i.text}</h1>
          </div>
        ))}
      </div>
      {/* end section 3 */}

      <div className="w-1 h-16 bg-gray-300 rounded-2xl"></div>

      {/* section 4 */}
      <div className="flex gap-8">
        {[
          {
            icon: <SearchIcon />,
            text: "Find",
          },
          {
            icon: <ReplaceIcon />,
            text: "Replace",
          },
        ].map((i, key) => (
          <div
            className="flex flex-col justify-center items-center cursor-pointer gap-3 group"
            key={key}
          >
            {i.icon}
            <h1 className="text-sm group-hover:underline">{i.text}</h1>
          </div>
        ))}
      </div>
      {/* end section 4 */}
    </div>
  );
}

const folderView = [
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

function MakeFolderView({ directory }: any) {
  const { folder, updateFolder } = useExplorer();
  const { files, updateFiles } = useFileEntry();

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleFolder = (index: number, name: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [`${index}-${name}`]: !prev[`${index}-${name}`],
    }));
  };

  return (
    <div className="w-full h-full">
      {/* {JSON.stringify(files)} */}
      {Array.isArray(directory) ? (
        <ul className="space-y-1">
          {directory.map((item, index) => {
            const isExpanded = expandedItems[`${index}-${item.name}`];

            return (
              <li key={index}>
                <div
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-md"
                  onClick={() =>
                    item.type === "folder"
                      ? toggleFolder(index, item.name)
                      : null
                  }
                >
                  {item.type === "folder" ? (
                    <>
                      {isExpanded ? (
                        <FolderOpenIcon size={18} />
                      ) : (
                        <FolderClosedIcon size={18} />
                      )}

                      <span className="font-medium">{item.name}</span>
                    </>
                  ) : (
                    <div
                      className="flex gap-1 items-center"
                      onClick={() =>
                        updateFiles([
                          ...files.map((i, key) => {
                            return { ...i, isActive: false };
                          }),
                          {
                            name: item.name,
                            content: item.content,
                            isActive: true,
                          },
                        ])
                      }
                    >
                      <ClipboardIcon size={18} className="text-gray-600" />
                      <span>{item.name}</span>
                    </div>
                  )}
                </div>

                {item.type === "folder" && item.data && isExpanded && (
                  <div className="pl-6 mt-1 relative">
                    {item.data.length > 0 && (
                      <div className="absolute left-2 top-0 bottom-4 border-l border-gray-300"></div>
                    )}
                    <MakeFolderView directory={item.data} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div>Invalid folder structure</div>
      )}
    </div>
  );
}

function RightsideBar() {
  return (
    <div className="h-full flex flex-col gap-4 items-center pt-8 border-l border-l-gray-400 px-4">
      <div className="cursor-pointer hover:bg-gray-200 w-full flex justify-center p-2 rounded-xl">
        <BellIcon />
      </div>
      <div className="cursor-pointer hover:bg-gray-200 w-full flex justify-center p-2 rounded-xl">
        <CloudIcon />
      </div>
      <div className="cursor-pointer hover:bg-gray-200 w-full flex justify-center p-2 rounded-xl">
        <ToolCaseIcon />
      </div>
    </div>
  );
}

export default function Workspace() {
  const { folder, updateFolder } = useExplorer();
  const { files, updateFiles } = useFileEntry();

  function FileTabs() {
    const { files, updateFiles } = useFileEntry();

    const handleTabClick = (index: number) => {
      updateFiles(
        files.map((file, i) => ({
          ...file,
          isActive: i === index,
        }))
      );
    };

    const handleTabClose = (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      const newFiles = [...files].filter((_, i) => i !== index);

      if (files[index].isActive && newFiles.length > 0) {
        const newActiveIndex = Math.min(index, newFiles.length - 1);
        newFiles[newActiveIndex].isActive = true;
      }

      updateFiles(newFiles);
    };

    return (
      <div className="w-full relative">
        <div className="flex relative">
          <div
            className="w-full max-w-[75vw] overflow-x-scroll flex bg-white border-b border-gray-300/40 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scroll-smooth [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-none"
            id="tabs-container"
            ref={(el) => {
              if (el && files.length > 0) {
                const activeTab =
                  el.children[files.findIndex((f) => f.isActive)];
                if (activeTab) {
                  activeTab.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest",
                  });
                }
              }
            }}
          >
            {files.length > 0 ? (
              files.map((file, index) => (
                <div
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`flex items-center min-w-[10vw] px-3 py-2 border-r border-gray-300/40 cursor-pointer gap-2 ${
                    file.isActive
                      ? "bg-white border-b-2 border-b-blue-500"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  title={file.name}
                >
                  <ClipboardIcon
                    size={16}
                    className="text-gray-600 flex-shrink-0"
                  />
                  <span className="truncate text-sm max-w-[150px]">
                    {file.name}
                  </span>
                  <div className="mx-auto"></div>
                  <button
                    onClick={(e) => handleTabClose(e, index)}
                    className="ml-1 text-gray-400 hover:text-gray-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 hover:bg-gray-200"
                    title="Close"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="w-full h-full bg-white"></div>
            )}
          </div>

          {files.length > 3 && (
            <>
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1 hover:bg-gray-100 z-10"
                onClick={() => {
                  const container = document.getElementById("tabs-container");
                  if (container)
                    container.scrollBy({ left: -150, behavior: "smooth" });
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1 hover:bg-gray-100 z-10"
                onClick={() => {
                  const container = document.getElementById("tabs-container");
                  if (container)
                    container.scrollBy({ left: 150, behavior: "smooth" });
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen overflow-hidden w-full bg-gray-100 flex flex-col">
      <div className="w-full flex items-center gap-2 px-4 py-3 bg-[rgb(53,86,149)]">
        <BoxesIcon fill="#fff" />
        <span
          className={`font-semibold tracking-wide text-white ${subheadingFont.className}`}
        >
          TestApplication1 - SFStudio
        </span>
      </div>
      <div className="w-full flex items-center gap-0 px-4 bg-gray-300/70">
        {["File", "Home", "Insert", "View", "Run", "Help"].map((i, key) => (
          <div
            key={key}
            className={`cursor-pointer ${
              key === 0 ? "bg-[rgb(53,86,149)]" : "hover:bg-[rgb(53,86,149)]"
            } group`}
          >
            <h1
              className={`py-1.5 px-3 font-bold text-sm text-gray-800 ${
                key === 0 ? "text-white" : "group-hover:text-white"
              } `}
            >
              {i}
            </h1>
          </div>
        ))}

        <div className="mx-auto"></div>
        <div className="flex gap-2 items-center justify-center cursor-pointer">
          <Image
            src={avatars[0].image}
            alt="avatar"
            width={100}
            height={100}
            className="h-6 w-6 rounded-full"
          />
          <h1 className="font-bold">{avatars[0].username}</h1>
        </div>
      </div>

      <FileMenuBar />

      <div className="w-full grow grid grid-cols-20">
        <div className="col-span-4 border-r-2 border-r-gray-400/40">
          <div className="border-b-2 border-b-gray-400/40 px-2 py-3">
            <h1
              className={`text-xl px-2 font-bold text-gray-800 ${headingFont.className}`}
            >
              Project Explorer
            </h1>
          </div>

          <div className="p-4 max-h-[68vh] overflow-scroll">
            <MakeFolderView directory={folder} />
          </div>
        </div>

        <div className="col-span-15">
          <div className="grid h-full pb-2 grid-rows-15">
            <div className="row-span-1">
              <FileTabs />
            </div>
            <div className="row-span-14">
              <EditorMenuMonaco />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <RightsideBar />
        </div>
      </div>
    </div>
  );
}
