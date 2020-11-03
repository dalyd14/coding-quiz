var totalTime = 60;
var totalQuestions = 10;
var timePenalty = 10;
var rightOrWrong = "Correct!";

var timeRemainingEl = document.querySelector("#time-left");
var righOrWrongEl = document.querySelector("#right-or-wrong");

var mainContentEl = document.querySelector("#page-content");
///////////////////////////////////////////
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
    },
    {
        question: "Here is question 3",
        options: [
            "option3a",
            "option3b",
            "option3c",
            "option3d"
        ],
        answer: 2
    },
    {
        question: "Here is question 4",
        options: [
            "option4a",
            "option4b",
            "option4c",
            "option4d"
        ],
        answer: 1
    },
    {
        question: "Here is question 5",
        options: [
            "option5a",
            "option5b",
            "option5c",
            "option5d"
        ],
        answer: 2
    },
    {
        question: "Here is question 6",
        options: [
            "option6a",
            "option6b",
            "option6c",
            "option6d"
        ],
        answer: 1
    },
    {
        question: "Here is question 7",
        options: [
            "option7a",
            "option7b",
            "option7c",
            "option7d"
        ],
        answer: 2
    },
    {
        question: "Here is question 8",
        options: [
            "option8a",
            "option8b",
            "option8c",
            "option8d"
        ],
        answer: 1
    },
    {
        question: "Here is question 9",
        options: [
            "option9a",
            "option9b",
            "option9c",
            "option9d"
        ],
        answer: 2
    },
    {
        question: "Here is question 10",
        options: [
            "option10a",
            "option10b",
            "option10c",
            "option10d"
        ],
        answer: 1
    },
    {
        question: "Here is question 11",
        options: [
            "option11a",
            "option11b",
            "option11c",
            "option11d"
        ],
        answer: 2
    },
    {
        question: "Here is question 12",
        options: [
            "option12a",
            "option12b",
            "option12c",
            "option12d"
        ],
        answer: 1
    }
];
var usedBank = [];
//////////////////////////////////////////
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
var allQuestionSetup = function() {
    var unusedBank = questionBank;
    
    for (var i = 0; i < totalQuestions; i++) {
        index = Math.random()*unusedBank.length;
        index = Math.floor(index);
        usedBank.push(unusedBank[index])

        questionSetup(unusedBank[index], i+1)

        unusedBank.splice(index, 1);
    }
}
// Setup Question to the side
var questionSetup = function(questionObj, questionNumber) {
    // this creates the div container for the question content
    var questionDiv = document.createElement("div");
    questionDiv.className = "question present";
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
            optionButtonEl.id = "option-" + i;
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
/////////////////////////////////////////////////////
// Functions called when the page content is clicked
var buttonClick = function(event) {
    if (event.target.tagName.toLowerCase() === "button") {
        switch (event.target.className) {
            case "start-quiz":
                console.log("start quiz")
                break;
            case "option-button":
                var promptEl = event.target.closest(".question")
                var promptEl = promptEl.querySelector(".question-prompt")
                var isRight = checkAnswer(promptEl.textContent, event.target.id[event.target.id.length-1])
                break;
        }
    }
}
// Check if answer that the user selected is correct
var checkAnswer = function(prompt, userAnswer) {
    for(var i = 0; i < questionBank.length; i++) {
        if (questionBank[i].question === prompt) {
            userAnswer = parseInt(userAnswer);
            if (userAnswer === questionBank[i].answer) {
                console.log("Correct");
                return true
            } else {
                console.log("Incorrect");
                return false
            }
        }
    }
}

// Call of the functions
headerSetup();
startMenuSetup();
allQuestionSetup()
mainContentEl.addEventListener("click",buttonClick)