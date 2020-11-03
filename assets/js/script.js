var totalTime = 60;
var totalQuestions = 10;
var timePenalty = 10;
var rightOrWrong = "Correct!";

var timeRemainingEl = document.querySelector("#time-left");
var righOrWrongEl = document.querySelector("#right-or-wrong");

var mainContentEl = document.querySelector("#page-content");

// Create Question Bank
var questionBank = [
    {
        question: "Here is question 1",
        options: [
            "option1a",
            "option1b",
            "option1c",
            "option1d"
        ],
        answer: 2
    },
    {
        question: "Here is question 2",
        options: [
            "option2a",
            "option2b",
            "option2c",
            "option2d"
        ],
        answer: 1
    }
]

// Setup Functions
var headerSetup = function() {
    timeRemainingEl.textContent = 60;
}
var startMenuSetup = function() {
    var totalTimeEl = document.querySelector("span[id='time-total']")
    var totalQuestionsEl = document.querySelector("span[id='questions-total']")
    var timePenaltyEl = document.querySelector("span[id='time-penalty']")

    totalTimeEl.textContent = totalTime;
    totalQuestionsEl.textContent = totalQuestions;
    timePenaltyEl.textContent = timePenalty;
}

// Setup Questions to the side
var questionSetup = function(questionObj, questionNumber) {
    // this creates the div container for the question content
    var questionDiv = document.createElement("div");
    questionDiv.className = "question waiting";
    questionDiv.id = "question-" + questionNumber;
    // Give html for header and prompt
    questionDiv.innerHTML = 
        `<h1 class='question-number'>Question` + questionNumber + `</h1>
        <p class='question-prompt'>` + questionObj.question + `</p>`;
    // Create all of the option buttons; this will call another function
    questionDiv.appendChild(createQuestionButtons(questionObj.options));

    mainContentEl.appendChild(questionDiv);
}
var createQuestionButtons = function(options) {
    // if there is content in this options variable; i.e. an array is present
    if (options) {
        // create a div that will hold all of the buttons
        var optionListEl = document.createElement("div");
        optionListEl.className = "option-button-wrapper";
        // Loop through all of the options in the array
        for (var i = 0; i < options.length; i++) {
            //create the button
            var optionButtonEl = document.createElement("button");
            optionButtonEl.className = "option-button";
            // Give the button the option text
            optionButtonEl.textContent = options[i];
            // Append it to the div wrapper
            optionListEl.appendChild(optionButtonEl);
        }
        // return this whole div to whoever called it
        return optionListEl
    } else {
        // if the array was empty return false
        return false
    }
}

// Functions called when the page content is clicked
var buttonClick = function(event) {
    if (event.target.tagName.toLowerCase() === "button") {
        console.log("You clicked a button")
    }
}

// Call of the functions
headerSetup();
startMenuSetup();
questionSetup(questionBank[1],1)
mainContentEl.addEventListener("click",buttonClick)