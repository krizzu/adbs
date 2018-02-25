const execa = require('execa');
const chalk = require('chalk');

// consts
const c = require('./consts');

const emuRegExp = /emulator/;

/**
 *
 * @param {*} stream execa Promise that is a stream
 * @param {string} device device name
 */
async function handleOutput(stream, device) {
  console.log(
    chalk.green(`\nDevice ${chalk.rgb(249, 200, 43)(device)} output:`)
  );

  stream.stdout.pipe(process.stdout);
  stream.stderr.pipe(process.stderr);

  return stream;
}

/**
 *
 * @param {string[]} args arguments to adb
 */
function execNormalAdb(args) {
  const proc = execa(c.adb, args);
  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);
  return proc;
}

/**
 * Returns an array of list devices IDs
 * @param {string} target all | emu | dev
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
        return target === 'emu' ? isEmu : !isEmu;
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
  const adbProcess = execa(c.adb, ['-s', deviceID, ...args], {
    cleanup: true,
  });

  return handleOutput(adbProcess, deviceID);
}

module.exports = {
  normalAdb: execNormalAdb,
  execAdb: execAdbForDevice,
  getDevList: getAvailableDevices,
};
