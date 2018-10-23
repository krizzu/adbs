import processArgs from '../processArgs';

describe('processArgs', () => {
  describe('runs help', () => {
    it('with no commands at all', async () => {
      const empty = await processArgs([]);
      expect(empty).toEqual('help');
    });
    it('with help commands', async () => {
      const empty = await processArgs(['help', '--option']);
      expect(empty).toEqual('help');
    });
  });
  describe('does not run help', () => {
    it('no help if other args are passed', async () => {
      const somethingElse = await processArgs(['emu', 'shell', 'netstat']);
      expect(somethingElse).not.toBe('help');
    });
  });
});
