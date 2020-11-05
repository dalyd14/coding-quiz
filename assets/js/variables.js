//////////////////////////////////////////////////////////////////////////////////////
////// These are global static constants
//////////////////////////////////////////////////////////////////////////////////////
var totalTime = 60; // the total time available for the quiz; 
var totalQuestions = 10; // the amount questions that will be asked;
var timePenalty = 10; // the time penalty of answering the question incorrectly

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

// this variable will hold the pastscores that are found in the localStorage
var highScores = []

// These are global references to the time-left header and footer right or 
// wrong indicator (these references will remain unchanged throughout the use)
var timeRemainingEl = document.querySelector("#time-left");
var rightOrWrongElDiv = document.querySelector("#right-or-wrong-div");
var rightOrWrongEl = document.querySelector("#right-or-wrong");

var viewHighscoresButton = document.querySelector("#view-highscores");

// This is a reference to where all the content will live
var mainContentEl = document.querySelector("#page-content");