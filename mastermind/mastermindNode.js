const prompt = require('prompt')
const determineAnswer = require('./mastermind')

const answer = [5, 3, 6, 5]

let dots = []

var schema = {
  properties: {
    numbers: {
      pattern: /^[1-7] [1-7] [1-7] [1-7]$/,
      message: 'Guess what you think the Mastermind has picked',
      required: true
    }
  }
};

function promptForNums() {
  prompt.get(schema, (error, result) => {
    if (error) {
      console.log('Please Try again')
      return
    }
    const dots = determineAnswer(result.numbers.split(' ').map(Number), answer)
    if(dots.join('') === ['white','white','white','white'].join('')){
      console.log('congratulations! You win')
      return
    }
    console.log('Try again, Your result is: ', dots)
    promptForNums()
  })
}

promptForNums()