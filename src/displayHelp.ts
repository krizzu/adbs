// To-do - update this

import log from './log';

function help() {
  log.norm(`
    Usage
      $ adbs [adbs options] [adb command]

    Options
      all       Run commands on all devices
      dev       Run commands on all real devices
      emu       Run commands on all running emulators
      help      Displays this screen
    
    Examples
      $ adbs all shell netstat
      $ adbs emu install app.apk
`);
}

export default help;