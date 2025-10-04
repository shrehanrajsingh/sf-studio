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
      { name: ".gitignore", type: "file" },
      { name: "main.sf", type: "file" },
      { name: ".sf.env", type: "file" },
      {
        name: "build",
        type: "folder",
        data: [
          { name: ".cache1", type: "file" },
          { name: ".cache2", type: "file" },
        ],
      },
      {
        name: "tests",
        type: "folder",
        data: [
          { name: "test1.sf", type: "file" },
          { name: "test2.sf", type: "file" },
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
          { name: ".gitignore", type: "file" },
          { name: "main.sf", type: "file" },
          { name: ".sf.env", type: "file" },
        ],
      },
      {
        name: "lilac-ui",
        type: "folder",
        data: [
          { name: ".gitignore", type: "file" },
          { name: "main.sf", type: "file" },
          { name: ".sf.env", type: "file" },
        ],
      },
      {
        name: "april",
        type: "folder",
        data: [
          { name: ".gitignore", type: "file" },
          { name: "main.sf", type: "file" },
          { name: ".sf.env", type: "file" },
        ],
      },
    ],
  },
  {
    name: "Scratches and Consoles",
    type: "file",
    data: [],
  },
];

function MakeFolderView({ folder }: any) {
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
      {Array.isArray(folder) ? (
        <ul className="space-y-1">
          {folder.map((item, index) => {
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
                    <>
                      <ClipboardIcon size={18} className="text-gray-600" />
                      <span>{item.name}</span>
                    </>
                  )}
                </div>

                {/* Render child items recursively only if expanded */}
                {item.type === "folder" && item.data && isExpanded && (
                  <div className="pl-6 mt-1 relative">
                    {item.data.length > 0 && (
                      <div className="absolute left-2 top-0 bottom-4 border-l border-gray-300"></div>
                    )}
                    <MakeFolderView folder={item.data} />
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
            <MakeFolderView folder={folderView} />
          </div>
        </div>

        <div className="col-span-15">
          <div className="h-full">
            <EditorMenuMonaco />
          </div>
        </div>

        <div className="col-span-1">
          <RightsideBar />
        </div>
      </div>
    </div>
  );
}
