var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];


var started = false;
//Level Count
var level = 0;

$(document).keydown(function () {
    if (!started) {

        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//Colors Chosen by User
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")
    }

    //If the user got the most recent answer right in step ,then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);

    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        $("#level").text("Game Over, Press Any Key To Restart.")

        startOver();
    }
}

//Play Game, Increase level
function nextSequence() {

    level++;
    $("#level").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    //Flash the randomly selected Button
    $("#" + randomChosenColor).fadeIn(90).fadeOut(90).fadeIn(90);
    //Play Selected Sound
    playSound(randomChosenColor);
}


//Play sound when random color is flashed or user clicks on colors
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Animation for flashing buttons on user selection
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}


//Restart the game ,set default values
function startOver() {
    var level = 0;
    var gamePattern = [];
    var started = false;
}