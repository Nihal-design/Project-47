
const Engine = Matter.Engine;

const Bodies = Matter.Bodies;
const Body = Matter.Body;

//creating the gameState
var gameState = 0;

//Creating the main character
var player, playerImage, playerAnimation;

//background is just yellow colour
var backgroundImage1;

var fireimage, firealien;

var slimealien, slimeimage;

var dinoimage, rockimage;

var life=1000;
var ilife1=200, ilife2=200;

var slilife1=300, slilife2=300;

var dinolife1=400, dinolife2=400;

var gun = 0;
var bazooka = 0;
var grenade = 0;
var smokebomb = 0;

var inferno;
var slime;
var rock;

var inferno1, inferno2;

var earth, earthimage;


function preload()
{
	//uploading the background image in the code so it can be used in the background
	backgroundImage1 = loadImage("StartBackground.jpg");

	//uploading the player image in the code so it can be used in making the game more illustrative
	playerImage = loadImage("hero.png");

	playerAnimation = loadImage("w1.png");

	fireimage = loadImage("fireimage.png");

	firealien = loadImage("firealien.png");

	slimealien = loadImage("slimealien.png");

	slimeimage = loadImage("slime.png");

	dinoimage = loadImage("Dinoimage.png");

	rockimage = loadImage("rockimage.png");

	earthimage = loadImage("earth.jpg");

	//	second = second();
	
}

function setup() {
	//Creates the canvas
	createCanvas(1500, 800);


	engine = Engine.create();
	world = engine.world;

	//Creates the main character
	player = createSprite(750, 650, 20, 20);
	player.shapeColor="black";
	//player.scale = 0.1;
	
	//creates the edges
	edges = createEdgeSprites();

	Engine.run(engine);

	inferno = new Group();
	slime = new Group();
	rock = new Group();

	//fire = new Group();
  
}


