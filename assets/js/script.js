var totalTime = 60;
var totalQuestions = 10;
var timePenalty = 10;
var rightOrWrong = "Correct!";

//  This variable stores the global next question so the code knows where in the quiz we are
var nextQuestion = 1;
var totalRight = 0;

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
var setupPage = function() {
    headerSetup();
    startMenuSetup();
    allQuestionSetup();
    mainContentEl.appendChild(endMenuSetup());
}
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
var endMenuSetup = function() {

    var endDiv = document.createElement("div");
    endDiv.className = "end-menu waiting";
    endDiv.id = "end-menu";
    endDiv.innerHTML = "<h1>You have completed the quiz!</h1>"
    var resMessageEl = document.createElement("h3")
    resMessageEl.className = "result-message"
    resMessageEl.id = "result-message"
    endDiv.appendChild(resMessageEl)
    var p1 = document.createElement("p")
    var p2 = document.createElement("p")
    p1.innerHTML = "You got <span id='total-right'></span> out of <span id='questions-total'></span> questions correct"
    p2.innerHTML = "You had <span id='time-left'></span> seconds remaining!"

    endDiv.appendChild(p1)
    endDiv.appendChild(p2)

    // Return this end menu
    return endDiv
}
var updateResultMessage = function() {
    var resultMessage = ""
    if (totalRight === totalQuestions) {
        resultMessage = "Wow! you answered every question correctly!"
    } else if (totalRight > (totalQuestions*.8)) {
        resultMessage = "You did really well!"
    } else if (totalRight > (totalQuestions*.6)) {
        resultMessage = "Not bad, not bad."
    } else if (totalRight > (totalQuestions*.4)) {
        resultMessage = "There is room for improvement."
    } else if (totalRight > (totalQuestions*.1)) {
        resultMessage = "Yikes!"
    } else {
        resultMessage = "The cat must have walked across the keyboard..."
    }
    return resultMessage
}
var allQuestionSetup = function() {

    for (var i = 0; i < totalQuestions; i++) {
        index = Math.random()*questionBank.length;
        index = Math.floor(index);
        usedBank.push(questionBank[index])

        questionSetup(questionBank[index], i+1)

        questionBank.splice(index, 1);
    }
}
// Setup Question to the side
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
                    moveElements(document.querySelector("#end-menu"))
                } else {
                    moveElements(document.querySelector("#question-" + nextQuestion))
                    nextQuestion++;
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
            } else {
                console.log("Incorrect");
            }
        }
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

//////////////////////////////////////////////
// Update end menu dynamic values on the page
var updateEndMenu = function() {
    document.querySelector()
}

// Call of the functions
setupPage();
mainContentEl.addEventListener("click",buttonClick);