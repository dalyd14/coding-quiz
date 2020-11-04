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

////////////////////////////////////////////////////////////////////////////////////////////////////
/////// Function for clicking on buttons in the main page content
////////////////////////////////////////////////////////////////////////////////////////////////////
var buttonClick = function(event) {
    event.preventDefault();
    if (event.target.tagName.toLowerCase() === "button") {
        switch (event.target.className) {
            case "start-quiz":
                startTimer()
                moveElements(event.target.closest(".start-menu"))
                console.log("start quiz")
                moveElements(document.querySelector("#question-" + nextQuestion))
                nextQuestion++
                break;
            case "option-button":
                var promptEl = event.target.closest(".question")
                var promptEl = promptEl.querySelector(".question-prompt")
                checkAnswer(promptEl.textContent, event.target.id[event.target.id.length-1])
                moveElements(event.target.closest(".question"))
                if (nextQuestion > totalQuestions) {
                    stopTimer();
                    updateEndMenu();
                    moveElements(document.querySelector("#end-menu"))
                } else {
                    if (timeRemaining > 0) {
                        moveElements(document.querySelector("#question-" + nextQuestion))
                        nextQuestion++;
                    }
                }
                break;
            case "submit-score-button":
                var scoreDisplayEl = document.querySelector("#score-display");
                if (scoreDisplayEl && checkInput()) {
                    var scoresArray = pastScores
                    scoresArray.push({
                        initials: document.querySelector("#score-initial").value,
                        score: document.querySelector("#total-score").textContent
                    })
                    updateScores(scoresArray);
                    var newScoresArray = receiveScores();
                    if (newScoresArray){
                        // Sort scores Array from greates score to least https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                        newScoresArray = newScoresArray.sort(function (a, b) {
                            return b.score - a.score;
                        })
                        var scoreDisplayEl = document.querySelector("#score-display")
                        scoreDisplayEl.appendChild(updateScoresTable(newScoresArray));
                        moveElements(document.querySelector("#end-menu"))
                        moveElements(document.querySelector("#score-display"))
                    }
                }    
                break;
        }
    }
}



/////////////////////////////////////////////////////////////////////////////////////////////////
//////////// Timer functions
/////////////////////////////////////////////////////////////////////////////////////////////////
var startTimer = function() {
    // Start timer for the quiz
    // this calls a subtract function for 1 second
    quizTimer = setInterval(subtractTime, 1000, 1);
}
var penaltyTimer = function() {
    // this functions calls the subtract function
    // this will subtract the time remaining by the time penalty
    subtractTime(timePenalty);
}
var subtractTime = function(amount) {
    // this subtracts the remaining time by the input amout
    timeRemaining -= amount;

    // check if the time remaining to see if its less than 0
    if (timeRemaining <= 0) {
        // if it is less than 0 just make it 0
        timeRemaining = 0
        // call the stop timer function
        stopTimer();
        // since the timer ran out, the quiz is over and we will skip to end
        skipToEnd()
    }
    // now finally call the updateTime function for the time remaining header
    updateTime()
}
var updateTime = function() {
    // the timeRemainingEl was declared in the variables.js
    timeRemainingEl.textContent = timeRemaining;
}
var stopTimer = function() {
    // the stop timer will clear the interval
    clearInterval(quizTimer)
}