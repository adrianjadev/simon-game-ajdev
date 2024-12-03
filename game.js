
var buttonColours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Sounds
const correctSound = new Audio("./sounds/correct-answer.mp3");
const wrongSound = new Audio("./sounds/wrong-answer2.mp3");
const gameStart = new Audio("./sounds/game-start.mp3");
const gameCountdown = new Audio("./sounds/game-countdown.mp3");
const winningLevel = new Audio("./sounds/winning-levels2.mp3");
const gameBackground = new Audio("./sounds/bg-sound.mp3");

//playBackground() in loop
function playBackground(){
    gameBackground.muted = true;
    gameBackground.play().then(() => {
        gameBackground.muted = false;
    })
    gameBackground.loop = true;
}

// pauseBackground()
function pauseBackground(){
    gameBackground.pause();
}

// Touchstart event listner for mobile app
$(document).on("touchstart", () => {
    if (!started) { 
        playBackground();   
        $("#level-title").text(`Level ${level - 1}`);
        nextSequence();
        started = true;
    }
});

// Keypress/(Keydown) event listener
$(document).on("keydown", () => {
    if (!started) {    
        playBackground();
        $("#level-title").text(`Level ${level - 1}`);
        nextSequence();
        started = true;
    }
});

// Click eventlistener
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    // Add the value to the userClickedPattern
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1); // most recent answer
});

// startOver() 
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

// ladderUp()
function ladderUp(){
    winningLevel.play();
}

// checkAnswer()
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            correctSound.play();

            if (level === 3){
                $("#level-title").text("Good work 🥳! Keep it up!");
                ladderUp();
                setTimeout(() => {
                    nextSequence();
                }, 3000);
            } 

            else {
                setTimeout(() => {
                    nextSequence();
                }, 3000);
            }
        }
    } else {
        pauseBackground();
        wrongSound.play();

        $("body").addClass("game-over");
        $("#level-title").text(`Game Over, Press Any Key to Restart the game!`);

        setTimeout(() => {
            $("body").removeClass("game-over");
            startOver();
        }, 200);
    }
}

// nextSequence()
function nextSequence() {

    playBackground();

    userClickedPattern = [];

    var randomNumber = (Math.floor(Math.random() * 7));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Incrementing the Level # text
    level += 1;
    $("#level-title").text(`Level ${level}`);

    // Logs for tests
    // console.log(`Game Pattern: ${gamePattern}`);

    playSound(randomChosenColour);
    
}

// playSound() -- refactored
function playSound(colorName){
    $(`#${colorName}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var newSound = new Audio(`./sounds/${colorName}.mp3`);
    newSound.play();
}

// animatePress()
function animatePress(currentColour) {
    $(`.${currentColour}`).addClass("pressed");

    setTimeout(() => {
        $(`.${currentColour}`).removeClass("pressed");
    }, 400);

}
