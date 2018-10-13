type NodeStream = import('stream');

declare module 'execa';

type TargetAll = 'all';
type TargetEmu = 'emu';
type TargetDev = 'dev';

type AvailableTargets = AvailableOptions | Array<string> | null;

type AvailableOptions = TargetAll | TargetEmu | TargetDev;

type ProcessedArgs = {
  target: AvailableTargets;
  adbArgs: Array<string>;
};

interface ExecaStream {
  stdout: NodeStream;
  stdin: NodeStream;
  stderr: NodeStream;
}
