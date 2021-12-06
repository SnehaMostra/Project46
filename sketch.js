var bg, movingBg;
var dementor, dementorImg;
var harry, harryImg;
var edges;
var gameState = "play";
var spell, spellGrp, dementorGrp, spellImage;
var candy, candyImg, candyGrp;
var horcrux, horcruxImg;
var flag = false;

function preload(){
  
  bg = loadImage("images/bg.jpg");
  dementorImg = loadImage("images/dementor.png");
  //spellImage = loadAnimation("images/Ahhf.gif");
  candyImg = loadImage("images/candyFrog.png");
  harryImg = loadImage("images/harry.png");
  horcruxImg = loadImage("images/horcrux.png")

} 


function setup() { 
  createCanvas(displayWidth,displayHeight); 

  movingBg = createSprite(width/2,height/2);
  movingBg.addImage(bg);
  movingBg.scale = 3;

  horcrux = createSprite(width/2,0);
  horcrux.addImage(horcruxImg);
  horcrux.scale = 0.1;
  horcrux.visible = false;
  
  harry = createSprite(width/2,height-100, 50,50);
  harry.addImage(harryImg);
  harry.scale = 0.3;
  harry.setCollider("circle",0,0,10);
  harry.debug = true;
  edges = createEdgeSprites();

  spellGrp=new Group();
  dementorGrp = new Group();
  candyGrp = new Group();
} 

function draw() { 
  background("White"); 
  if(gameState==="play"){
    //making of the moving background
    movingBg.scale+=0.01;
    if(movingBg.scale>4){
      movingBg.scale = 3;
    }

    spawnDementors();
    spawnCandy();

    harry.bounceOff(edges);

    //for making arry go left
    if(keyDown("left_arrow")){
      harry.x-=5;
    }


    //for making arry go right
    if(keyDown("right_arrow")){
      harry.x+=5;
    }

    //for shooting the spell
    if(keyDown("space")){
      shoot();
    }
   
    //for destroying the dementors
    if(dementorGrp.isTouching(spellGrp)){
      dementorGrp.destroyEach();
    }

    if(dementorGrp.isTouching(harry)){
      gameState = "end";
    }

    if(frameCount===300){
      gameState = "win";
    }

    drawSprites(); 
  }
    else if(gameState==="end"){
      text(" Better luck next time Harry ", width/2, height/2);
    }

    else if(gameState==="win"){
      dementorGrp.destroyEach();
      if(flag===false){
        horcrux.visible = true;
        horcrux.attractionPoint (30,harry.x, harry.y );
        flag = true;
      }
      horcrux.collide(harry);
      drawSprites();

    }
}
function spawnDementors(){
  if(frameCount%60===0){
    var y=-150;
    var x=Math.round(random(0,width));
    dementor = createSprite(x,y);
    dementor.addImage(dementorImg);
    dementor.scale = 0.2;
    //dementor.velocityX = 0.005;
    dementor.attractionPoint (5,harry.x, harry.y );
    //dementor.setCollider("circle",0,0,10);
    dementor.debug = true;
    //var direction = (180*Math.atan2(200,200))/Math.PI;
    //dementor.setSpeedAndDirection(10,direction); 
    dementorGrp.add(dementor);
  }
}

function shoot(){
  spell = createSprite(harry.x, harry.y, 5,5);
  spell.shapeColor= "blue";
  spell.velocityY = -8;
  //spell.addAnimation("spell",spellImage);
  spellGrp.add(spell);
  spell.attractionPoint (30, mouseX, mouseY );
}

function spawnCandy(){
  if(frameCount%100===0){
    var y=-50;
    var x=Math.round(random(0,width));
    candy = createSprite(x,y);
    candy.addImage(candyImg);
    candy.scale = 0.1;
    candy.velocityY = 3;
    candyGrp.add(candy);
  }
}

