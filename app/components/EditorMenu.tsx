"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

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
            label: "fn",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "fn ",
            documentation: "Function keyword",
          },
          {
            label: "let",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "let ",
            documentation: "Declare variable",
          },
          {
            label: "print",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "print(${1:msg});",
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
  }

  useEffect(() => {
    return () => {
      monacoRef.current = null;
    };
  }, []);

  return (
    <div className="h-full min-h-[60vh]">
      <MonacoEditor
        theme="sfTheme"
        defaultLanguage="sf"
        defaultValue={defaultCode}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
        }}
        className=""
      />
    </div>
  );
}
