import chalk from 'chalk';

const log = {
  norm: (message: string) => {
    console.log(message);
  },

  success: (message: string) => {
    const colorMessage = chalk.green(message);
    console.log(colorMessage);
  },

  error: (message: string) => {
    const colorMessage = chalk.rgb(217, 21, 24)(message);
    console.log(colorMessage);
  },
};

export default log;
