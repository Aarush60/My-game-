var backgroundImage 
var ground, tim, timAnimation
var cash, diamond, gold, moneyBag, guard, bagOfJewels
var ObjectGroup, guardGroup, score, guard1, gameOver, gameOverImage

function preload(){
  backgroundImage = loadImage("Pictures/Background.jpg");
  timAnimation = loadAnimation("Pictures/Tim_1.png", "Pictures/Tim_2.png", "Pictures/Tim_3.png", "Pictures/Tim_4.png", "Pictures/Tim_5.png", "Pictures/Tim_6.png", "Pictures/Tim_7.png", "Pictures/Tim_8.png");
  cash = loadImage("Pictures/Cash.png"); 
  diamond = loadImage("Pictures/Diamond.png"); 
  gold = loadImage("Pictures/Gold.png"); 
  moneyBag = loadImage("Pictures/Money_Bag.png"); 
  guard = loadImage("Pictures/Guard.png");
  bagOfJewels = loadImage("Pictures/Bag_of_Jewels.png");
  gameOverImage = loadImage("Pictures/GameOver.jpg");
}

function setup() {
  createCanvas(1500,580);
  scene = createSprite(625,290,1500,580)
  scene.addImage(backgroundImage);
  
  tim = createSprite(width/2,height-70,10,40);
  tim.addAnimation("timAnimation", timAnimation);
  tim.scale = 0.7;

  invisibleGround = createSprite(625, 585, 1250,10)
  invisibleGround.visible = false

  tim.collide(invisibleGround);
 
  ObjectGroup = new Group();
  guardGroup = new Group();

  score = 0;

  gameOver = createSprite(width/2,height/2,10,40);
  tim.addImage("gameOver", gameOverImage);
  tim.scale = 0.7;
  gameOver.visible = false;

}



function draw() {
  background("white");

if(keyDown("space") && tim.y >= 159) {
  tim.velocityY = -12;
}
tim.velocityY = tim.velocityY + 0.8

tim.collide(invisibleGround);
 
spawnGuard();
spawnObjects();



if(ObjectGroup.isTouching(tim)){
  score = score+10;
  ObjectGroup.destroyEach();
}

if(guardGroup.isTouching(tim)){
  ObjectGroup.setVelocityXEach(0);
  ObjectGroup.destroyEach();
  guardGroup.setVelocityXEach(0);
  guardGroup.destroyEach()

  gameOver.visible = true;
}

drawSprites();

  textSize(22);
fill("blue");
text("score: "+score,500,40);

}

  function spawnObjects(){
    if(frameCount % 60 === 0) {
      var treasure = createSprite(width,height-40,10,40);
      treasure.velocityX = -6;
      
      var rand = Math.round(random(1,5));
      switch(rand) {
        case 1: treasure.addImage(diamond);
                break;
        case 2: treasure.addImage(bagOfJewels);
                break;
        case 3: treasure.addImage(gold);
                break;
        case 4: treasure.addImage(moneyBag);
                break;
        case 5: treasure.addImage(cash);
                break;
        default: break;
      }

      treasure.scale = 0.1;
      treasure.lifetime = 300;

      ObjectGroup.add(treasure);
    }
}

function spawnGuard(){
  if(frameCount % 90 === 0){
    guard1 = createSprite(width,height-60,10,40)
    guard1.addImage(guard);
    guard1.velocityX = -6;
    guard1.scale = 0.2

    guardGroup.add(guard1);

    
  }
}