const survey = require('./surveyValidator')
const user   = require('./userValidator')
const question = require('./questionValidator')
const choice = require('./choiceValidator');
const answer = require('./answerValidator')
module.exports = {
    survey,
    user,
    question,
    choice,
    answer
}