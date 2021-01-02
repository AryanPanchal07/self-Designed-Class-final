var canvas, backgroundImage;

var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;

var invisibleBlockGroup, invisibleBlock;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var ghosts, ghost1, ghost1Img, ghost2, ghost2Img, ghost3Img, ghost4Img, ghost3, ghost4;
var bg,bg2;

function preload(){
  bg = loadImage("bghome.jpg");
  bg2 = loadImage("bg2.jpg");
  ghost1Img = loadImage("G1.png");
  ghost2Img = loadImage("G2.png");
  ghost3Img = loadImage("G3.png");
  ghost4Img = loadImage("G4.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}


function draw(){
  background(bg);
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
