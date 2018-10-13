// To-do - update this to match v3

import log from './log';

function help(): void {
  log.norm(`

  $ adbs [adbs options] [adb command]

  Options
    all                     Run commands on all devices
    dev                     Run commands on all physical devices
    emu                     Run commands on all running emulators
    help    | -h            Displays this screen
    version | -v            Display current adbs version
  
  Examples
    $ adbs all shell netstat
    $ adbs emu install app.apk

`);
}

export default help;
