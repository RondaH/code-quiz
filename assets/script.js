// Variables from HTML
var quizSection =document.getElementById("Quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("Gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highScoreContainer = document.getElementById("highScoreContainer");
var highscoreDiv = document.getElementById("high=scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Start Quiz questions, taken from w3schools javascript quiz
var quizQuestions = [{
    question: "How do you write 'Hello World' in an alert box?",
    choiceA: "alertBox('Hello World');",
    choiceB: "msg('Hello World');",
    choiceC: "alert('Hello World');",
    choiceD: "msgBox('Hello World');",
    correctAnswer: "c"},
    {
    question: "How to write an IF statement in JavaScript?",
    choiceA: "if i = 5 then",
    choiceB: "if i == 5 then",
    choiceC: "if (i == 5)",
    choiceD: "if i = 5",
    correctAnswer: "c"},
    {
    question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    choiceA: "if (i != 5)",
    choiceB: "if (i <> 5)",
    choiceC: "if i =! 5 then",
    choiceD: "if i <> 5",
    correctAnswer: "a"},
    {
    question: "What is the correct way to write a JavaScript array?",
    choiceA: "var colors = (1:'red', 2:'green', 3: 'blue')",
    choiceB: "var colors = ['red', 'green', 'blue']",
    choiceC: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
    choiceD: "var colors = 'red', 'green', 'blue'",
    correctAnswer: "b"},
    {
    question: "Which event occurs when the user clicks on an HTML element?",
    choiceA: "onmouseover",
    choiceB: "onmouseclick",
    choiceC: "onchange",
    choiceD: "onclick",
    correctAnswer: "d"},
];

// more global variables//
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 61;
var timerInterval;
var score = 0;
var correct;

// functions should cycle through array of quiz questions to produce questions and answers//
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "<p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};
//Start Quiz begins timer, hides the start button and displays first quiz question//
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer//
    timerInterval = setInterval(function(){
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
        },1000);
    quizSection.style.display = "block";
}
//function is the end page that displays score once completing quiz or running out of time//
function showScore(){
    quizSection.style.display = "none";
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value ="";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + "correct!";
}
// On click the highscore is displayed and goes to local storage//
submitScoreBtn.addEventListener("click", function highscore(){

    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
        gameoverDiv.style.display = "none";
        highScoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighScores.push(currentHighscore);
        localStorage.setItem("savedHighScores", JSON.stringify(savedHighScores));
        generateHighScores();
    }

});

// function clears the list for high scores and generates a new score from local storage//
function generateHighScores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var NewScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        NewScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(NewScoreSpan);
    }
}

//function displays high scores page and hides other pages//
function showHighScore(){
    startQuizDiv.style.display = "none";
    gameoverDiv.style.display = "none";
    highScoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighScores();
}
//this function clears local storage fo high scores and text from score board//
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";

}
// the function sets all variables back to original values and shows home page to enable replay//
function replayQuiz(){
    highScoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 61;
    score = 0;
    currentQuestionIndex = 0;
}
// function checks response to each answer//
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results that answer is correct//
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display answer is wrong//

    }else{
        showScore();

    }
}

//This button starts the Quiz!//
startQuizButton.addEventListener("click", startQuiz);