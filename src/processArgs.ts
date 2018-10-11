import CONSTS from './consts';

function processArguments(args: Array<string>): 'help' | ProcessedArgs {
  if (!args.length || /help/.test(args[0])) {
    return 'help';
  }

  const options: ProcessedArgs = {
    target: null,
    adbArgs: args,
  };

  // TO-DO: use inquirier to ask for target

  const target = args[0];

  if (CONSTS.availableCommands.includes(target)) {
    options.target = target;
    options.adbArgs = args.slice(1);
  }

  return options;
}

export default processArguments;
