'use strict';

/***************** VARIABLES ****************************/
var words = ["abrupt", "absurd", "avenue", "awkward", "banjo", "bayou", "bikini", "blitz", "blizzard", "buffalo", "buzzing", "cycle", "daiquiri", "dizzy", "dwarf", "fishhook", "fixable", "fjord", "flabbergasted", "fuchsia", "funny", "galaxy", "gossip", "hyphen", "icebox", "injury", "ivory", "ivy", "jackpot", "jawbreaker", "jaywalk", "jazzy", "jelly", "jinx", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kiosk", "length", "lucky", "luxury", "marquis", "matrix", "megahertz", "microwave", "mystify", "nightclub", "nowadays", "onyx", "oxygen", "pajama", "pixel", "pneumonia", "psychopath", "puppy", "puzzled", "quartz", "queue", "reliable", "rhubarb", "rhythm", "scratch", "sociopath", "sphinx", "spritz", "staff", "strength", "stretch", "stronghold", "subway", "syndrome", "transcript", "transgress", "transplant", "trustworthy", "twelfth", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vodka", "voodoo", "vortex", "walkway", "waltz", "wave", "wax", "whiskey", "wimpy", "witchcraft", "wizard", "wrist", "yacht", "youth", "yummy", "zigzag", "zipper", "zodiac", "zombie" ]; // array of words to guess
var wordPicked; // word that has been randomly picked
var result = ""; //blanks
var result2 = ""; //word with blanks & letters guessed
var lives; //number of attempts available
var letter; //letter 


//HTML elements
var difficultySec = document.getElementById('difficultySec');
var gameSec = document.getElementById('gameSec');
var numberOfLives = document.getElementById('numberOfLives');
var wordDisplaySec = document.getElementById('wordDisplaySec');
var letterSec = document.querySelector('#letterSec div')
var gameOverMess = document.querySelector('#gameOver div');
var lettersDiv = document.getElementById('lettersDiv');


/********************* FUNCTIONS ******************************/

//creates the buttons with letters
function generateLetters(){
	var alphabet = [];
	var button;
	for (var i = 0; i < 26; i++) {
     	alphabet.push(String.fromCharCode(97+i));
	}
	console.log(alphabet);

	for (var j=0 ; j < alphabet.length ; j++){
		button = document.createElement('button');
		button.value = alphabet[j];
		button.innerHTML = alphabet[j];
		button.dataset.id = j+1;
		button.setAttribute('class', 'letterButton');
		lettersDiv.appendChild(button);
	}
}

//Show the number of lives left
function livesDisplay(){
	console.log(lives);
	numberOfLives.innerHTML = "You have " + lives + " lives left."
}


//show the blanks
function wordDisplay(){
	wordDisplaySec.innerHTML = result;
}

//function called after each round. Check if game is over and displays the result
function gameEnding(){
	if(lives <= 0){
		gameOverMess.innerHTML = "Game Over";
	}

	if(result2 == wordPicked){
		gameOverMess.innerHTML = "<p>" + wordPicked + "</p><p>You win ! Congratulations !</p>";
	}

	setTimeout(function(){
		gameSec.style.display = "none";
		document.getElementById('gameOver').style.display = "block";
	}, 300);

}

//initialize the buttons with letters after each game (remove disabled)
function initLettersButtons(){
	var buttons = document.querySelectorAll('.letterButton');
	console.log(buttons);
	for(var i=0 ; i < buttons.length ; i++){
		buttons[i].disabled = false;
	}
}


//initialize app at the beginning of each game
function init(){
	result = "";
	result2 = "";
	initLettersButtons();	
	chooseWord();
	console.log(wordPicked);
	turnToBlanks(wordPicked);
	console.log(this);
	setDifficulty(this);
	gameSec.style.display = "block";
	livesDisplay();
	wordDisplay();

}

//eventlistener when click on letters (delegation)
function onClickPlayRound(e){
	if(e.target.nodeName.toLowerCase() === 'button'){
		playRound(e);
	}
}

//reinitialize the game
function restartGame(){
	document.getElementById('gameOver').style.display = "none";
	gameSec.style.display = "none";
	difficultySec.style.display = "block";
}

//initialize the layout of the game
function startGame(){
	generateLetters();
	lettersDiv.addEventListener('click', onClickPlayRound);
	chooseDifficulty();
}
	
//eventslisteners
function chooseDifficulty(){
	document.getElementById('1').addEventListener("click", init);
	document.getElementById('2').addEventListener("click", init);
	document.getElementById('3').addEventListener("click", init);	
}

//Set parameters of the level of difficulty chosen
function setDifficulty(level){
	var difficulty;
	difficultySec.style.display = "none";
	gameSec.style.display = "block";

	difficulty = level.id;
	console.log(difficulty);

	switch (difficulty){
		case "1":
			lives = Math.floor(wordPicked.length *2);
		break;

		case "2":
			lives = Math.floor(wordPicked.length *1.5);
		break;

		case "3":
			lives = Math.floor(wordPicked.length *1);
		break;

		default:
			lives = "Ooops you don't have any lives :o"

	}

}

//pick randomly a word in the array and transform to string
function chooseWord () {
    var randomPick = Math.floor(Math.random() * words.length);
    wordPicked = words[randomPick].toString();
}

//turns the word to blanks
function turnToBlanks(wordPicked){
	for(var i=0 ; i < wordPicked.length ; i++){
		result += "_ ";
	}
	console.log(result);
}

//disables letters already tried
function disableLetter(letterValue){
	letterValue.target.disabled = true;
	//letterValue.disabled = true;
}


//plays 1 round
function playRound(e){
	console.log(e.target.innerHTML);
	getLetter(e);
	disableLetter(e);
	compareLetter(wordPicked, letter);
	wordDisplay();
	livesDisplay();
	
	result2 = result.replace(/ /gi, "");
	if(lives <= 0 || result2 == wordPicked){
		gameEnding();
	}
}

//gets the value of the letter typed by player
function getLetter(letterValue){
	letter = letterValue.target.innerHTML;
	//letter = letterValue.innerHTML;	
}

 
//replaces blanks by letter found
function compareLetter(wordPicked, letter){
	if (wordPicked.includes(letter)){
		var i=0;
		while (i!=-1) {
	    	i = wordPicked.indexOf(letter,i);

	    	if (i >= 0) {
		      	result = result.substring(0,i*2) + letter + result.substring(i*2+1);
		      	i = i+1;
		    }
    	}
	}
	else{
		lives--;
	}

	console.log(result);

}


/******************************* MAIN CODE *************************************/

window.addEventListener('DOMContentLoaded', function(){
	startGame();
	document.getElementById('restart').addEventListener('click', restartGame);
});