function draw() {
  rectMode(CENTER);
  background(backgroundImage1);

  //What should happen when gameState is 0
  if (gameState === 0) {
	  textSize(50);
	  fill("brown");
	  text("CITY OF SURVIVAL", 550, 100);	
	  //Text for telling the main story behind the game
	  textSize(20);
	  fill("red");
	  text("YOU HAVE ENTERED A BLACK HOLE, AND THERE ARE PLANETS INSIDE IT. YOUR TEAM MEMBERS TELL YOU GET THE DNA FROM THE ALIENS", 100, 200);
	  text("LIVING ON THE PLANET. NOW IT IS ALL UPON YOU TO KILL THE ALIENS AND BRING THE ALIENS' DNA. ARE YOU READY?", 150, 250);

	  image(playerImage, 670, 300, 150, 150);

	  //Text for telling the player about the controls
	  textSize(30);
	  fill("green");
	  text("PRESS SPACE TO START", 600, 550);
	  text("USE 'UP', 'DOWN', 'RIGHT', AND 'LEFT' ARROW KEYS TO MOVE", 350, 600);

	  
		textSize(20);
		fill("green");
		text("USE WEAPONS TO KILL THE ALIENS. HOLD 'A' FOR AK47, 'B' FOR BAZOOKA, 'C' FOR GRENADE, AND 'D' FOR SMOKEBOMB", 200, 700);

	  //When spacekey is pressed, the gamestate should change to 1. 
	  if (keyWentDown("space")) {
		  gameState=1;
		 
	  }
  }

  //What should happen when gamestate is not 0
  if(gameState === 1 || gameState===2 || gameState===3 || gameState===4){
	 //loads the image of the player when gamestate is 1. 
	player.addImage(playerAnimation);
	player.scale = 1;

  	
	//controls
  	if (keyDown(UP_ARROW)) {
	  	player.y = player.y - 10;
  	}

  	if (keyDown(DOWN_ARROW)) {
		player.y = player.y + 10;
		}

  	if (keyDown(RIGHT_ARROW)) {
		player.x = player.x + 10;
		}	

  	if (keyDown(LEFT_ARROW)) {
		player.x = player.x - 10;
	}

  ;
  	//Code for making the player comes to its original position when he moves out of the given dimensions
	  if (player.x === 200 || player.x === 1400 || player.y === 700 || player.y === 100) {
		  player.x = 750;
		  player.y = 650;
	  }

	  if(life<=0){
			life=500;
			textSize(20);
			fill("green");
			text("YOU HAVE ONE MORE CHANCE, KILL THEM", 300, 200);
		  
	  }

	  
	}

	if (gameState===1) {
		
		//gives the main objective of level 1
		background("orange");
		textSize(30);
		fill("black");
		text("YOU ARE IN LEVEL 1. KILL THE INFERNOS TO PROCEED TO LEVEL2", 200, 750);

		spawnInfernos();

	  textSize(30);
		text("Life:"+life, 100, 100);
		text("Life of inferno1:"+ilife1, 450, 100);
		text("Life of inferno2:"+ilife2, 750, 100);

		

		if(inferno.isTouching(player)){
			life=life-2;
		}

		

	  
	}

	if(gameState===2){

		player.scale = 0.7;
		
		background("green");
		textSize(30);
		fill("yellow");
		text("YOU ARE IN THE SLIMY PLANET KILL THE SLIMIES TO MOVE FORWARD", 200, 750);

		spawnSlimies();
		spawnInfernos();

		

		textSize(30);
		text("Life:"+life, 100, 100);
		text("Life of slimie1:"+slilife1, 450, 100);
		text("Life of slimie2:"+slilife2, 750, 100);

		
		if(slime.isTouching(player)){
			life=life-2;
		}

		if(inferno.isTouching(player)){
			life=life-2;
		}
		
	}

	if(gameState===3){

		player.scale=0.5;
		background(rgb(173, 216, 230));
		textSize(30);
		fill("red");
		text("YOU ARE IN THE DINO PLANET. KILL THE DINOS TO WIN THE GAME.", 200, 750);

		spawnInfernos();
		spawnSlimies();
		spawnDinos();

		

	  if(slime.isTouching(player)){
		life=life-2;
	}

	  if(inferno.isTouching(player)){
		life=life-2;
		}

	  if(rock.isTouching(player)){
		  life=life-2;
	  }	

	  textSize(30);
		text("Life:"+life, 100, 100);
		text("Life of Dino1:"+dinolife1, 450, 100);
		text("Life of Dino2:"+dinolife2, 750, 100);

	}

	if(gameState===4){
		player.scale=0.025;
		background("black");
		earth = createSprite(700, 100, 20, 20);
		earth.addImage(earthimage);
		textSize(30);
		fill("red");
		text("YOU HAVE WON.", 600, 750);
		text("YOU HAVE SENT THE ALIENS' DNA TO YOUR TEAMMATES, AND THEY HAVE GIVEN YOU A ", 100, 400);
		text("MILLION BUCKS", 600, 500);
		inferno1.visible=false;
		inferno2.visible=false;
	}

	
  
	
  
  drawSprites();

  
}

function spawnInfernos() {
	

	//creates the infernos when the player moves
	if(World.frameCount%60===0){

		
	
	//creates the infernos	
	infero1 = createSprite(300, 400, 20, 20);
	infero1.addImage(firealien);

	infero2 = createSprite(1200, 400, 20, 20);
	infero2.addImage(firealien);

	//creates the fires which infernos use to burn people
	var fire1 = createSprite(0, random(700, 100), 5, 5);
	fire1.shapeColor="black";
	fire1.velocityX = 10;
	fire1.scale=0.2;
	fire1.addImage(fireimage);

	var fire2 = createSprite(1500, random(700, 100), 20, 20);
	fire2.shapeColor="black";
	fire2.velocityX = -10;
	fire2.scale=0.2;
	fire2.addImage(fireimage);
	
	var fire3 = createSprite(random(100, 1400), 0, 20, 20);
	fire3.shapeColor="black";
	fire3.velocityY = 10;
	fire3.scale=0.2;
	fire3.addImage(fireimage);

	var fire4= createSprite(random(100, 1400), 800, 20, 20);
	fire4.shapeColor="black";
	fire4.velocityY = -10;
	fire4.scale=0.2;
	fire4.addImage(fireimage);
		

	infero1.shapeColor = "red";
	infero2.shapeColor = "red";

	fire1.lifetime=500;
	fire2.lifetime=500;
	//firegroup.add(fire1);

	inferno.add(fire1);
	inferno.add(fire2);
	inferno.add(fire3);
	inferno.add(fire4);

	if(keyDown("A")){
		ilife1=ilife1-10;
		ilife2=ilife2-10;
		gun+=1;
	}

	if(keyDown("B")){
	  ilife1=ilife1-30;
	  ilife2=ilife2-30;
	  bazooka+=1;
  }

  if(keyDown("C")){
	  ilife1=ilife1-10;
	  ilife2=ilife2-10;
	  grenade+=1;
  }

  if(keyDown("D")){
	  ilife1=ilife1-10;
	  ilife2=ilife2-10;
	  smokebomb+=1;
  }



	if(ilife1<=0&&ilife2<=0){
		gameState=2;
	}

	

	
}

}

