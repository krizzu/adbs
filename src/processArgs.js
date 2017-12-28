/**
 * @typedef {Object} ProcessedArgs
 * @property {string} target adbs targets
 * @property {string[]} adbArgs adb arguments
 */

const c = require('./consts');

/**
 * Processes the arguments passed to cli
 * @param {string[]} args an list of options
 * @returns {ProcessedArgs} arguments to pass to adb
 */
function processArguments(args) {
  if (!args.length || args[0] === 'help') {
    return 'help';
  }

  const options = {
    target: null,
    adbArgs: args,
  };

  const target = args[0];

  if (c.availableCommands.includes(target)) {
    options.target = target;
    options.adbArgs = args.slice(1);
  }

  return options;
}

module.exports = processArguments;
