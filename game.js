
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//Create a new variable called level and start at level 0.
var level = 0;

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
 // here current level is the index before the last index in userClickedPattern array
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
console.log("success");
console.log("==== user ==== "+userClickedPattern + "==== game ====" + gamePattern );
if(userClickedPattern.length === gamePattern.length){

  setTimeout(function(){
        nextSequence()
      },1000);
    }
  }

  else{
    // console.log(userClickedPattern[userClickedPattern.length - 1]);
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press any key to Restart");
    // Call startOver() if the user gets the sequence wrong.
    startOver();
    console.log("wrong");
  }
}

function nextSequence() {
  // userClickedPattern resets every time when next sequence is called.
  userClickedPattern = [];
  // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {

  // reset level gamePattern array and started
  level = 0;
  gamePattern = [];
  started = false;
}
