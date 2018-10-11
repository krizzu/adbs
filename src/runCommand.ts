import log from './log';

import { normalAdb, getDevList, execAdb } from './exec';

/**
 * Runs commands, if no target specified, normal adb is launched.
 */
async function runCommand(options: ProcessedArgs) {
  if (!options.target) {
    normalAdb(options.adbArgs);
    return;
  }

  const { target, adbArgs } = options;

  const devList = await getDevList(target);

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
