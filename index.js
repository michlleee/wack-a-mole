var keyPressed = false;
var holes = ["1", "2", "3", "4", "5"];
var chosenHole = -1;
var score = 0;
let count = 30;
let timerInterval;
let moleInterval;


var isRed = false;
var isYellow=false;
setInterval(() => {
    if(!isRed){
        $(".game-title").addClass("red");
        setTimeout(() => {
            $(".game-title").removeClass("red");
        }, 500);
        isRed=true;
    }
    else if(isRed && !isYellow){
        $(".game-title").addClass("yellow");
        setTimeout(() => {
            $(".game-title").removeClass("yellow");
        }, 500);
        isYellow=true;
    }
    else{
        $(".game-title").addClass("blue");
        setTimeout(() => {
            $(".game-title").removeClass("blue");
        }, 500);
        isRed=false;
        isYellow=false;
    }
}, 700);


function molePick(){
    moleInterval = setInterval(() => {
        if(count <= 0){
            return;
        }
        var randomPick = Math.floor(Math.random() * 5);
        chosenHole = holes[randomPick];
        
        //make mole appear
        $(".mole-" + chosenHole).html('');
        $(".mole-" + chosenHole).append('<img src="mole.png" draggable="false" class="mole">');
        
        //animate mole
        $(".mole-" + chosenHole + " .mole").animate({bottom: "-10px"}, 300, function(){

            var autoDrop = setTimeout(() => {
                $(this).animate({bottom: "-100px"}, 300);
            }, 1000);
            
            $(this).on("click", function(){
                clearTimeout(autoDrop);
                $(this).animate({bottom: "-100px"}, 100);
                animateHoleClicked(chosenHole);
                scoreCounter();
            });
        });
    }, 2000);
}

function animateHoleClicked(chosenHole){
    $(".hole.hole-" + chosenHole).addClass("change-color");
    setTimeout(function(){
        $(".hole.hole-" + chosenHole).removeClass("change-color");
    }, 300);
}

function scoreCounter(){
    score++;
    $(".score").text("Score: " + score);
}

function timer(){
    //30s
    timerInterval = setInterval(() => {
        count--;
        if(count < 10 && count > 1){
            $(".guide").text("00:"+"0"+count);
        }
        else{
            $(".guide").text("00:"+count);
        }

        if(count <= 0){
            clearInterval(timerInterval);
            $(".guide").text("Time's up!");


            $(".restart-btn").removeClass("hide");
            $(".restart-btn").on("click", function(){
                restartGame();
            });
            
        }

    }, 1000);
    
}

function restartGame(){
    keyPressed = false;
    chosenHole = -1;
    score = 0;
    count = 30;
    $(".score").addClass("hide");
    $(".restart-btn").addClass("hide");
    $(".guide").text("Press any key to start!");
    clearInterval(moleInterval);
    startGame();
}

function runGame(){
    timer();
    molePick();
    setTimeout(function(){
        $(".score").removeClass("hide");
        $(".score").text("Score: " + score);
    }, 1000);
}

function startGame(){
    $(document).on("keydown", function(){
        if(!keyPressed){
            keyPressed=true;
            runGame();
        }
    });
}

startGame();