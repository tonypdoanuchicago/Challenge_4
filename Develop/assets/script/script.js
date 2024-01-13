const questionsArr = ["What is HTML?","What is CSS?", "What is JavaScript?"];

const answersA_Arr = ["HyperText Markup Language", "Cascading Style Sheets", "Powerful Programming Language"];
const answersB_Arr = ["Compiler", "Powerful Programming Language", "Compiler"];
const answersC_Arr = ["Powerful Programming Language", "Database System", "Interpreter"];
const answersD_Arr = ["Interpreter", "Library", "Specification"];

var scoreResults = [];
var initialResults = [];

const startingTime = 120;

var runningTime = startingTime;

var timeID = document.getElementById("timeID");

var questionObj = document.getElementById("questionID");

var answerAObj = document.getElementById("answerA_ID");
var answerBObj = document.getElementById("answerB_ID");
var answerCObj = document.getElementById("answerC_ID");
var answerDObj = document.getElementById("answerD_ID");

var intro_screen = document.getElementById("intro_screen");
var question_screen = document.getElementById("question_screen");
var results_screen = document.getElementById("results_screen");
var high_scores_screen = document.getElementById("high_scores_screen");

var answerID = document.getElementById("answerID");

var scoreID = document.getElementById("scoreID");

var inputInitialsID = document.getElementById("inputInitialsID");
var high_scores_list_id = document.getElementById("high_scores_list_id");
var progressLoader = document.getElementById("progressLoader");

var questionsAnswered = 0

var timer = null;

function viewHighScores() {
    showHighScoresScreen();
}

function loadQuestion(number) {
    questionObj.textContent = questionsArr[number];


    answerAObj.textContent = answersA_Arr[number];
    answerBObj.textContent = answersB_Arr[number];
    answerCObj.textContent = answersC_Arr[number];
    answerDObj.textContent = answersD_Arr[number];
}

function handleAnswer(number) {

    progressLoader.style.display = 'block';

    if (number == 1) {
        answerID.textContent = "Right !";    
    } else {
        runningTime -= 10;
        answerID.textContent = "Wrong !";    
    }

    setTimeout(moveToNextQuestion, 1500);
}

function moveToNextQuestion()  {
    if (questionsAnswered == 0) {
        loadQuestion(1);
        questionsAnswered++;
    } else if (questionsAnswered == 1) {
        loadQuestion(2);
        questionsAnswered++;
    } else {
        clearInterval(timer);
        showResultsScreen();
    }

    progressLoader.style.display = 'none';
}

function showResultsScreen() {
    intro_screen.style.display = 'none';
    results_screen.style.display = 'block';
    high_scores_screen.style.display = 'none';
    question_screen.style.display = 'none';

    answerID.textContent = "";

    scoreID.textContent = runningTime;
}

function showIntroScreen() {
    intro_screen.style.display = 'block';
    results_screen.style.display = 'none';
    high_scores_screen.style.display = 'none';
    question_screen.style.display = 'none';

    answerID.textContent = "";

    runningTime = 120;
    questionsAnswered = 0;
}

function showHighScoresScreen() {
    intro_screen.style.display = 'none';
    results_screen.style.display = 'none';
    high_scores_screen.style.display = 'block';
    question_screen.style.display = 'none';

    answerID.textContent = "";

    high_scores_list_id.textContent = "";

    for (var i = 0; i < scoreResults.length; ++i) {
        high_scores_list_id.innerHTML += (i+1) + "." + " " + initialResults[i] + " - " + scoreResults[i] + "<br/>"; 
    }
}

function showQuestionScreen() {
    intro_screen.style.display = 'none';
    results_screen.style.display = 'none';
    high_scores_screen.style.display = 'none';
    
    question_screen.style.display = 'block';

    answerID.textContent = "";

    timeID.textContent = runningTime

    timer = setInterval(function () { 
        runningTime -= 1;
        timeID.textContent = runningTime;

        if (runningTime <= 0) {
            showResultsScreen()
            clearInterval(timer);
        }
     }, 1000);

    loadQuestion(0);
}

function saveScore() {
    scoreResults.push(runningTime);
    initialResults.push(inputInitialsID.value);

    runningTime = 120;

    showHighScoresScreen()
}

function clearScores() {
    scoreResults = [];
    initialResults = [];

    runningTime = 120;

    showHighScoresScreen();
}
