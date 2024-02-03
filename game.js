var buttonColours= ["red","green","blue","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var Level = 0;


    
$(document).on("keydown", function(){
    if(!started){
    $("#level-title").html("Level "+ Level);
    nextSequence();

    started = true;

    }
})

 function nextSequence(){

    userClickedPattern= [];

    Level++;
    $("#level-title").html("Level "+ Level);


    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    $("#"  + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

  

}

$(".btn").on("click",function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    
    playSound(userChosenColour);
    animatePress(userChosenColour);


    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name){

    
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(currentColour) {

    $("#"+ currentColour).addClass("pressed");

    setTimeout(function () {

        $("#" + currentColour).removeClass("pressed");
        
    },100)

}

function checkAnswer(currentLevel){

    if( userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("GOOD");


        if( userClickedPattern.length === gamePattern.length){
            
            setTimeout(function(){
                nextSequence();

            }, 1000)
        }
    
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
            
        }, 200);

        $("h1").html("GAME-OVER, <em>PRESS ANY KEY TO RESTART🤗</em> ");
        startOver();

    }



}

function startOver(){
    Level= 0;
    gamePattern =[];
    started= false;

}