/////////////////////////////////////////////////////////////////////////////////////////////////
///////// Create Question Bank
/////////////////////////////////////////////////////////////////////////////////////////////////
var usedBank = [];
var questionBank = [
    {
        question: "Which one is the correct way to declare the function fName?",
        options: [
            "function {fName}",
            "var function (fName) {}",
            "var fName = function() {}",
            "var fName = function{}"
        ],
        answer: 2
    },
    {
        question: "What indicates a comment in HTML?",
        options: [
            "//",
            "/*",
            "##",
            "<!--"
        ],
        answer: 3
    },
    {
        question: "What indicates a style assigned to an id of thisID?",
        options: [
            "#thisID",
            ".thisID",
            "thisID",
            ":thisID"
        ],
        answer: 0
    },
    {
        question: "What does n equal after this code runs? n=6; n++",
        options: [
            "5",
            "6",
            "7",
            "8"
        ],
        answer: 2
    },
    {
        question: "Which of the following is not a Javascript code operation?",
        options: [
            "for() {}",
            "if() {}",
            "while() {}",
            "timer() {}"
        ],
        answer: 3
    },
    {
        question: "What does the setTimeout() function do",
        options: [
            "setTimeout pauses the code for a set time",
            "setTimeout calls a function once after a set time",
            "setTimeout calls a function once and then pauses for a set time",
            "setTimeout ends your program at midnight"
        ],
        answer: 1
    },
    {
        question: "What does the setInterval() function do",
        options: [
            "setInterval will repeatedly call a function after every certain amount of time passes",
            "setInterval will set your alarm clock",
            "setInterval calls a function once after a certain amount of time",
            "setInterval ends your program at noon"            
        ],
        answer: 0
    },
    {
        question: "What is i?  if(2 > 3) {i = 1} else {i = 2}",
        options: [
            "null",
            "1",
            "2",
            "3",
            "4"
        ],
        answer: 2
    },
    {
        question: "what does ! mean in conditional statements?",
        options: [
            "or",
            "yay",
            "not",
            "and",
            "but"
        ],
        answer: 2
    },
    {
        question: "what symbol is OR in a conditional statement?",
        options: [
            "||",
            "<>",
            "or",
            "&"
        ],
        answer: 0
    },
    {
        question: "How many tortillas are in a Full Stack Developer?",
        options: [
            "1",
            "2",
            "3",
            "null"
        ],
        answer: 3
    },
    {
        question: "How do you make the background red in CSS?",
        options: [
            "color: red",
            "background: red",
            "border-color: red",
            "behind-color: red"
        ],
        answer: 1
    },
    {
        question: "the link tag is to CSS as _______ is to JS",
        options: [
            "<link>",
            "<javascript>",
            "<function>",
            "<script>"
        ],
        answer: 3
    },
    {
        question: "Which of the following is not a valid window function",
        options: [
            "window.alert()",
            "window.options()",
            "window.prompt()",
            "window.confirm()"
        ],
        answer: 1
    },
    {
        question: "What is the dirrence between console.log() and console.dir()",
        options: [
            ".log can only deal with strings and .dir can deal with numbers",
            ".dir goes directly before any .log",
            ".log would output an object with a string representation and .dir would output it as an object",
            ".dir goes to the directory instead of the console"
        ],
        answer: 2
    },
    {
        question: "How do you divide in Javascript?",
        options: [
            "/",
            "^",
            "@",
            "*"
        ],
        answer: 0
    },
    {
        question: "How do you multiply in Javascript?",
        options: [
            "/",
            "^",
            "@",
            "*"
        ],
        answer: 3
    },
    {
        question: "Which way would increase a the var d by 3?",
        options: [
            "d+=3",
            "d++3",
            "d=+3",
            "d+++"
        ],
        answer: 1
    },
    {
        question: "Which way would not concatenate the two strings together?",
        options: [
            "'string 1' + 'string 2'",
            "'string 1'.concat('string 2')",
            "'string 1' & 'string 2'"
        ],
        answer: 2
    },
    {
        question: "What operation would not get the color of the car object var car = { color: 'red' }?",
        options: [
            "car.color",
            "car{color}",
            "car['color']",
        ],
        answer: 1
    },
    {
        question: "A while() loop will continue to loop as long as ___________",
        options: [
            "what is inside the () remains true",
            "the timer is still running",
            "the user has the browser open",
            "we are in debugger mode"
        ],
        answer: 0
    }
];