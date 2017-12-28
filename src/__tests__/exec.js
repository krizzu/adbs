const { normalAdb, getDevList, execAdb } = require('../exec');

const trueConsole = console;

beforeEach(() => {
  global.console = {
    log: jest.fn(),
  };
});

afterEach(() => {
  global.console = trueConsole;
});

describe("exec's ", () => {
  describe('runNormalAdb', () => {
    it('logs successfuly with proper adb args', done => {
      normalAdb(['shell']).then(() => {
        const consoleCalls = global.console.log.mock.calls;

        expect(consoleCalls[0].length).toEqual(1);
        expect(consoleCalls[0][0]).toBe('success');
        done();
      });
    });

    it('logs error when not valid command passed', done => {
      normalAdb(['unknown']).then(() => {
        const consoleCalls = global.console.log.mock.calls;

        expect(consoleCalls[0].length).toEqual(1);
        expect(consoleCalls[0][0]).toBe('Not a valid command');
        done();
      });
    });
  });

  describe('getAllDevices', () => {
    it('returns all devices (target: all)', done => {
      getDevList('all').then(devList => {
        const expectedList = [
          'SQRLPD135523',
          'emulator-3432',
          'BAM35334AR',
          'DEEM32AR2',
          'emulator-2212',
        ];

        expect(devList.length).toBe(5);
        expect(devList).toEqual(expect.arrayContaining(expectedList));
        done();
      });
    });
    it('returns all emulators', done => {
      getDevList('all-emu').then(devList => {
        const expectedList = ['emulator-3432', 'emulator-2212'];

        expect(devList.length).toBe(2);
        expect(devList).toEqual(expect.arrayContaining(expectedList));
        done();
      });
    });
    it('returns all real devices', done => {
      getDevList('all-dev').then(devList => {
        const expectedList = ['SQRLPD135523', 'BAM35334AR', 'DEEM32AR2'];

        expect(devList.length).toBe(3);
        expect(devList).toEqual(expect.arrayContaining(expectedList));
        done();
      });
    });
    it('returns empty array if no devices', done => {
      getDevList(null).then(devList => {
        expect(devList.length).toEqual(0);

        done();
      });
    });
  });

  describe('execAdbForDevice', () => {
    const devList = ['RDG123321', 'emulator123'];

    it('executes adb for each device', done => {
      const promiseList = [];
      const expectedStdout = expect.stringMatching(/Device \w+ success/);
      devList.forEach(dev => {
        promiseList.push(execAdb(dev, ['netstat']));
      });
      Promise.all(promiseList).then(outputs => {
        outputs.forEach(devOutput => {
          const { stdout } = devOutput;

          expect(stdout).toEqual(expectedStdout);
        });

        done();
      });
    });
  });
});