function spawnSlimies() {
	if(World.frameCount%60===0){
	var slimie1 = createSprite(300, 200, 80, 80);
	slimie1.addImage(slimealien);
	slimie1.scale=1;

	var slimie2 = createSprite(1200, 200, 80, 80);
	slimie2.addImage(slimealien);
	slimie2.scale=1;

	var slime1 = createSprite(0, random(700, 100), 20, 20);
	slime1.shapeColor="black";
	slime1.velocityX = 10;
	slime1.scale=0.2;
	slime1.addImage(slimeimage);

	var slime2 = createSprite(1500, random(700, 100), 20, 20);
	slime2.shapeColor="black";
	slime2.velocityX = -10;
	slime2.scale=0.2;
	slime2.addImage(slimeimage);
	
	var slime3 = createSprite(random(100, 1400), 0, 20, 20);
	slime3.shapeColor="black";
	slime3.velocityY = 10;
	slime3.scale=0.2;
	slime3.addImage(slimeimage);

	var slime4 = createSprite(random(100, 1400),800, 20, 20);
	slime4.shapeColor="black";
	slime4.velocityX = -10;
	slime4.scale=0.2;
	slime4.addImage(slimeimage);

	slime.add(slime1);
	slime.add(slime2);
	slime.add(slime3);
	slime.add(slime4);
	
	if(keyDown("A")){
		slilife1=slilife1-10;
		slilife2=slilife2-10;
		gun+=1;
	}

	if(keyDown("B")){
	  slilife1=slilife1-30;
	  slilife2=slilife2-30;
	  bazooka+=1;
  }

  if(keyDown("C")){
	  slilife1=slilife1-10;
	  slilife2=slilife2-10;
	  grenade+=1;
  }

  if(keyDown("D")){
	  slilife1=slilife1-10;
	  slilife2=slilife2-10;
	  smokebomb+=1;
  }



	}

	if(slilife1<=0||slilife2<=0){
		gameState=3;
	}
}

function spawnDinos() {
	if(World.frameCount%80===0){
	var dino1 = createSprite(300, 500, 80, 80);
	dino1.addImage(dinoimage);
	dino1.scale=0.5;

	var dino2 = createSprite(1200, 500, 80, 80);
	dino2.addImage(dinoimage);
	dino2.scale=0.5;

	var rock1 = createSprite(0, random(700, 100), 20, 20);
	rock1.shapeColor="black";
	rock1.velocityX = 10;
	rock1.scale=0.5;
	rock1.addImage(rockimage);

	var rock2 = createSprite(1500, random(700, 100), 20, 20);
	rock2.shapeColor="black";
	rock2.velocityX = -10;
	rock2.scale=0.5;
	rock2.addImage(rockimage);
	
	var rock3 = createSprite(random(100, 1400), 0, 20, 20);
	rock3.shapeColor="black";
	rock3.velocityY = 10;
	rock3.scale=0.5;
	rock3.addImage(rockimage);

	var rock4 = createSprite(random(100, 1400),800, 20, 20);
	rock4.shapeColor="black";
	rock4.velocityX = -10;
	rock4.scale=0.5;
	rock4.addImage(rockimage);

	rock.add(rock1);
	rock.add(rock2);
	rock.add(rock3);
	rock.add(rock4);
	
	if(keyDown("A")){
		dinolife1=dinolife1-10;
		dinolife2=dinolife2-10;
		gun+=1;
	}

	if(keyDown("B")){
	  dinolife1=dinolife1-30;
	  dinolife2=dinolife2-30;
	  bazooka+=1;
  }

  if(keyDown("C")){
	  dinolife1=dinolife1-10;
	  dinolife2=dinolife2-10;
	  grenade+=1;
  }

  if(keyDown("D")){
	  dinolife1=dinolife1-10;
	  dinolife2=dinolife2-10;
	  smokebomb+=1;
  }

  if(dinolife1<=0&&dinolife2<=0){
	gameState=4;
  }
}
}
