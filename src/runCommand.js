const getStream = require('get-stream');
const chalk = require('chalk');

const { normalAdb, getDevList, execAdb } = require('./exec');

/**
 * Aggregate data from stdout/stderr streams into log
 * @param {Promise[]} streams list of output/error streams to display
 * @param {*} device device id
 */
function handleOutputPrint(streams, device) {
  Promise.all(streams).then(output => {
    console.log(
      chalk.green(`\nDevice ${chalk.rgb(249, 200, 43)(device)} output:`)
    );
    console.log(output.join('').trim() || 'Done.');
  });
}

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

  getDevList(target).then(devList => {
    if (!devList.length) {
      console.log(chalk.rgb(217, 21, 24)('No devices attached.'));
    }

    devList.forEach(dev => {
      const streams = execAdb(dev, adbArgs);
      const streamList = [getStream(streams.stdout), getStream(streams.stderr)];

      handleOutputPrint(streamList, dev);
    });
  });
}

module.exports = runCommand;
