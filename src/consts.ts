const targetAll: TargetAll = 'all';
const targetDev: TargetDev = 'dev';
const targetEmu: TargetEmu = 'emu';
const targetCustom = 'custom';

const pickTargetChoices = [
  {
    name: 'All',
    value: targetAll,
  },
  {
    name: 'Emulators',
    value: targetEmu,
  },
  {
    name: 'Physical devices',
    value: targetDev,
  },
  {
    name: 'Pick devices/emulators',
    value: targetCustom,
  },
];

const pickTargetQuestion = {
  type: 'list',
  name: 'target',
  message: 'Please select a target:',
  default: false,
  choices: pickTargetChoices,
};

const constants = {
  adb: 'adb',
  availableCommands: [targetAll, targetDev, targetEmu],
  targetAll,
  targetDev,
  targetEmu,
  targetCustom,
  pickTargetQuestion,
};

export default constants;
