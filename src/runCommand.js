const chalk = require('chalk');

const { normalAdb, getDevList, execAdb } = require('./exec');

/**
 * Runs commands, if no target specified, normal adb is launched.
 * Otherwise, run command for every target
 * @param {ProcessedArgs} options
 * @param {string} target adbs targets
 * @property {string[]} adbArgs array of arguments passed to cli
 */
function runCommand(options) {
  if (!options.target) {
    normalAdb(options.adbArgs);
    return;
  }

  const { target, adbArgs } = options;

  getDevList(target).then(async devList => {
    if (!devList.length) {
      console.log(chalk.rgb(217, 21, 24)('No devices attached.'));
    }

    for (const dev of devList) {
      try {
        await execAdb(dev, adbArgs);
      } catch (e) {
        // stderr handles that
      }
    }
  });
}

module.exports = runCommand;
