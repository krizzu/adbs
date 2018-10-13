import processArgs from './processArgs';
import displayHelp from './displayHelp';
import runCmd from './runCommand';

async function main() {
  const args = process.argv.slice(2);
  const command = await processArgs(args);

  if (command === 'help') displayHelp();
  else runCmd(command);
}

main();
