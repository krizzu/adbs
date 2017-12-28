const processArgs = require('../processArgs');

describe('processArgs', () => {
  describe('runs help', () => {
    it('with no commands at all', () => {
      const empty = processArgs([]);
      expect(empty).toEqual('help');
    });
    it('with help commands', () => {
      const empty = processArgs(['help', '--option']);
      expect(empty).toEqual('help');
    });
  });
  describe('does not run help', () => {
    it('no help if other args are passed', () => {
      const somethingElse = processArgs(['shell', 'netstat']);
      expect(somethingElse).not.toBe('help');
    });
  });
});
