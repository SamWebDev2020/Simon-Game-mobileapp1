var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;



function playSound(name){

  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}



$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var  randomNumber = (Math.floor(Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$("h1").click(function(){

  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
     if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
       console.log("Success");
       if(userClickedPattern.length === gamePattern.length){
         setTimeout(function(){
           nextSequence();
         }, 1000);
       }
     }else{
       console.log("wrong");
       playSound("wrong");
       $("#level-title").text("Game Over, Click me to Start again");
       $("body").addClass("game-over");
       setTimeout(function(){
         $("body").removeClass("game-over");
       }, 500);
       startOver();
     }
}

function startOver(){
 gamePattern = [];
 level = 0;
 started = false;
}
