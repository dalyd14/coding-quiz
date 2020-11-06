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
var endMenuSetup = function() {
    // Setting up the end menu element
    // div wrapper for the whole end menu element
    var endDiv = document.createElement("div");
    endDiv.className = "end-menu waiting"; // add the class name to the div wrapper
    endDiv.id = "end-menu"; // add the id name to the div wrapper
    // Add inner HTML for the div
    endDiv.innerHTML = ` 
        <h1>You have completed the quiz!</h1>
        <h3 class="result-message" id="result-message"></h3>
        <p>
            You got <span id='total-right'></span> out of <span id='questions-total'></span> questions correct
        </p>
        <p>
            You had <span id='time-left'></span> seconds remaining!
        </p>
        <form>
            <h4>Would you like to save the score of <span id='total-score'></span>?</h4>
            <input type="text" placeholder="Input Initials Here" class="score-initial" id="score-initial">
            <button class="submit-score-button" id="submit-score-button">Save Score</button>
        </form>
        <button class="restart-quiz" id="restart-quiz">Restart Quiz</button>
    `
    return endDiv;
}
var updateEndMenu = function() {
    // this function updates the text contents of the DOM for the end menu
    // this query finds the end menu div element
    var endMenu = document.querySelector("#end-menu")
    if (endMenu) {
        // this calls the updateResultMessage to check the results of the quiz and output a message
        endMenu.querySelector("#result-message").textContent = updateResultMessage(totalRight, totalQuestions);
        // This updates the text content for how many the user got right out of the total asked
        // and then finally it updates how much time was remaining when the quiz was completed
        endMenu.querySelector("#total-right").textContent = totalRight;
        endMenu.querySelector("#questions-total").textContent = totalQuestions;
        endMenu.querySelector("#time-left").textContent = timeRemaining;
        // this calculates the final score
        endMenu.querySelector("#total-score").textContent = (totalRight*2 + timeRemaining);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
////// The DOM setup for the score displays
/////////////////////////////////////////////////////////////////////////////////////////////////
var setupScoresTable = function() {
    // div for scores display container
    var scoreDisplay = document.createElement("div")
    scoreDisplay.className = "score-display waiting"
    scoreDisplay.id = "score-display"
    // Add a header
    scoreDisplay.innerHTML = `
        <h1>Here are the past scores...</h1>
        <button class="clear-highscores" id="clear-highscores">Clear High Scores</button>
    `

    return scoreDisplay
}
var updateScoresTable = function(scoresArray) {
    var scoreDisplayGrid = document.createElement("div")
    scoreDisplayGrid.className = "score-display-grid"

    for (var i = 0; i < scoresArray.length; i++ ) {
        var scoreDisplayItem = document.createElement("div")
        scoreDisplayItem.className = "score-display-item present"

        scoreDisplayItem.innerHTML = `
            <p class="position">` + (i + 1) + `: </p>
            <p class="initials">` + scoresArray[i].initials + `</p>
            <p class="score">` + scoresArray[i].score + `</p>
        `
        scoreDisplayGrid.appendChild(scoreDisplayItem)
    }

    return scoreDisplayGrid
}

/////////////////////////////////////////////////////////////////////////////////////////////////
////// The DOM manipulation for moving elements around the main content
/////////////////////////////////////////////////////////////////////////////////////////////////
var moveElements = function(element, isSubmit) {
    // Apply styles to elements to move them
    // if the element has a class of waiting (it is off screen to the left)
    if (element.classList.contains("waiting")){
        // remove the waiting class
        element.classList.remove("waiting")
        // add the present class so the element will now be seen
        element.classList.add("present")
    } else if (element.classList.contains("present") && !element.classList.contains("end-menu")) {
        // remove the present class so it wont be seen
        element.classList.remove("present")
        // add the completed class so the element moves to the right off screen
        element.classList.add("completed")
    } else if (element.classList.contains("present") && isSubmit) { 
        // remove the present class so it wont be seen
        element.classList.remove("present")
        // add the completed class so the element moves to the right off screen
        element.classList.add("completed")
    }
}
var skipToEnd = function() {
    // When the timer runs out it should just skip to the end menu
    // update the end menu to display results
    updateEndMenu();
    // then move the current question the quiz is on to the right off screen
    moveElements(document.getElementsByClassName("question present")[0])
    // and finally move the end menu into view
    moveElements(document.querySelector("#end-menu"))
}
var skipToScores = function() {
    moveElements(document.getElementsByClassName("present")[0], true)
    moveElements(document.querySelector("#score-display"))
}
var goBacktoEndMenu = function() {
    // Find the elements of the end menu and score display
    var endMenuEl = document.querySelector("#end-menu")
    var scoreDisplayEl = document.querySelector("#score-display")
    // Manipulate the classes of these objects to let them transition properly
    endMenuEl.classList.remove("completed")
    endMenuEl.classList.remove("waiting")
    scoreDisplayEl.classList.remove("present")
    endMenuEl.classList.add("present")
    scoreDisplayEl.classList.add("waiting")
}

/////////////////////////////////////////////////////////////////////////////////////////////////
////// The DOM manipulation for displaying whether the question was correct or incorrect
/////////////////////////////////////////////////////////////////////////////////////////////////
var displayRightOrWrong = function(isCorrect) {
    // Right or Wrong Display in Footer
    // Clear the text in the footer when the new question is answered
    clearRightOrWrongDisplay(); 
    // if there is a setTimeout counter present; clear it
    if (rightOrWrongTimeout) {
        // clear the timeout
        clearTimeout(rightOrWrongTimeout)
    }
    if (isCorrect) {
        // if the question was correct make the text "correct"
        rightOrWrongEl.textContent = "Correct"
        rightOrWrongElDiv.classList.add("right-or-wrong")
        // after 2 seconds call the clear display function
        rightOrWrongTimeout = setTimeout(clearRightOrWrongDisplay,2000)
    } else if (!isCorrect) {
        // if the question wasnt correct make the text "incorrect"
        rightOrWrongEl.textContent = "Incorrect"
        rightOrWrongElDiv.classList.add("right-or-wrong")
        // after 2 seconds call the clear display function
        rightOrWrongTimeout = setTimeout(clearRightOrWrongDisplay,2000)
    }
}
var clearRightOrWrongDisplay = function() {
    // this will clear display function
    rightOrWrongEl.textContent = ""
    rightOrWrongElDiv.classList.remove("right-or-wrong")
}