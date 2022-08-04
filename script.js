//general settings
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 5;
const correctAnswer = 366;
///////////////////////////////////////////

//background variables
const backgroundLayer1 = new Image();
backgroundLayer1.src = './assets/schenery/i01_parallax-forest-back-trees1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './assets/schenery/i01_parallax-forest-lights1.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './assets/schenery/i01_parallax-forest-middle-trees1.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './assets/schenery/i01_parallax-forest-front-trees1.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './assets/schenery/road.png';
//////////////////////////////////////////

//hero variables
const playerImage = new Image();
playerImage.src = './assets/hero/Run1.png';
const heroWidth = 47.3;
const heroHeight = 100;
let heroframeX = 0;
let heroFramePacing = 0;
let isHeroAlive = true;
///////////////////////////////////////////

//monster variables
const monsterImage = new Image();
monsterImage.src = './assets/monsters/Minotaur - Sprite Sheet.png';

const monsterWidth = 95.8;
const monsterHeight = 90;
let monsterframeX = 0;
let monsterFramePacing = 0;
let monsterPosition = 770;
////////////////////////////////////////////

//sprite variables
const staggerFrames = 5;
///////////////////////////////////////////

//after battle stats
const deathImage = new Image();
deathImage.src = './assets/youdied.jpg';
const winImage = new Image();
winImage.src = './assets/youwin.jpg'
///////////////////////////////////////////

//background setup
class Layer {
	constructor(image, speedModifier){
		this.x = 0;
		this. y = 0;
		this.width = 2400;
		this.height = 700;
		this.x2 = this.width;
		this.image = image;
		this.speedModifier = speedModifier;
		this.speed = gameSpeed * this.speedModifier
	}

	update(){
		this.speed = gameSpeed * this.speedModifier;
		if (this.x <= -this.width) {
			this.x = this.width + this.x2 - this.speed;
		}
		if (this.x2 <= -this.width) {
			this.x2 = this.width + this.x - this.speed;
		}
		this.x = Math.floor(this.x - this.speed);
		this.x2 = Math.floor(this.x2 - this.speed);
	}

	draw(){
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
	}
}
const layer1 = new Layer(backgroundLayer1, 0.3);
const layer2 = new Layer(backgroundLayer2, 0.6);
const layer3 = new Layer(backgroundLayer3, 1);
const layer4 = new Layer(backgroundLayer4, 1.2);
const layer5 = new Layer(backgroundLayer5, 1.5);
const gameObjects = [layer1, layer2, layer3, layer4, layer5];
////////////////////////////////////////////

//inputs
let resposta1 = document.getElementById("button1");
let resposta2 = document.getElementById("button2");
///////////////////////////////////////////////

//rendering
function animate(){
	//hero wins game
	if (resposta1.value != 366){
		ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
		//background
		gameObjects.forEach(object => {
			object.update();
			object.draw();
		});
		//hero
		ctx.drawImage(playerImage, heroframeX * heroWidth, 0, heroWidth, heroHeight, 150, 550, 100, 250)
		if (heroFramePacing % staggerFrames == 0) {
			if (heroframeX < 5) heroframeX++;
			else heroframeX = 0;
		};
		//monster --- hero death animation
		ctx.drawImage(monsterImage,monsterframeX * monsterWidth, 0, monsterWidth, monsterHeight, monsterPosition, 520, 200, 250);
		if (monsterPosition >= 185 ) {
			monsterPosition--;
		} else {
			ctx.drawImage(deathImage, 0, 0, 700, 800, 0, 0, 800, 800);	
			return;
		}
		// if (monsterPosition <= 190) { //JUST FOR DEMONSTRATION PURPOSES!
		// 	monsterPosition = 850;
		// 	animate();
		// }
		if (monsterFramePacing % staggerFrames == 0) {
			if (monsterframeX < 5) monsterframeX++;
			else monsterframeX = 0;
		};

		//death by error in response
		if (resposta2.value != 0) {
			ctx.drawImage(deathImage, 0, 0, 700, 800, 0, 0, 800, 800);	
			return;
		}
		monsterFramePacing++
		heroFramePacing++
		console.log(resposta1.value, resposta2.value)
		requestAnimationFrame(animate);
	} else {
		ctx.drawImage(winImage, 0, 0, 700, 800, 0, 0, 800, 800);	
		return;
	}
}
animate();