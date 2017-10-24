'use strict';

/***************** VARIABLES ****************************/
var words = ["abrupt", "absurd", "avenue", "awkward", "banjo", "bayou", "bikini", "blitz", "blizzard", "buffalo", "buzzing", "cycle", "daiquiri", "dizzy", "dwarf", "fishhook", "fixable", "fjord", "flabbergasted", "fuchsia", "funny", "galaxy", "gossip", "hyphen", "icebox", "injury", "ivory", "ivy", "jackpot", "jawbreaker", "jaywalk", "jazzy", "jelly", "jinx", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kiosk", "length", "lucky", "luxury", "marquis", "matrix", "megahertz", "microwave", "mystify", "nightclub", "nowadays", "onyx", "oxygen", "pajama", "pixel", "pneumonia", "psychopath", "puppy", "puzzled", "quartz", "queue", "reliable", "rhubarb", "rhythm", "scratch", "sociopath", "sphinx", "spritz", "staff", "strength", "stretch", "stronghold", "subway", "syndrome", "transcript", "transgress", "transplant", "trustworthy", "twelfth", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vodka", "voodoo", "vortex", "walkway", "waltz", "wave", "wax", "whiskey", "wimpy", "witchcraft", "wizard", "wrist", "yacht", "youth", "yummy", "zigzag", "zipper", "zodiac", "zombie" ]; // array of words to guess

var alphabet = { 
	a: 1,
	b: 3,
	c: 3,
	d: 2,
	e: 1,
	f: 4,
	g: 2,
	h: 4,
	i: 1,
	j: 8,
	k: 5,
	l: 1,
	m: 3,
	n: 1,
	o: 1,
	p: 3,
	q: 10,
	r: 1,
	s: 1,
	t: 1,
	u: 1,
	v: 4,
	w: 4,
	x: 8,
	y: 4,
	z: 10
};

var wordnScore = {}; // contains the words + their score. Used to create lists of words per level of difficulty
var wordsByLevel = {}; //object which will store the words of the database sorted out in 3 levels (3 properties)
var difficultyLevels = {}; // object that stores the scores that starts/ends each level of diff
var wordPicked; // word that was randomly picked
var result = ""; //blanks
var result2 = ""; //word with blanks & letters guessed
var lives = ""; //number of attempts available
var letter; //letter tried on 1 round

var canvas = document.getElementById('hangman');
var context;


//HTML elements
var difficultySec = document.getElementById('difficultySec');
var gameSec = document.getElementById('gameSec');
var numberOfLives = document.querySelector('#numberOfLives p');
var wordDisplaySec = document.getElementById('wordDisplaySec');
var letterSec = document.querySelector('#letterSec div')
var gameOverMess = document.getElementById('gameOverMess');
var lettersDiv = document.getElementById('lettersDiv');
var hangman = document.getElementById('hangman');
var stickyMenu = document.querySelector('.stickyMenu');


/********************* FUNCTIONS ******************************/


//Attribute a score to each word of the database (to set levels of difficulty)
function addScoreToWord(){
	for(var i = 0; i < words.length; i++){
		var wordScore = 0;
		var wordArray = words[i].split("");

		for(var j = 0; j < wordArray.length; j++){
			wordScore += alphabet[wordArray[j]];
		}

		wordnScore[words[i]] = wordScore;
	}

	console.log(wordnScore);
}

//sets a score range for each level of difficulty
function createDifficultyLevels(){
	var scoreValues = Object.values(wordnScore);
	
	scoreValues = scoreValues.sort(function compareNombres(a, b) {
  		return a - b;
	});

	difficultyLevels['level1'] = scoreValues[Math.floor(scoreValues.length / 3)];
	difficultyLevels['level2'] = scoreValues[Math.floor(scoreValues.length *2/3)];
	console.log(difficultyLevels);

	wordsByLevel.level1 = new Array;
	wordsByLevel.level2 = new Array;
	wordsByLevel.level3 = new Array;

	for (var prop in wordnScore){
		if(wordnScore[prop] <= difficultyLevels['level1']){
			wordsByLevel.level1.push(prop);
		}

		if(wordnScore[prop] > difficultyLevels['level1'] && wordnScore[prop] <= difficultyLevels['level2']){
			wordsByLevel.level2.push(prop);
		}

		if(wordnScore[prop] > difficultyLevels['level2']){
			wordsByLevel.level3.push(prop);
		}
	}
	console.log(wordsByLevel);
	console.log(wordsByLevel.level1.length);
	console.log(wordsByLevel.level2.length);
	console.log(wordsByLevel.level2.length);
	console.log(words.length);
}


