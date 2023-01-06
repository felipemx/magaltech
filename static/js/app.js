let canvas = document.querySelector("canvas");

let ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let str = "A+jk js:2 @dfs 17 tr YY ufds M5r P87 #18 $!& ^dfs $Ew er JH # $ * . (! ;) ,: :";
let matrix = str.split("");
let font = 12;
let col = width / font;
let arr = [];

for(let i = 0; i < col; i++) {
    arr[i] = 1;
}

const draw = () => {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#00FF00";
    ctx.font = `${font}px system-ui`;

    for(let i = 0; i < arr.length; i++) {
        let txt = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(txt, i * font, arr[i] * font);

        if(arr[i] * font > height && Math.random() > 0.975) {
            arr[i] = 0;
        }
        arr[i]++;
    }
}

setInterval(draw, 20);

window.addEventListener("resize", () => location.reload());

const chars = "-_—→↓↑←0123456789abcdefghijklmnopqrstuvwxtz";

var Glitch = function(selector, index, numberOfGlitchedLetter, timeGlitch, timePerLetter, timeBetweenGlitch){
	this.selector = selector;
	this.index = index;
	this.numberOfGlitchedLetter = numberOfGlitchedLetter;
	this.innerText;
	this.charArray = [];
	this.charIndex = [];
	this.timeGlitch = timeGlitch;
	this.timeBetweenGlitch = timeBetweenGlitch;
	this.timePerLetter = timePerLetter;
	this.maxCount = Math.floor(this.timeGlitch/this.timePerLetter);
	this.count = 0;
}

Glitch.prototype.init = function(){
	this.innerText = this.selector.innerText;
	this.charArray = this.innerText.split("");
	if(this.numberOfGlitchedLetter == undefined || this.numberOfGlitchedLetter > this.innerText.length){
		this.numberOfGlitchedLetter = this.innerText.length;
	}
	this.defineCharIndexToRandomize();
}

Glitch.prototype.defineCharIndexToRandomize = function(){
	this.charIndex = [];
	for(let i=0; i<this.numberOfGlitchedLetter; i++){
		let randCharIndex = Math.floor(Math.random() * this.charArray.length);
		this.charIndex.push(randCharIndex);
	}
}

Glitch.prototype.randomize = function(){
	//copy the char array
	let randomString = Array.from(this.charArray);
	
	//randomize char
	for(let i=0; i<this.numberOfGlitchedLetter; i++){
		let randIndex = Math.floor(Math.random() * chars.length);
		let randCharIndex = this.charIndex[i];
		if(randomString[randCharIndex] !== ' '){
			randomString[randCharIndex] = chars[randIndex];
		}
	}
	this.selector.innerText = randomString.join("");
}

Glitch.prototype.update = function(interval){
	if(this.count >= this.maxCount - 1){
		this.selector.innerText = this.innerText;
		this.defineCharIndexToRandomize();
		let ctx = this;
		let wait = setTimeout(function(){
			ctx.count = 0;
		}, this.timeBetweenGlitch);
	}else{
		this.randomize();
		this.count ++;
	}
}

Glitch.prototype.glitch = function(){
	let ctx = this;
	let interval= setInterval(function(){
        ctx.update(this);
      },this.timePerLetter);
}

var arrayElements;
var glitchArray = [];

function initAllGlitch(){
	arrayElements = document.querySelectorAll(".content");
	for(let i=0; i<arrayElements.length; i++){
		let selector = arrayElements[i];
		let randLetterNumber = 2 + Math.floor(Math.random() * 8);
		let randGlitchTime = 500 + Math.floor(Math.random() * 2500);
		let randGlitchPauseTime = 500 + Math.floor(Math.random() * 2500);
		let glitch = new Glitch(selector, i, randLetterNumber, 200, 65, randGlitchPauseTime);
		glitch.init();
		glitchArray.push(glitch);
	}
}


function update(){
	for(let i=0; i<glitchArray.length; i++){
		let glitch = glitchArray[i];
		glitch.glitch();
	}
}

initAllGlitch();
update();
