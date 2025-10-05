import { create } from "zustand";

type ECInfo = {
  code: string;
  id: number;
};

type EditorCodeState = {
  codeInfo: ECInfo;
  updateCodeInfo: (newCodeInfo: ECInfo) => void;
};

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

export const useEditorCode = create<EditorCodeState>((set) => ({
  codeInfo: { code: defaultCode, id: 0 },
  updateCodeInfo: (newCode) => set((state) => ({ codeInfo: newCode })),
}));
