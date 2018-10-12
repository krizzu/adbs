import processArgs from './processArgs';
import displayHelp from './displayHelp';
import runCmd from './runCommand';

const args = process.argv.slice(2);

const command = processArgs(args);

if (command === 'help') displayHelp();
else runCmd(command);
