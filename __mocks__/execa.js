const adbCommandsAvailable = ['devices', '-s', 'shell', 'netstat'];

const devList =
  'Devices list:\n' +
  'SQRLPD135523\tdevice\n' +
  'BAM35334AR\tdevice\n' +
  'emulator-3432\tdevice\n' +
  'emulator-2212\tdevice\n' +
  'DEEM32AR2\tdevice\n';

function resolveAdb(stdout = 'success', stdoutOnly = false) {
  return stdoutOnly
    ? stdout
    : {
        stderr: stdout,
        stdout,
      };
}

function execa(cmd, args) {
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      if (cmd !== 'adb') reject(resolveAdb('Not a proper command'));

      if (!adbCommandsAvailable.includes(args[0])) {
        reject(resolveAdb('Not a valid command'));
      }

      // devices command
      if (args[0] === 'devices') {
        resolve(resolveAdb(devList, true));
      }

      // executing adb for devices
      if (args[0] === '-s') {
        const dev = args[1];
        resolve(resolveAdb(`Device ${dev} success`));
      }

      resolve(resolveAdb());
    });
  });
}

execa.stdout = execa;

module.exports = execa;
