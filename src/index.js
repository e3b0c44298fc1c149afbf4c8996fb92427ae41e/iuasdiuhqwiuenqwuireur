/*jshint esversion: 9 */
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer   = require('inquirer');
const _   = require('lodash');
const Conversation   = require('./conversation');


clear();
console.log(
  chalk.yellow(
    figlet.textSync('Ultimate.AI', { horizontalLayout: 'full' })
  )
);
console.log(
  chalk.green(
    'bringing bots to ur business since 2017 '
  )
);
var conv = new Conversation('./troubleshooting.json');
var state = conv.reply('');
function state2message(state){
  return ({
    name: state.question,
    message: state.question,
    choices: _.keys(state.answerOptions),
    type: 'list'
  });
}
async function main() {
  while (!state.id.match('End')){
    var answer = await inquirer.prompt(state2message(state));
    state = conv.reply(answer[state.question]);
  }

  console.log(
    chalk.green(
      state.question
    )
  );
}
main();
