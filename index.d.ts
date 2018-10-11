type NodeStream = import('stream')

type ProcessedArgs = {
  target: string | null,
  adbArgs: Array<string>,
};

type DevTarget = "all" | "emu" | "dev" | string

interface ExecaStream  {
  stdout: NodeStream,
  stdin: NodeStream,
  stderr: NodeStream
}