const execa = require('execa');
const chalk = require('chalk');

// consts
const c = require('./consts');

const emuRegExp = /emulator/;

/**
 *
 * @param {string[]} args arguments to adb
 */
function execNormalAdb(args) {
  return execa(c.adb, args)
    .then(({ stdout }) => console.log(stdout))
    .catch(({ stdout, stderr }) => {
      console.log(stdout || stderr);
    });
}

/**
 * Returns an array of list devices IDs
 * @param {string} target all | all-emu | all-dev
 */
function getAvailableDevices(target) {
  if (!target || !c.availableCommands.includes(target))
    return new Promise(resolve => resolve([]));

  return execa
    .stdout(c.adb, ['devices'])
    .then(list =>
      list
        .trim()
        .split('\n')
        .slice(1)
        .map(dev => dev.split('\t')[0])
    )
    .then(devList =>
      devList.filter(dev => {
        if (target === 'all') return true;
        const isEmu = dev.match(emuRegExp);
        return target === 'all-emu' ? isEmu : !isEmu;
      })
    )
    .catch(e => {
      console.log(`
      ${chalk.rgb(217, 21, 24)('Error while running:')}  ${e.cmd}
      ${chalk.rgb(217, 21, 24)('Error Message:')}        ${e.message}
      `);
    });
}

/**
 *
 * @param {string} deviceID The ID of connected device
 * @param {string[]} args arguments for adb
 */
function execAdbForDevice(deviceID, args) {
  return execa(c.adb, ['-s', deviceID, ...args], {
    cleanup: true,
  });
}

module.exports = {
  normalAdb: execNormalAdb,
  execAdb: execAdbForDevice,
  getDevList: getAvailableDevices,
};
