/////////////////////////////////////////////////////////////////////////////////////////////////
////// The function for setting up the questions for the quiz
/////////////////////////////////////////////////////////////////////////////////////////////////
var questionForQuizSetup = function() {
    // This function randomly picks the number of questions needed from the question bank
    // and moves them to the array of questions that will be used for this quiz 
    
    // totalQuestions is declared in variables.js
    // questionBank is declared in questions.js

    // Repeat for however many total questions that will be asked
    for (var i = 0; i < totalQuestions; i++) {
        // create random index from 0 to totalQuestions-1
        index = Math.random()*questionBank.length;
        index = Math.floor(index);
        // Push the question to the usedBank
        usedBank.push(questionBank[index])
        // Set up the DOM html element
        questionSetup(questionBank[index], i+1)
        // Remove question from question bank
        questionBank.splice(index, 1);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
////// The function for updating the result message in the end results menu
/////////////////////////////////////////////////////////////////////////////////////////////////
var updateResultMessage = function(totalRightAnswers, totalPossibleQuestions) {
    var resultMessage = ""
    if (totalRightAnswers === totalPossibleQuestions) {
        resultMessage = "Wow! you answered every question correctly!"
    } else if (totalRightAnswers >= (totalPossibleQuestions*.8)) {
        resultMessage = "You did really well!"
    } else if (totalRightAnswers >= (totalPossibleQuestions*.6)) {
        resultMessage = "Not bad, not bad."
    } else if (totalRightAnswers >= (totalPossibleQuestions*.4)) {
        resultMessage = "There is room for improvement."
    } else if (totalRightAnswers >= (totalPossibleQuestions*.1)) {
        resultMessage = "Yikes!"
    } else {
        resultMessage = "The cat must have walked across the keyboard..."
    }
    return resultMessage
}