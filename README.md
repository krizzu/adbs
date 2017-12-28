
<h1 align="center" style="font-family: monospace; color: #bbb; letter-spacing: 3px">adbs</h1>
<p align="center">
  Seamless work with multiple Android devices using <a href="https://developer.android.com/studio/command-line/adb.html"><b>android debug bridge</b></a>.
</p>


## Install

```
npm i -g adbs 

# or

yarn add global adbs
```



## Usage


```
  $ adbs [adbs options] [adb command]

  Options
    all       Run commands on all devices
    all-dev   Run commands on all real devices
    all-emu   Run commands on all running emulators
    help      Displays this screen
  
  Examples
    $ adbs all shell netstat
    $ adbs all-emu install app.apk
```

### Note

If no target (see *adbs options*) is specified, `adbs` will pass all args down to `adb`, so you can use them interchangeably.

Example: `adbs devices` will work as `adb devices`.

## License

[MIT](./LICENSE)