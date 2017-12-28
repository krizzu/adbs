const processArgs = require('./processArgs');
const displayHelp = require('./displayHelp');
const runCmd = require('./runCommand');

const args = process.argv.slice(2);

const command = processArgs(args);

if (command === 'help') return displayHelp();

runCmd(command);
