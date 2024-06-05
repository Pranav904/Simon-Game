var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var started = false;
var level = 0;

$(document).on("keypress",function (){
    if(!started){
        started = true;
        $("#level-title").text("Level "+level);
        nextSequence();
    }
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}

function checkAnswer(index){
    if(userClickedPattern[index] != gamePattern[index]){
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            startOver();
        },200);
    }else{
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
};