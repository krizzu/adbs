<h1 align="center">
  <br>
  <a href="https://github.com/Krizzu/adbs"><img src="assets/adbs.svg" alt="adbs" width="250"></a>
  <br>
</h1>

<h4 align="center">Seamless work with multiple Android devices using <a href="https://developer.android.com/studio/command-line/adb.html"><b>android debug bridge</b></a>.</h4>


<p align="center">

  <image src="https://img.shields.io/npm/dt/adbs.svg" alt="download count">
  <image src="https://img.shields.io/circleci/project/github/Krizzu/adbs.svg" alt="CI status" />
  
  <image src="https://img.shields.io/npm/v/adbs.svg" alt="package version">

  <a href="https://saythanks.io/to/Krizzu">
      <img src="https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg">
  </a>

  <div align="center">
    <img width=650 src="assets/adbsv3.gif" />
  </div>
  <br>
</p>

## About:

[Android Debug Bridge](https://developer.android.com/studio/command-line/adb) is a versatile command-line tool that lets you communicate with a device. It's included in the Android SDK Platform-Tools package. Must-have tool while developing android apps.

Although `adb` is great, it becomes a bit cumbersome when used with more than one android device (connected real phone/emulator to host). You have to specify a "target device", by providing it's unique device number.


`adbs` ease this pain by giving you a nice UI for selecting "target device". Can be used interchangeably with `adb` itself.



## Highlights:

  - Helps distributing `adb` commands to multiple devices/emulators
  - If more than one device/emulator is running, prompt will ask for target
  - You can specify targets upfront (see [**Usage**](#usage))
  - Can be used **interchangeably** with `adb`



## Install:

To install `adbs`, you'll need [Node.js](https://nodejs.org/en/download/) and one of package managers: [npm](https://www.npmjs.com/) (comes with node) or [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable). Next, using command line:

```
$ npm install --global adbs 

# or

$ yarn global add adbs
```



## Usage


```
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
```



## License

[MIT](./LICENSE)