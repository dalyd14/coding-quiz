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
    event.preventDefault(); // prevents the page to be reloaded
    // only let click events on buttons through
    if (event.target.tagName.toLowerCase() === "button") { 
        switch (event.target.className) {
            case "start-quiz":
                // if the start quiz button is pressed; start the timer
                startTimer() 
                // give the view high scores button a display of none
                viewHighscoresButton.classList.toggle("display-none")
                // move the start menu to the right off screen
                moveElements(event.target.closest(".start-menu"))
                // next question should be 1 at this point; so move question 1 into view
                moveElements(document.querySelector("#question-" + nextQuestion))
                // increment nextquestion to 2 so that will be the next question to see
                nextQuestion++
                break;
            case "option-button":
                // if one of the answers to the questions is pressed
                var promptEl = event.target.closest(".question")
                var promptEl = promptEl.querySelector(".question-prompt")
                // check to see if the answer is right
                checkAnswer(promptEl.textContent, event.target.id[event.target.id.length-1])
                // no matter what the result is we will move the question to the side
                moveElements(event.target.closest(".question"))
                // if the next question is greater than the total asked questions
                if (nextQuestion > totalQuestions) {
                    // stop timer because the quiz has been completed
                    stopTimer();
                    // make the view high scores button visibility
                    viewHighscoresButton.classList.toggle("display-none")
                    // update the end menu with the stats of the quiz
                    updateEndMenu();
                    // once the end menu is updated; move the end menu into view
                    moveElements(document.querySelector("#end-menu"))
                } else {
                    // if the quiz is not over yet check the time
                    if (timeRemaining > 0) {
                        // if the time is still going move the next questions into view
                        moveElements(document.querySelector("#question-" + nextQuestion))
                        // increment the next question so it will be the next one displayed
                        nextQuestion++;
                    }
                }
                break;
            case "submit-score-button":
                // if the submit score button was pressed
                // find the score display on the page
                var scoreDisplayEl = document.querySelector("#score-display");

                // make the view high scores button visibility
                viewHighscoresButton.classList.toggle("display-none")

                if (scoreDisplayEl && checkInput()) {
                    // if the score display element was found and the user has entered their initials                  
                    // push the just entered scores to the scoresArray
                    highScores.push({
                        initials: document.querySelector("#score-initial").value,
                        score: document.querySelector("#total-score").textContent
                    })
                    // save the new scores to the localStorage
                    updateScores(highScores);
                    // if the scoresArray does have content in it
                    if (highScores){
                        // Sort scores Array from greatest score to least https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                        highScores = highScores.sort(function (a, b) {
                            return b.score - a.score;
                        })
                        // update the scores table with the ordered scoresArray
                        scoreDisplayEl.appendChild(updateScoresTable(highScores));
                        // move the end menu out of view; and then move the score display into view
                        moveElements(document.querySelector("#end-menu"), true)
                        moveElements(document.querySelector("#score-display"))
                    }
                }    
                break;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
/////// Function for clicking on the header buttons
////////////////////////////////////////////////////////////////////////////////////////////////////
var highScoreClick = function() {
    // find the scores display element
    var scoreDisplayEl = document.querySelector("#score-display");
    if (scoreDisplayEl) {
        viewHighscoresButton.classList.toggle("display-none")
        // Sort scores Array from greatest score to least https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        highScores = highScores.sort(function (a, b) {
            return b.score - a.score;
        })
        // update the scores table with the ordered scoresArray
        scoreDisplayEl.appendChild(updateScoresTable(highScores))
        // move to scores display element
        skipToScores();
    }

}

/////////////////////////////////////////////////////////////////////////////////////////////////
//////////// Checking functions
/////////////////////////////////////////////////////////////////////////////////////////////////
var checkAnswer = function(prompt, userAnswer) {
    // Check if answer that the user selected is correct
    // loop through all the available questions
    for(var i = 0; i < usedBank.length; i++) {
        // check if the prompt matches the available question prompts
        if (usedBank[i].question === prompt) {
            // if the question is found; convert the button number that was pressed to a number
            userAnswer = parseInt(userAnswer);
            // get the answer from the bank and compare to the button number that was pressed
            if (userAnswer === usedBank[i].answer) {
                // if it matched then the answer is correct
                // increase the total right variable by one
                totalRight++;
                // call display right or wrong function to display "Correct"
                displayRightOrWrong(true);
            } else {
                // call penalyty timer to subtract the timer by a certain amount
                penaltyTimer();
                // call display right or wrong function to display "Correct"
                displayRightOrWrong(false);
            }
        }
    }
}
var checkInput = function() {
    // This checks to make sure the initial text field is filled out before proceeding
    // this finds the input text field
    var initialInputTextField = document.querySelector("#score-initial")
    // checks to see if the value is empty
    if (!initialInputTextField.value) {
        // send alert to user
        alert("Please enter your initials.")
        // return false to tell the code not to proceed until the user enters their initials
        return false
    } else {
        // return true to tell the code it can send the score to localStorage
        return true
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
        // make the view high scores button visibility
        viewHighscoresButton.classList.toggle("display-none")
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

/////////////////////////////////////////////////////////////////////////////////////////////////
//////// Local Storage Functions
/////////////////////////////////////////////////////////////////////////////////////////////////
var receiveScores = function() {
    var quizScores = JSON.parse(localStorage.getItem("quizScores"));
    return quizScores;
}
var updateScores = function(scoresArray) {
    localStorage.setItem("quizScores", JSON.stringify(scoresArray))
}