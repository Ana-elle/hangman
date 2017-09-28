'use strict';

//VARIABLES//
var words = ['cat', 'tree', 'swing', 'around', 'scientist', 'armada', 'hangman']; // array of words to guess
var wordPicked; // word that has been randomly picked
var result = ""; //blanks
var result2 = ""; //word with blanks & letters guessed
var lives; //number of attempts available
var letter; //letter 
var lettersTried = ""; //string with letters already tried


//HTML elements
var difficultySec = document.getElementById('difficultySec');
var gameSec = document.getElementById('gameSec');
var numberOfLives = document.getElementById('numberOfLives');
var wordDisplaySec = document.getElementById('wordDisplaySec');
var letterInput = document.getElementById('letter');
var lettersTriedSec = document.getElementById('lettersTried');
var messageSec = document.getElementById('message');
var gameOverMess = document.querySelector('#gameOver div');

//FUNCTIONS//

//Show the number of lives left
function livesDisplay(){
	console.log(lives);
	numberOfLives.innerHTML = "You have " + lives + " lives left."
}

function lettersTriedDisplay(){
	lettersTriedSec.innerHTML = "Letters already tried : " + lettersTried;
}


//show the blanks
function wordDisplay(){
	wordDisplaySec.innerHTML = result;
}


function gameEnding(){
	document.getElementById('gameOver').style.display = "block";

	if(lives <= 0){
		gameSec.style.display = "none";
		gameOverMess.innerHTML = "Game Over";
	}

	if(result2 == wordPicked){
		gameOverMess.innerHTML = "You win ! Congratulations !"	
	}

}


//initialize app
function init(){
	result = "";
	result2 = "";
	lettersTried = "";
	messageSec.innerHTML = "";
	chooseWord();
	console.log(wordPicked);
	turnToBlanks(wordPicked);
	console.log(this);
	setDifficulty(this);
	livesDisplay();
	lettersTriedDisplay();
	wordDisplay();
}

function startGame(){
	document.getElementById('gameOver').style.display = "none";
	gameSec.style.display = "none";
	difficultySec.style.display = "block";
	chooseDifficulty();
}
	

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

//picks randomly a word in the array
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


//plays 1 round
function playRound(){
	getLetter();
	compareLetter(wordPicked, letter);
	wordDisplay();
	livesDisplay();
	lettersTriedDisplay();
	letterInput.value = "";
	
	result2 = result.replace(/ /gi, "");
	if(lives <= 0 || result2 == wordPicked){
		gameEnding();
	}
}

//gets the value of the letter typed by player
function getLetter(){
	letter = letterInput.value.toLowerCase();
	messageSec.innerHTML = "";

	if(lettersTried.includes(letter) == false){
		lettersTried = lettersTried + " " + letter + ",";
	}
	else{
		messageSec.innerHTML = "You've already tried that letter !"
	}
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


//MAIN CODE//

window.addEventListener('DOMContentLoaded', function(){
	
	startGame();
	document.getElementById('try').addEventListener('click', playRound);
	document.getElementById('restart').addEventListener('click', startGame);
});