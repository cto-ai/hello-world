const { ux, sdk } = require('@cto.ai/sdk')
const {
  LOGO,
  USERS,
  COLORS,
} = require('./constants');
const {
  inputPrompts,
  listPrompts,
  confirmPrompts,
  continuePrompts,
  fuzzySearchPrompts,
  datePickerPrompts,
} = require('./prompts');
const {
  coloredTreeString,
  randomColor,
  getColor,
  getArgs,
  getFlags,
} = require('./utils/helpers');

const main = async () => {
  const argv = process.argv
  const arguments = argv && argv.length ? getArgs(argv) : []
  const flags = argv && argv.length ? getFlags(argv) : []

  const res = await sdk.user().catch(err => sdk.log(err))
  const person = res && res.me ? `, ${res.me.username}` : ' there'
  const greeting = `\n👋  ${ux.colors.bgRed(
    'Welcome to the CTO.ai CLI SDK Demo',
  )} 👋\n\nHi${person}! This is a demo for CTO.ai CLI SDK that will take you through a tour of the user interactions that are included.\nUse these elements to customize your own Ops!`

  sdk.log(LOGO)
  sdk.log(greeting)
  await ux.prompt(continuePrompts)

  const promptsDescription = [
    `\nℹ️  Create prompts to capture information or details.`,
    ` Press enter for examples, type anything when asked, it's just for fun.`,
    `\n\n💬 ${ux.colors.bold(
      ux.colors.primary('Ask for information through a form:'),
    )}`,
  ].join('')

  // Trigger prompt
  // https://github.com/SBoudrias/Inquirer.js/#examples-run-it-and-see-it
  sdk.log(ux.colors.bold.underline('\n⭐ Prompts '))
  sdk.log(promptsDescription)

  // INPUT
  const { email, password } = await ux.prompt(inputPrompts)

  // LIST
  sdk.log(
    `\n💬 ${ux.colors.bold(
      ux.colors.primary('Create lists for users to select from:'),
    )}`,
  )
  const { list } = await ux.prompt(listPrompts)

  // CONFIRM
  sdk.log(
    `\n💬 ${ux.colors.bold(
      ux.colors.primary('Create boolean yes/no prompts:'),
    )}`,
  )
  const { confirm } = await ux.prompt(confirmPrompts)

  // FUZZY SEARCH
  sdk.log(
    `\n💬 ${ux.colors.bold(
      ux.colors.primary(
        'Add a fuzzy search feature to your lists! Try typing and using the arrow keys.',
      ),
    )}`,
  )
  const { autocomplete } = await ux.prompt(fuzzySearchPrompts)

  // DATE PICKER
  sdk.log(`\n💬 ${ux.colors.bold(ux.colors.primary('And specify times:'))}`)
  const { datepicker } = await ux.prompt(datePickerPrompts)

  // Trigger logs
  const logsSection = [
    `\nℹ️  Create logs of events to easily share through the CLI.`,
    `\nFor example, here's the ${ux.colors.bold('Current User')}:\n`,
  ].join('\n')
  sdk.log(ux.colors.bold.underline('\n\n⭐ Logs '))
  sdk.log(logsSection)

  const currentUser = await sdk.user().catch(err => {
    sdk.log('unable to retrieve current user')
  })
  sdk.log(currentUser)
  sdk.track(['demo', 'track'], {
    currentUser,
    answers: { email, password, list, autocomplete, datepicker },
  })
  await ux.prompt(continuePrompts)

  // Trigger spinner and progress bar
  const progressIndicatorsSection = [
    '\nℹ️  Add spinners & progress bars to your Op',
    ' to keep your users informed that a process is taking place.\n',
  ].join('')
  sdk.log(ux.colors.bold.underline('\n⭐ Progress Indicators '))
  sdk.log(progressIndicatorsSection)

  ux.spinner.start(ux.colors.blue(' Computing UX'))
  // Wait
  // https://github.com/oclif/cli-ux#clitable
  await ux.wait(2000)
  ux.spinner.stop(ux.colors.green('Done!'))

  // Progress Bar
  // https://github.com/AndiDittrich/Node.CLI-Progress#usage
  sdk.log(ux.colors.white('\n Downloading Progress Bar'))
  const bar1 = ux.progress.init()
  bar1.start(200, 0)
  for (let i = 0; i < 100; i++) {
    bar1.update((i + 1) * 2)
    await ux.wait(25)
  }
  bar1.stop()
  await ux.prompt(continuePrompts)

  // Url
  // https://github.com/oclif/cli-ux#cliurltext-uri
  sdk.log(ux.colors.bold.underline('\n⭐ Url '))
  sdk.log(
    `\nℹ️  Link users to relevant data directly from the command line for users to click.\n`,
  )
  sdk.log(ux.url('cto.ai', 'https://cto.ai'))
  await ux.prompt(continuePrompts)

  // Table
  // https://github.com/oclif/cli-ux#clitable
  sdk.log(ux.colors.bold.underline('\n⭐ Table '))
  sdk.log(
    `\nℹ️  Add tables to display information in a neat and organized way.\n`,
  )
  ux.table(USERS, {
    name: { header: '🙎‍ Name' },
    company: {
      header: '🏢 Company',
      get: row => row.company && row.company.name,
    },
    id: { header: '🆔' },
  })
  await ux.prompt(continuePrompts)

  // Tree && Colors
  // https://github.com/chalk/chalk
  // https://github.com/oclif/cli-ux#clitree
  let tree = ux.tree()
  tree.insert(coloredTreeString())
  COLORS.forEach(color => {
    tree.nodes[Object.keys(tree.nodes)[0]].insert(getColor(color))
  })
  sdk.log(ux.colors.bold.underline('\n⭐ Colors & Tree Structures '))
  sdk.log(
    `\nℹ️  Add colors to customizable text to indicate importance and/or action.\n`,
  )
  tree.display()

  await ux.prompt(continuePrompts)
  sdk.log(
    `🏁 That's it! All these components can be found within the demo.js folder of the op.\n`,
  )
}

main()

