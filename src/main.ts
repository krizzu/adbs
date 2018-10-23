import processArgs from './processArgs';
import displayHelp from './displayHelp';
import displayVersion from './displayVersion';
import runCmd from './runCommand';

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = await processArgs(args);

  if (command === 'help') displayHelp();
  else if (command === 'version') displayVersion();
  else runCmd(command);
}

main();
