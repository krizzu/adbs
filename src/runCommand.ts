import log from './log';
import CONSTS from './consts';

import { normalAdb, getDevList, execAdb } from './exec';

/**
 * Runs commands, if no target specified, normal adb is launched.
 */
async function runCommand(options: ProcessedArgs): Promise<void> {
  if (!options.target) {
    normalAdb(options.adbArgs);
    return;
  }

  const { target, adbArgs } = options;

  let devList: AvailableTargets = [];

  if (CONSTS.availableCommands.includes(target as AvailableOptions)) {
    devList = await getDevList(target as AvailableOptions);
  } else {
    devList = target;
  }

  if (!devList.length) {
    log.error('No devices attached.');
    return;
  }

  for (const dev of devList) {
    try {
      await execAdb(dev, adbArgs);
    } catch (e) {
      // noop, stderr handles it
    }
  }
}

export default runCommand;
