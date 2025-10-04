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
    data: [],
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
    <div className="w-full">
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

function EditorMenu() {
  const [code, setCode] = useState(`class Person
  fun _init (self, age)
    self.age = age

  fun can_vote (self)
    return self.age >= 18

  fun vote (self)
    if not self.can_vote ()
      return ? "Person cannot vote"
    write ("Voted!")

a = Person (18)
try
  a.vote ()
catch E
  write (E)
`);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const preRef = useRef<HTMLDivElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);

  type Token = { type: string; value: string };

  function escapeHtml(s: string) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function tokenize(text: string): Token[] {
    const patterns: { type: string; regex: RegExp }[] = [
      { type: "comment", regex: /\/\/.*$/gm },
      { type: "string", regex: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/g },
      { type: "number", regex: /\b\d+(?:\.\d+)?\b/g },
      {
        type: "keyword",
        regex:
          /\b(fun|class|_init|self|return|if|else|for|while|repeat|try|catch|write)\b/g,
      },
      { type: "type", regex: /\b(number|string|void|boolean)\b/g },
      { type: "identifier", regex: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g },
      { type: "operator", regex: /==|!=|<=|>=|=>|\+\+|--|[+\-*/%=<>!&|:^~]/g },
      { type: "whitespace", regex: /\s+/g },
      { type: "other", regex: /./g },
    ];

    const tokens: Token[] = [];
    let pos = 0;
    const N = text.length;

    while (pos < N) {
      let matched = false;
      for (const p of patterns) {
        p.regex.lastIndex = pos;
        const m = p.regex.exec(text);
        if (m && m.index === pos) {
          tokens.push({ type: p.type, value: m[0] });
          pos += m[0].length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        tokens.push({ type: "other", value: text[pos] });
        pos += 1;
      }
    }
    return tokens;
  }

  function toHighlightedHtml(text: string) {
    const tokens = tokenize(text);
    let out = "";
    for (const t of tokens) {
      const v = escapeHtml(t.value);
      switch (t.type) {
        case "comment":
          out += `<span class="text-gray-500 italic">${v}</span>`;
          break;
        case "string":
          out += `<span class="text-green-600">${v}</span>`;
          break;
        case "number":
          out += `<span class="text-orange-600">${v}</span>`;
          break;
        case "keyword":
          out += `<span class="text-purple-600 font-medium">${v}</span>`;
          break;
        case "type":
          out += `<span class="text-blue-600">${v}</span>`;
          break;
        case "identifier":
          out += `${v}`;
          break;
        case "operator":
          out += `<span class="text-pink-500">${v}</span>`;
          break;
        case "whitespace":
          // preserve newlines and spaces precisely for alignment
          out += v
            .replace(/\n/g, "<br/>")
            .replace(/ /g, "&nbsp;")
            .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
          break;
        default:
          out += v;
      }
    }
    return out;
  }

  const [html, setHtml] = useState(() => toHighlightedHtml(code));

  useEffect(() => {
    setHtml(toHighlightedHtml(code));
    // after update, keep scroll positions in sync
    requestAnimationFrame(() => {
      if (preRef.current && textareaRef.current && gutterRef.current) {
        preRef.current.scrollTop = textareaRef.current.scrollTop;
        preRef.current.scrollLeft = textareaRef.current.scrollLeft;
        gutterRef.current.scrollTop = textareaRef.current.scrollTop;
      }
    });
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleScroll = () => {
    if (!preRef.current || !textareaRef.current || !gutterRef.current) return;
    preRef.current.scrollTop = textareaRef.current.scrollTop;
    preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    gutterRef.current.scrollTop = textareaRef.current.scrollTop;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current!;
      const start = ta.selectionStart ?? 0;
      const end = ta.selectionEnd ?? 0;
      const newCode = code.slice(0, start) + "  " + code.slice(end);
      setCode(newCode);
      requestAnimationFrame(() => {
        if (textareaRef.current)
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className="h-full max-h-full flex flex-col">
      <div className="p-2 border-b border-b-gray-300 bg-gray-100 flex items-center gap-2">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
          main.sf
        </span>
        <span className="text-xs text-gray-500">SF Language</span>
      </div>

      <div className="grow bg-white flex flex-col overflow-hidden">
        <div className="h-full w-full p-4 overflow-hidden">
          <div className="flex bg-gray-50 rounded-lg h-full text-sm relative overflow-hidden">
            <div
              ref={gutterRef}
              className="bg-gray-100 py-4 px-2 text-right text-gray-400 select-none w-12 font-mono overflow-y-hidden sticky left-0 z-10"
            >
              {code.split("\n").map((_, i) => (
                <div key={i} className="h-6 leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="relative flex-1 h-full overflow-auto">
              <div
                ref={preRef}
                className="m-0 p-4 font-mono text-sm leading-6 text-left whitespace-pre pointer-events-none absolute top-0 left-0 right-0 bottom-0"
                aria-hidden
                dangerouslySetInnerHTML={{ __html: html }}
                style={{ boxSizing: "border-box" }}
              />

              <textarea
                ref={textareaRef}
                value={code}
                onChange={handleChange}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                wrap="off"
                className="absolute top-0 left-0 w-full h-full p-4 resize-none bg-transparent text-transparent caret-black outline-none font-mono text-sm leading-6"
                spellCheck={false}
                style={{ boxSizing: "border-box" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Workspace() {
  return (
    <div className="h-screen max-h-screen w-full bg-gray-100 flex flex-col">
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

          <div className="p-4">
            <MakeFolderView folder={folderView} />
          </div>
        </div>

        <div className="col-span-15">
          <div className="h-full">
            <EditorMenu />
          </div>
        </div>

        <div className="col-span-1">
          <RightsideBar />
        </div>
      </div>
    </div>
  );
}
