//////////////////////////////////////////
// Setup Functions
var setupPage = function() {
    headerSetup();
    startMenuSetup();
    questionForQuizSetup();
    mainContentEl.appendChild(endMenuSetup());
    mainContentEl.appendChild(setupScoresTable());
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