
var data = 
[
    {
        artist: ["Taylor", "Swift"],
        song: ["Blank", "Space"],
        path: "./music/BlankSpace"
    }
];
var keys= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
            'q','r','s','t','u','v','w','x','y','z']
$(document).ready(function(){
    var type = ["artist","song"];
    var actualStringArray = [];
    var guesses = [];
    var numGuesses = 15;
    var isFinished = false;
    
    function reset(){
        guesses = [];
        actualStringArray = [];
        isFinished = false;
        var t = type[Math.floor(Math.random()*2)];
        $("#topic").text(t);
        var guessObject = data[Math.floor(Math.random()*data.length)];
        actualStringArray = guessObject[t];
        //reset using empty()

        //debug

    }
    function resetInputDisplay(){
        actualStringArray.forEach(function(val){
  //          console.log(val);
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
        
        for(var i = 0; i < totalString.length; i++){
            if(totalString.charAt(i) == letter){
                $("span")[i].textContent = letter;
            }
        }
    
    }
    function setGuessDisplay(guess){
        var currentString = $("#guesses").text();
        $("#guesses").text(currentString + " " + guess);
    }
    document.addEventListener("keyup", function(event){
        var key = event.key;
        if(keys.includes(key) && !guesses.includes(key) && numGuesses != 0){
            checkWords(key);
            numGuesses--;
            $("#guessesLeft").text(numGuesses);
            guesses.push(key);
            setGuessDisplay(key);
        }
    });
    reset();
    resetInputDisplay();

});
