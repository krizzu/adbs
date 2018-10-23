import chalk from 'chalk';
import log from './log';

import pckJson from '../package.json';

const currentVersion = pckJson.version;

function version(): void {
  const colorText = chalk.hex('2faf44');

  log.norm(`adbs version: ${colorText(currentVersion)}`);
}

export default version;
