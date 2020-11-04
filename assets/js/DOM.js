//////////////////////////////////////////////////////////////////////////////////////////////////
////// The DOM setup for the header of the page
//////////////////////////////////////////////////////////////////////////////////////////////////
var headerSetup = function() {
    // This function populates the initial time remaining in the header element
    timeRemainingEl.textContent = timeRemaining;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/////// The DOM setup for the start menu
/////////////////////////////////////////////////////////////////////////////////////////////////
var startMenuSetup = function() {
    // these query selectors find the spans that are placeholders for the variables
    var totalTimeEl = document.querySelector("span[id='time-total']")
    var totalQuestionsEl = document.querySelector("span[id='questions-total']")
    var timePenaltyEl = document.querySelector("span[id='time-penalty']")

    // Fill these span placeholders with the variables that were declared in variables.js
    totalTimeEl.textContent = totalTime;
    totalQuestionsEl.textContent = totalQuestions;
    timePenaltyEl.textContent = timePenalty;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
////// The DOM setup for the questions
/////////////////////////////////////////////////////////////////////////////////////////////////
var questionSetup = function(questionObj, questionNumber) {
    // this creates the div container for the question content
    var questionDiv = document.createElement("div");
    questionDiv.className = "question waiting"; // this applies a class to the div container
    questionDiv.id = "question-" + questionNumber; // this applies an id to the question
    
    // Give html for question header and the question prompt
    questionDiv.innerHTML = 
        `<h1 class='question-number'>Question` + questionNumber + `</h1>
        <p class='question-prompt'>` + questionObj.question + `</p>`;
    
    // Create all of the option buttons; this calls another function to make the buttons
    // the buttons will be appended to children of the question div container
    questionDiv.appendChild(createQuestionButtons(questionObj.options));

    // append this question div to the page main content
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
            optionButtonEl.className = "option-button"; // indicate the class name for the button
            optionButtonEl.id = "option-" + i; // indicate the id for the button
            // Give the button the answer option text
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

/////////////////////////////////////////////////////////////////////////////////////////////////
////// The DOM setup for the end menu
/////////////////////////////////////////////////////////////////////////////////////////////////
