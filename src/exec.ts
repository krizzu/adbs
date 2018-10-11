import execa from 'execa';
import chalk from 'chalk';

import log from './log';
import CONSTS from './consts';

const emuRegExp = /emulator/;

function handleOutput(stream: ExecaStream, device: string) {
  const deviceName = chalk.rgb(249, 200, 43)(device);
  log.success(`\nDevice ${deviceName} output:`);

  stream.stdout.pipe(process.stdout);
  stream.stderr.pipe(process.stderr);

  return stream;
}

function execNormalAdb(args: Array<string>) {
  const proc = execa(CONSTS.adb, args);
  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);
  return proc;
}

async function getAvailableDevices(target: DevTarget) {
  if (!target || !CONSTS.availableCommands.includes(target)) return [];

  return execa
    .stdout(CONSTS.adb, ['devices'])
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
      log.norm(`
      ${chalk.rgb(217, 21, 24)('Error while running:')}  ${e.cmd}
      ${chalk.rgb(217, 21, 24)('Error Message:')}        ${e.message}
      `);
    });
}

function execAdbForDevice(deviceID: string, args: Array<string>) {
  const adbProcess = execa(CONSTS.adb, ['-s', deviceID, ...args], {
    cleanup: true,
  });

  return handleOutput(adbProcess, deviceID);
}

export const execAdb = execAdbForDevice;
export const normalAdb = execNormalAdb;
export const getDevList = getAvailableDevices;
