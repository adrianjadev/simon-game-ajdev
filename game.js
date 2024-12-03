var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Sounds
const blueSound = new Audio("./sounds/blue.mp3");
const greenSound = new Audio("./sounds/green.mp3");
const yellowSound = new Audio("./sounds/yellow.mp3");
const redSound = new Audio("./sounds/red.mp3");
const wrongSound = new Audio("./sounds/wrong.mp3");

// Keypress/(Keydown) event listener
$(document).on("keydown", () => {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
})

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

// checkAnswer()
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            
    // Play the next sequence after 1000 millisecond
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        wrongSound.play();
        startOver();

        console.log(`started: ${started}, gamePattern: ${gamePattern}, level: ${level} `);

        $("body").addClass("game-over");
        $("#level-title").text(`Game Over, Press Any Key to Restart the game!`);

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        // console.log("Sorry! wrong answer!");
    }
}

// nextSequence()
function nextSequence() {

    userClickedPattern = [];

    var randomNumber = (Math.floor(Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Incrementing the Level # text
    level += 1;
    $("#level-title").text(`Level ${level}`)

    // Logs for tests
    // console.log(`Game Pattern: ${gamePattern}`);
    // console.log(`UserClicked Pattern: ${userClickedPattern}`)

    playSound(randomChosenColour);
    
}

function playSound(name) {
    switch (name) {
        case "green":
            // console.log("green");
            $("#green").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            greenSound.play();
            break;

        case "yellow":
            // console.log("yellow");
            $("#yellow").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            yellowSound.play();
            break;

        case "red":
            // console.log("red");
            $("#red").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            redSound.play();
            break;

        case "blue":
            // console.log("blue");
            $("#blue").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            blueSound.play();
            break;
    
        default:
            break;
    }
}

// Refactored playSound

// function playSoundAnswer(name){
//     var newSound = new Audio("./sounds" + name + ".mp3")
//     newSound.play();
// }

// --------

// animatePress
function animatePress(currentColour) {
    $(`.${currentColour}`).addClass("pressed");

    setTimeout(() => {
        $(`.${currentColour}`).removeClass("pressed");
    }, 400);

}
