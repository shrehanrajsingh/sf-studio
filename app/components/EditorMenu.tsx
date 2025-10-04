"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const defaultCode = `class Person
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

`;

export default function EditorMenuMonaco() {
  const monacoRef = useRef<any>(null);

  function handleEditorWillMount(monaco: any) {
    monaco.languages.register({ id: "sf" });

    monaco.languages.setMonarchTokensProvider("sf", {
      defaultToken: "",
      tokenizer: {
        root: [
          [/\/\/.*$/, "comment"],
          [/\"([^"\\]|\\.)*\"/, "string"],
          [
            /(\bfun\b|\blet\b|\bif\b|\belse\b|\breturn\b|\bfor\b|\bwhile\b|\bclass\b|\btry\b|\bcatch\b)/,
            "keyword",
          ],
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

    // Completion provider (very basic)
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
      // cleanup
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
