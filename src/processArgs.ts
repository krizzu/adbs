import inquirer from 'inquirer';

import CONSTS from './consts';
import { getDevList } from './exec';

async function processArguments(
  args: Array<string>
): Promise<'help' | ProcessedArgs> {
  if (!args.length || /help/.test(args[0])) {
    return 'help';
  }

  const options: ProcessedArgs = {
    target: null,
    adbArgs: args,
  };

  const adbArgs = getAdbArgs(args);
  const target = await pickTarget(args)

 

  return {
    target,
    adbArgs
  }
}

function getAdbArgs(args: Array<string>): Array<string> {

  // check if target is specifiec, slice commands
  if(CONSTS.availableCommands.includes(args[0])) return args.slice(1)

  return args
}

async function pickTarget(args: Array<string>) {
  const devList = await getDevList(CONSTS.targetAll);

  let target = args[0];

  if (devList.length > 0) {
    const pickTarget = {
      type: 'list',
      name: 'target',
      message: 'Please select a target:',
      default: false,
      choices: devList,
    };

    const 

    const picked = await inquirer.prompt(pickTarget);

    if(picked.target)
  }
}

export default processArguments;
