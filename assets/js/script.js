//////////////////////////////////////////
// Setup Functions
var setupPage = function() {
    headerSetup();
    startMenuSetup();
    questionForQuizSetup();
    mainContentEl.appendChild(endMenuSetup());
    mainContentEl.appendChild(setupScoresTable());
}
// Update end menu dynamic values on the page
var updateEndMenu = function() {
    var endMenu = document.querySelector("#end-menu")
    if (endMenu) {
        endMenu.querySelector("#result-message").textContent = updateResultMessage(totalRight, totalQuestions);
        endMenu.querySelector("#total-right").textContent = totalRight;
        endMenu.querySelector("#questions-total").textContent = totalQuestions;
        endMenu.querySelector("#time-left").textContent = timeRemaining;
        endMenu.querySelector("#total-score").textContent = (totalRight*2 + timeRemaining);
    }
}
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
var setupScoresTable = function() {

    // div for display container
    var scoreDisplay = document.createElement("div")
    scoreDisplay.className = "score-display waiting"
    scoreDisplay.id = "score-display"

    // Add a header
    var scoreDisplayHeading = document.createElement("h1")
    scoreDisplayHeading.textContent = "Here are the past scores..."
    scoreDisplay.appendChild(scoreDisplayHeading)

    return scoreDisplay
}
var updateScoresTable = function(scoresArray) {
    var scoreDisplayGrid = document.createElement("div")
    scoreDisplayGrid.className = "score-display-grid"

    for (var i = 0; i < scoresArray.length; i++ ) {
        var scoreDisplayItem = document.createElement("div")
        scoreDisplayItem.className = "score-display-item present"
        var scoreDisplayItemInitials = document.createElement("p")
        var scoreDisplayItemScore = document.createElement("p")
        scoreDisplayItemInitials.className = "initials"
        scoreDisplayItemScore.className = "score"
        scoreDisplayItemInitials.textContent = scoresArray[i].initials
        scoreDisplayItemScore.textContent = scoresArray[i].score
        var scoreDisplayItemPosition = document.createElement("p")
        scoreDisplayItemPosition.className = "position"
        scoreDisplayItemPosition.textContent = i+1
        scoreDisplayItem.appendChild(scoreDisplayItemPosition)
        scoreDisplayItem.appendChild(scoreDisplayItemInitials)
        scoreDisplayItem.appendChild(scoreDisplayItemScore)

        scoreDisplayGrid.appendChild(scoreDisplayItem)
    }

    return scoreDisplayGrid
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions called when the page content is clicked
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
// Check if answer that the user selected is correct
var checkAnswer = function(prompt, userAnswer) {
    for(var i = 0; i < usedBank.length; i++) {
        if (usedBank[i].question === prompt) {
            userAnswer = parseInt(userAnswer);
            if (userAnswer === usedBank[i].answer) {
                console.log("Correct");
                totalRight++;
                displayRightOrWrong(true);
            } else {
                penaltyTimer();
                console.log("Incorrect");
                displayRightOrWrong(false);
            }
        }
    }
}
// This checks to make sure the initial text field is filled out before proceeding
var checkInput = function() {
    var initialInputTextField = document.querySelector("#score-initial")
    if (!initialInputTextField.value) {
        alert("Please enter your initials.")
        return false
    } else {
        return true
    }
}
// Apply styles to elements to move them
var moveElements = function(element) {
    if (element.classList.contains("waiting")){
        element.classList.remove("waiting")
        element.classList.add("present")
    } else if (element.classList.contains("present")) {
        element.classList.remove("present")
        element.classList.add("completed")
    }
}
// When the timer runs out it should just skip to the end menu
var skipToEnd = function() {
    updateEndMenu();
    moveElements(document.getElementsByClassName("question present")[0])
    moveElements(document.querySelector("#end-menu"))
}

///////////////////////////////////////////////////////////////////////////////////////////
// Timer functions
var startTimer = function() {
    quizTimer = setInterval(subtractTime, 1000, 1);
}
var penaltyTimer = function() {
    subtractTime(timePenalty);
}
var subtractTime = function(amount) {
    timeRemaining -= amount;
    if (timeRemaining <= 0) {
        timeRemaining = 0
        stopTimer();
        skipToEnd()
    }
    updateTime()
}
var updateTime = function() {
    timeRemainingEl.textContent = timeRemaining;
}
var stopTimer = function() {
    clearInterval(quizTimer)
}
//////////////////////////////////////////////////////////////////////////////////////////////
// Right or Wrong Display in Footer
var displayRightOrWrong = function(isCorrect) {
    clearRightOrWrongDisplay(); // Clear the text in the footer
    if (rightOrWrongTimeout) {
        clearTimeout(rightOrWrongTimeout)
    }
    var footerDisplayEl = document.querySelector("#right-or-wrong")
    if (isCorrect && footerDisplayEl) {
        footerDisplayEl.textContent = "Correct"
        rightOrWrongTimeout = setTimeout(clearRightOrWrongDisplay,2000)
    } else if (!isCorrect && footerDisplayEl) {
        footerDisplayEl.textContent = "Incorrect"
        rightOrWrongTimeout = setTimeout(clearRightOrWrongDisplay,2000)
    }
}
var clearRightOrWrongDisplay = function() {
    var footerDisplayEl = document.querySelector("#right-or-wrong")
    footerDisplayEl.textContent = ""
}
//////////////////////////////////////////////////////////////////////////////////////////////
// Local Storage Functions
var receiveScores = function() {
    var quizScores = JSON.parse(localStorage.getItem("quizScores"));
    return quizScores;
}
var updateScores = function(scoresArray) {
    localStorage.setItem("quizScores", JSON.stringify(scoresArray))
}

///////////////////////////////////////////////////////////////////////////////
// Call of the functions
// This will receive scores from localstorage on page load
var pastScores = receiveScores();
setupPage();
mainContentEl.addEventListener("click",buttonClick);