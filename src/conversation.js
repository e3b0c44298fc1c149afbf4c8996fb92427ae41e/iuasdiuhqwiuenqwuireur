/*jshint esversion: 9 */
const _ = require('lodash'); // jslint ignore:line
//default state in case user answers something that is different than an option
let otherState=  {
  "id": "otherState",
  "question": "I would like to try something else",
  "answerOptions": { "Start over?": "start",
    "I'd like to get in touch with the operator":
    "customerServiceEnd"
  }
};

let customerServiceEnd=  {
  "id": "customerServiceEnd",
  "question": "Please wait while we dial for the operator",
};

class Conversation {
  constructor(fileName) {
    //load json from file
    this.conversation_ = _.cloneDeep(require(`${fileName}`));
    /*
     * transform answerOptions
     * from
      "answerOptions": [
        {
          "answer": "Start over?",
          "nextState": "start"
        },
        {
          "answer": "I'd like to get in touch with the operator",
          "nextState": "customerServiceEnd"
        }
      ]
     * into
     *
      "answerOptions":
        {
          "Start over?": "start"
          "I'd like to get in touch with the operator": "customerServiceEnd"
        }
     *
     */
    var moddedConversation = _(this.conversation_)
      .map((v)=>{
        if(v.answerOptions){
          v.answerOptions = {..._(v.answerOptions).map(v=>{
            return [v.answer,v.nextState];
          }).fromPairs().value(), ...{'I want to try something else': 'otherState'}};
        }
        return v;
      })
      .value();
    // add alternative options
    moddedConversation.push(otherState);
    moddedConversation.push(customerServiceEnd);

    /*
     * transforms array
     * [ {id: "something", obj: ...}]
     * into{
     *  something: { id: "something", obj: ... }
     * }
     */
    this.conversation = _(moddedConversation)
      .map('id')
      .zip(moddedConversation)
      .fromPairs()
      .value();
    this.state = 'start';
  }
  reply(answer){
    // state machine
    if(answer === ''){
      this.state = 'start';
      return this.conversation[this.state];
    }
    //if answer matches
    if(this.conversation[this.state].answerOptions[answer]){
      this.state = this.conversation[this.state].answerOptions[answer];
      return this.conversation[this.state];
    }
    //if other answer
    return otherState;
  }
}
module.exports = Conversation;
