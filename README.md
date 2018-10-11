
<h1 align="center" style="font-family: monospace; color: #bbb; letter-spacing: 3px">adbs v3</h1>
<div align="center">
  <p align="center">
    Seamless work with multiple Android devices using <a href="https://developer.android.com/studio/command-line/adb.html"><b>android debug bridge</b></a>.
  </p>

  <img src="assets/adbs.gif" />
</div>


## Install

```
npm i -g adbs 

# or

yarn global add adbs
```



## Usage


```
  $ adbs [adbs options] [adb command]

  Options
    all       Run commands on all devices
    dev       Run commands on all real devices
    emu       Run commands on all running emulators
    help      Displays this screen
  
  Examples
    $ adbs all shell netstat
    $ adbs emu install app.apk
```

### Note

If no target (see *adbs options*) is specified, `adbs` will pass all args down to `adb`, so you can use them **interchangeably**.

Example: `adbs devices` will work as `adb devices`.

## License

[MIT](./LICENSE)