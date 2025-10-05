"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useEditorCode } from "../store/useEditorCode";
import { useFileEntry } from "../store/useFiletab";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const defaultCode = `import 'file' as f

class Variable
  name = none
  value = none

  fun _init (self, name, value)
    self.name = name
    self.value = value
  
  fun print (self)
    write (name, '=', value)

file = f.open ('.env', 'r')

data = file.read ()
vars = []

for i in data.split ('\\n')
  # split at first '='
  [name, value] = i.partition ('=')
  vars.push (Variable (name, value))

write ("------ ENV VARIABLES ------")
for i in vars
  i.print ()

file.close ()
`;

export default function EditorMenuMonaco() {
  const { codeInfo, updateCodeInfo } = useEditorCode();
  const { files, updateFiles } = useFileEntry();

  const monacoRef = useRef<any>(null);

  function handleEditorWillMount(monaco: any) {
    monaco.languages.register({ id: "sf" });

    monaco.languages.setMonarchTokensProvider("sf", {
      defaultToken: "",
      tokenizer: {
        root: [
          [/#.*/, "comment"],
          [/(\"([^"\\]|\\.)*\")|(\'([^'\\]|\\.)*\')/, "string"],
          [
            /(\bfun\b|\blet\b|\bif\b|\belse\b|\breturn\b|\bfor\b|\bwhile\b|\bclass\b|\btry\b|\bcatch\b|\bimport\b|\bas\b)/,
            "keyword",
          ],
          [/\bnone\b/, "type"],
          [/\b[0-9]+\b/, "number"],
          [/[a-zA-Z_][a-zA-Z0-9_]*/, "identifier"],
          [/[{}()\[\]]/, "@brackets"],
          [/[;,.]/, "delimiter"],
        ],
      },
    });

    monaco.editor.defineTheme("sfTheme", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6B7280" },
        { token: "keyword", foreground: "7C3AED", fontStyle: "bold" },
        { token: "string", foreground: "059669" },
        { token: "number", foreground: "D97706" },
      ],
      colors: {},
    });

    monaco.languages.registerCompletionItemProvider("sf", {
      provideCompletionItems: (model: any, position: any) => {
        const suggestions = [
          {
            label: "fun",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "fun ${1:name} (${2:args})\n    return none\n",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Function keyword",
          },
          // {
          //   label: "let",
          //   kind: monaco.languages.CompletionItemKind.Keyword,
          //   insertText: "let ",
          //   documentation: "Declare variable",
          // },
          {
            label: "write",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "write(${1:msg})",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Print to console",
          },
        ];
        return { suggestions };
      },
    });
  }

  function handleEditorDidMount(editor: any, monaco: any) {
    monacoRef.current = { editor, monaco };
    editor.focus();

    // Update file content when editor content changes
    // editor.onDidChangeModelContent(() => {
    //   const activeFile = files.find((file) => file.isActive);
    //   if (activeFile) {
    //     const updatedContent = editor.getValue();
    //     updateFiles(
    //       files.map((file) =>
    //         file.isActive ? { ...file, content: updatedContent } : file
    //       )
    //     );
    //   }
    // });
  }

  useEffect(() => {
    let activeFile: any = files.filter((i) => i.isActive);

    if (activeFile.length > 0) {
      activeFile = activeFile[activeFile.length - 1];

      updateCodeInfo({
        code: activeFile.content,
        id: 0,
      });
    }

    return () => {
      monacoRef.current = null;
    };
  }, []);

  let lastFilesLength = files.length;
  useEffect(() => {
    // console.log(lastFilesLength, files.length);

    if (files.length != lastFilesLength) return;
    lastFilesLength = files.length;
    if (monacoRef.current) {
      const activeFile = files.find((file) => file.isActive);
      if (activeFile) {
        monacoRef.current.editor.setValue(activeFile.content);
      }
    }
  }, [files]);

  return (
    <div className="h-full min-h-[60vh]">
      {files.length > 0 ? (
        <MonacoEditor
          theme="sfTheme"
          defaultLanguage="sf"
          defaultValue={
            files.filter((i) => i.isActive)[0]?.content || defaultCode
          }
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
          }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-white">
          <p className="text-xl font-light mb-2">No file is open</p>
          <p className="text-sm">
            Open a file from the file explorer to start editing
          </p>
        </div>
      )}
    </div>
  );
}
