import processArgs from './processArgs';
import displayHelp from './displayHelp';
import runCmd from './runCommand';

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = await processArgs(args);

  if (command === 'help') displayHelp();
  else runCmd(command);
}

main();
