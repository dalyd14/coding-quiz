///////////////////////////////////////////////////////////////////////////////
// These are global static constants
var totalTime = 60;
var totalQuestions = 10;
var timePenalty = 10;

// This is a dynamic variable that stores the global next question 
// so the code knows where in the quiz we are
var nextQuestion = 1;

// This is a dynamic variable that stores the global correct answers received
var totalRight = 0;

// This is dynamic variable that store the global time remaining
var timeRemaining = totalTime;

// These varaibles will hold the setInterval and setTimeout
var quizTimer = null // this will hold the interval
var rightOrWrongTimeout = null // this will hold the timeout for displaying

// These are global references to the time-left header and footer right or 
// wrong indicator (these references will remain unchanged throughout the use)
var timeRemainingEl = document.querySelector("#time-left");
var righOrWrongEl = document.querySelector("#right-or-wrong");

// This is a reference to where all the content will live
var mainContentEl = document.querySelector("#page-content");