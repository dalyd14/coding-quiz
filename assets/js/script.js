var totalTime = 60;
var totalQuestions = 10;
var timePenalty = 10;
var rightOrWrong = "Correct!"

var timeRemainingEl = document.querySelector("#time-left")
var righOrWrongEl = document.querySelector("#right-or-wrong")

var startMenuSetup = function () {
    var totalTimeEl = document.querySelector("span[id='time-total']")
    var totalQuestionsEl = document.querySelector("span[id='questions-total']")
    var timePenaltyEl = document.querySelector("span[id='time-penalty']")

    totalTimeEl.textContent = totalTime;
    totalQuestionsEl.textContent = totalQuestions;
    timePenaltyEl.textContent = timePenalty;
}

startMenuSetup();