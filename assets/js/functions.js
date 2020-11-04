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