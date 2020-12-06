function determineAnswer(given, answer) {
  if (given.length !== 4) {
    console.log('invalid input')
    process.exit()
  }
  const dots = []
  
  const notWhiteGiven = []
  const notWhiteAnswer = []
  
  // Check each position
  for (let i = 0; i < given.length; i++) {
    // if right number in posintion
    if (given[i] === answer[i]) {
      // add a white dot
      dots.push('white')
    } else {
      // OTherwise add to a new list
      notWhiteGiven.push(given[i])
      notWhiteAnswer.push(answer[i])
    }
  }
  
  // Check each new position
  for (let i = 0; i < notWhiteGiven.length; i++) {
    // if exists in new notWhite
    if (notWhiteAnswer.includes(notWhiteGiven[i])) {
      // add Red dot
      dots.push('Red')
      // remove from new list
      notWhiteAnswer.splice(notWhiteAnswer.findIndex(val => val === notWhiteGiven[i]), 1)
    }
  }
  return dots
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = determineAnswer
}