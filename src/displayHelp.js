function help() {
  console.log(`
    Usage
      $ adbs [adbs options] [adb command]

    Options
      all       Run commands on all devices
      all-dev   Run commands on all real devices
      all-emu   Run commands on all running emulators
      help      Displays this screen
    
    Examples
      $ adbs all shell netstat
      $ adbs all-emu install app.apk
`);
}

module.exports = help;
