
var data = 
[
    {
        artist: ["Taylor", "Swift"],
        song: ["Blank", "Space"],
        path: "./music/BlankSpace.mp3"
    },
    {
        artist: ["Ed", "Sheeran"],
        song: ["Perfect"],
        path: "./music/Perfect.mp3"
    },
    {
        artist: ["Dua", "Lipa"],
        song: ["New", "Rules"],
        path: "./music/NewRules.mp3"
    },
    {
        artist: ["Imagine", "Dragons"],
        song: ["Thunder"],
        path: "./music/Thunder.mp3"
    },
    {
        artist: ["Demi", "Lovato"],
        song: ["Sorry", "Not", "Sorry"],
        path: "./music/SorryNotSorry.mp3"        
    },
    {
        artist: ["Maroon", "5"],
        song: ["What", "Lovers", "Do"],
        path: "./music/WhatLoversDo.mp3"        
    },
    {
        artist: ["Pink"],
        song: ["What", "About", "Us"],
        path: "./music/WhatAboutUs.mp3"        
    },
    {
        artist: ["Camila", "Cabello"],
        song: ["Havana"],
        path: "./music/Havana.mp3"        
    },
    {
        artist: ["Halsey"],
        song: ["Bad", "At", "Love"],
        path: "./music/BadAtLove.mp3"        
    },
    {
        artist: ["Justin", "Timberlake"],
        song: ["Filthy"],
        path: "./music/Filthy.mp3"        
    },
    {
        artist: ["Charlie", "Puth"],
        song: ["Attention"],
        path: "./music/Attention.mp3"        
    }
];
var keys= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
            'q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5',
            '6','7','8','9'];
$(document).ready(function(){
    

    var type = ["artist","song"];
    var actualStringArray = [];
    var guesses = [];
    var numGuesses = 0;
    var isFinished = false;
    var path = "";
    var guessObject = "";
    
    $("#play").on("click", function(){
        if(isFinished){
           $("audio")[0].play();
        }
    });
    $("#pause").on("click", function(){
        if(isFinished){
            $("audio")[0].pause();
        }
    });
    $("#next").on("click", function(){
        reset();
        resetInputDisplay();
        $("audio").attr("src", "");
        $(this).attr('disabled','disabled');
    })


    function reset(){
        numGuesses=20;
        guesses = [];
        actualStringArray = [];
        isFinished = false;
        var t = type[Math.floor(Math.random()*2)];
        $("#topic").text(t);
        guessObject = data[Math.floor(Math.random()*data.length)];
        actualStringArray = guessObject[t];
        path = guessObject.path;
        //reset using empty()

        //debug

    }
    function resetInputDisplay(){
        $("#guesses").empty();
        $("#word").empty();
        $("#display").empty();
        actualStringArray.forEach(function(val){
            for(var i = 0; i < val.length; i++){
                $("#word").append("<span class = \"letters\">_</span>");
            }
            $("#word").append("<div class = \"temp\"></div>");
        });
        $("#guessesLeft").text(numGuesses);
    }
    function checkWords(letter){
        var totalString = "";
        actualStringArray.forEach(function(val){
            totalString += val.toLowerCase();
        });
        isFinished = true;
        for(var i = 0; i < totalString.length; i++){
            if(totalString.charAt(i) == letter){
                $("span")[i].textContent = letter;
            }
            else if($("span")[i].textContent=="_"){
                isFinished = false;
            }
        }
    }
    function setGuessDisplay(guess){
        var currentString = $("#guesses").text();
        $("#guesses").text(currentString + " " + guess);
    }
    function setFinalDisplay(){
        var totalString = "";
        guessObject.artist.forEach(function(val){
            totalString += val + " ";
        });
        totalString += "- ";
        guessObject.song.forEach(function(val){
            totalString += val + " ";
        });
        $("#display").append("<h1>"+totalString+"</h1>");
    }
    document.addEventListener("keyup", function(event){
        var key = event.key;
        if(keys.includes(key) && !guesses.includes(key) && numGuesses != 0 && !isFinished){
            checkWords(key);
            numGuesses--;
            $("#guessesLeft").text(numGuesses);
            guesses.push(key);
            setGuessDisplay(key);
            if(isFinished || numGuesses==0){
                if(isFinished){
                    $("audio").attr("src", path);
                    $("audio")[0].play();
                    $("#next").removeAttr('disabled');
                }
                if(numGuesses==0 && !isFinished){
                    $("#next").removeAttr('disabled');
                }
                setFinalDisplay();
            }
        }
        
    });
    reset();
    resetInputDisplay();

});
