const { ux } = require('@cto.ai/sdk');
const { COLORS } = require('../constants');

const coloredTreeString = () => {
  const treeString = 'Colored Tree'.split('');
  const coloredArr = treeString.map(string => {
    const color = randomColor();
    return color(string);
  });
  return coloredArr.join('');
}

const randomColor = () => {
  const color = COLORS[(COLORS.length * Math.random()) << 0];
  return ux.colors[color]
}

const getColor = color => {
  return ux.colors[color](color)
}

const getArgs = argv => {
  return argv.slice(2, argv.length - 1).filter(arg => !arg.startsWith('-'))
}

const getFlags = argv => {
  return argv.filter(arg => arg.startsWith('-'))
}

module.exports = {
  coloredTreeString,
  randomColor,
  getColor,
  getArgs,
  getFlags,
};
