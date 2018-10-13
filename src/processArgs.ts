import inquirer from 'inquirer';

import CONSTS from './consts';
import { getDevList } from './exec';

// check if target is specifiec, slice commands
function getAdbArgs(args: Array<string>): Array<string> {
  if (CONSTS.availableCommands.includes(args[0] as AvailableOptions))
    return args.slice(1);

  return args;
}

// The precedence is: command targets (specified with CLI), Enquiries
async function pickTarget(args: Array<string>): Promise<string> {
  let target = args[0] as AvailableOptions;

  if (CONSTS.availableCommands.includes(target)) return target;

  const devList = await getDevList(CONSTS.targetAll);
  if (devList.length <= 1) {
    target = null;
  } else {
    const picked: inquirer.Answers = await inquirer.prompt(
      CONSTS.pickTargetQuestion
    );

    // if user wants to specify target
    if (picked.target !== CONSTS.targetCustom) {
      target = picked.target;
    } else {
      const pickDevices = {
        type: 'checkbox',
        name: 'devices',
        message: 'Please select devices:',
        default: false,
        choices: devList.map(dev => ({
          name: dev,
          value: dev,
          checked: false,
        })),
      };

      const picked: inquirer.Answers = await inquirer.prompt(pickDevices);

      if (picked.devices.length == 0) target = null;
      else target = picked.devices;
    }
  }

  return target;
}

async function processArguments(
  args: Array<string>
): Promise<'help' | ProcessedArgs> {
  if (!args.length || /help/.test(args[0]) || args[0] === '-h') {
    return 'help';
  }

  const adbArgs = getAdbArgs(args);
  const target = (await pickTarget(args)) as AvailableTargets;

  return {
    target,
    adbArgs,
  };
}

export default processArguments;
