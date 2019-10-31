const { ux } = require('@cto.ai/sdk');
const fuzzy = require('fuzzy');
const { STATES } = require('../constants');

const { white, reset } = ux.colors;

const inputPrompts = [
  {
    type: 'input',
    name: 'email',
    message: `\nYou can prompt the user for input ${reset.green(
      '→',
    )}\n${white('Type input here')}`,
    afterMessage: `${reset.green('✓')} Input`,
    afterMessageAppend: `${reset(' added!')}`,
  },
  {
    type: 'password',
    name: 'password',
    mask: '*',
    message: `\nYou can also prompt the user for a password ${reset.green(
      '→',
    )}\n${white('Enter password here')}`,
    afterMessage: `${reset.green('✓')} Password added!`,
  },
]

const listPrompts = [
  {
    type: 'list',
    name: 'list',
    message: `\nWhat impact is the incident having ${reset.green(
      '→',
    )}`,
    choices: [
      'All customers are affected.',
      'Large segment of customers are affected.',
      'Small segment of customers are affected.',
      'Site performance degraded for some customers.',
      'Potential issue, but customers are currently unaware.',
      'All customers are affected.',
      'Large segment of customers are affected.',
      'Small segment of customers are affected.',
      'Site performance degraded for some customers.',
      'All customers are affected.',
      'Large segment of customers are affected.',
      'Small segment of customers are affected.',
      'Site performance degraded for some customers.',
    ],
    afterMessage: `${reset.green('✓')} Incident added!`,
  },
]

const confirmPrompts = [
  {
    type: 'confirm',
    name: 'confirm',
    message: `\nIs the incident closed ${reset.green('→')}\n\n`,
    afterMessage: `${reset.green('✓')} Confirmation`,
  },
]

const continuePrompts = [
  {
    type: 'input',
    name: 'continue',
    message: `\nPress enter to continue →`,
    afterMessage: ' ',
    transformer: input => ' ',
  },
]

const fuzzySearchPrompts = [
  {
    type: 'autocomplete',
    name: 'autocomplete',
    message: `\nSelect a state to travel from ${reset.green('→')} `,
    source: (answers, input) => {
      input = input || ''
      return new Promise(function(resolve) {
        setTimeout(function() {
          var fuzzyResult = fuzzy.filter(input, STATES)
          resolve(
            fuzzyResult.map(function(el) {
              return el.original
            }),
          )
        })
      })
    },
    afterMessage: `${reset.green('✓')} State selected!`,
  },
]

const datePickerPrompts = [
  {
    type: 'datepicker',
    name: 'datepicker',
    message: `\nWhen are you going ${reset.green('→')}`,
    format: ['m', '/', 'd', '/', 'yy', ' ', 'h', ':', 'MM', ' ', 'TT'],
    afterMessage: `${reset.green('✓')} Date Selected`,
  },
]

module.exports = {
  inputPrompts,
  listPrompts,
  confirmPrompts,
  continuePrompts,
  fuzzySearchPrompts,
  datePickerPrompts,
};