//creates the buttons with letters
function generateLetters(){
	var alphabetButtons = [];
	var button;
	for (var i = 0; i < 26; i++) {
     	alphabetButtons.push(String.fromCharCode(97+i));
	}

	for (var j=0 ; j < alphabetButtons.length ; j++){
		button = document.createElement('button');
		button.value = alphabetButtons[j];
		button.innerHTML = alphabetButtons[j];
		button.dataset.id = alphabetButtons[j];
		button.setAttribute('class', 'letterButton');
		lettersDiv.appendChild(button);
	}
}

//Show the number of lives left
function livesDisplay(){
	console.log(lives);
	numberOfLives.innerHTML = lives;
}


//show the blanks
function wordDisplay(){
	wordDisplaySec.innerHTML = result;
}

//function called after each round. Check if game is over and displays the result
function gameEnding(){
	if(lives <= 0){
		gameOverMess.innerHTML = "<p>Game Over</p><p>The word was : <span class='highlight'>" + wordPicked +".</span></p>";
	}

	if(result2 == wordPicked){
		gameOverMess.innerHTML = "<p><span class='highlight'>" + wordPicked + "</span></p><p>You win ! Congratulations !</p>";
	}

	setTimeout(function(){
		/*gameSec.style.display = "none";
		document.getElementById('gameOver').style.display = "block";*/


		document.getElementById('gameOver').classList.add("overlay");//adding the css to display the popup
		document.querySelector('#gameOver>div').classList.add("popup");
        document.getElementById('gameOver').style.display = "block";

	}, 500);

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
	lives = "11";
	initLettersButtons();	
	console.log(this);
	setDifficulty(this);
	hangman.style.display = "inline-block";
	livesDisplay();
	wordDisplay();

}

//eventlistener when click on letters
function onClickPlayRound(e){
	if(e.target.nodeName.toLowerCase() === 'button'){
		playRound(e);
	}
}

//reinitialize the game
function restartGame(){
	document.getElementById('gameOver').style.display = "none";
	gameSec.style.display = "none";
	hangman.style.display = "none";
	difficultySec.style.display = "block";
}

//initialize the layout of the game
function startGame(){
	document.getElementById('gameOver').style.display = "none";
	gameSec.style.display = "none";
	hangman.style.display = "none";
	addScoreToWord();
	createDifficultyLevels();
	generateLetters();
	chooseDifficulty();
	createCanvas();
	lettersDiv.addEventListener('click', onClickPlayRound);
}
	
//eventlisteners
function chooseDifficulty(){
	document.getElementById('1').addEventListener("click", init);
	document.getElementById('1').addEventListener("touchstart", init);
	document.getElementById('2').addEventListener("click", init);
	document.getElementById('2').addEventListener("touchstart", init);
	document.getElementById('3').addEventListener("click", init);
	document.getElementById('3').addEventListener("touchstart", init);
}

//Set parameters of the level of difficulty chosen
function setDifficulty(level){
	var difficulty;
	difficultySec.style.display = "none";
	gameSec.style.display = "flex";

	difficulty = level.id;
	console.log(difficulty);

	switch (difficulty){
		case "1":
			chooseWord("level1");
		break;

		case "2":
			chooseWord("level2");
		break;

		case "3":
			chooseWord("level3");
		break;

		default:
			alert("Please choose a level of difficulty");
	}

	turnToBlanks(wordPicked);

}

//pick randomly a word in the object and transform to string
function chooseWord (level) {
    var randomPick = Math.floor(Math.random() * wordsByLevel[level].length);
    console.log(wordsByLevel[level]);
    wordPicked = wordsByLevel[level][randomPick].toString();
    console.log(wordPicked);
}

//turns the word to blanks except one letter that will be shown from the beginning
function turnToBlanks(wordPicked){

	var vowels = ["a", "e", "i", "o", "u", "y"];
	var index;
	var vowel;

	for(var i=0 ; i < wordPicked.length ; i++){
		result += "_ ";
	}

	for(var j=0 ; j < vowels.length ; j++){
		if(wordPicked.includes(vowels[j])){
			vowel = vowels[j];
			break;
		}
	}

	$("button[data-id="+vowel+"]").trigger("click", onClickPlayRound);
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
	drawCanvas();
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

//position of scrollbar
function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}

//menu fixed et smaller onscroll
function onScrollStickyMenu(){
	var scroll = getScrollXY();
	console.log(scroll);
	if (scroll[1] >= 10){
	    stickyMenu.classList.add('smaller');
	} 
	else { 
	    stickyMenu.classList.remove('smaller');
	}
}


/******************************* MAIN CODE *************************************/

window.addEventListener('DOMContentLoaded', function(){
	startGame();
	document.getElementById('restart').addEventListener('click', restartGame);
	window.addEventListener("scroll", onScrollStickyMenu);
});