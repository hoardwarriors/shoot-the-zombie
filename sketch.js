var bg,bgImg;
var player, shooterImg, shooter_shooting;
var gamestate="play"
var bullets=10
var life=3
var score=0

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
zombieImg=loadImage("assets/zombie.png")
heart1img=loadImage("assets/heart_1.png")
heart2img=loadImage("assets/heart_2.png")
heart3img=loadImage("assets/heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   heart1= createSprite(displayWidth-150,40,20,20)
   heart1.addImage(heart1img)
   heart1.scale=0.4
   heart1.visible=false
   heart2= createSprite(displayWidth-100,40,20,20)
   heart2.addImage(heart2img)
   heart2.scale=0.4
   heart2.visible=false

   heart3= createSprite(displayWidth-150,40,20,20)
   heart3.addImage(heart3img)
   heart3.scale=0.4
   
zombieGroup=new Group()
bulletGroup=new Group()
}

function draw() {
  background(0); 


if(gamestate==="play"){
if(life===3){
  heart3.visible=true
  heart2.visible=false
  heart1.visible=false
}
if(life===2){
  heart3.visible=false
  heart2.visible=true
  heart1.visible=false
}
if(life===1){
  heart3.visible=false
  heart2.visible=false
  heart1.visible=true
}
if(life===0){
  heart1.visible=false
  console.log("the life is 0")
  gamestate="lost"
}


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet=createSprite(displayWidth-1150,player.y-30,20,10)
bullet.velocityX=20
bulletGroup.add(bullet)
player.depth=bullet.depth+2
 player.addImage(shooter_shooting)
 bullets=bullets-1
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
for(var i=0;i<zombieGroup.length;i++){
  if(zombieGroup[i].isTouching(bulletGroup)){
    zombieGroup[i].destroy()
    bulletGroup.destroyEach()
    score=score+5
  }
}
if(bullets==0){
  gamestate="end"
}
if(zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      life=life-1
      console.log(life)
    }
  }
}
enemy();
if(score===40){
  gamestate="won"
}
}
drawSprites();
fill("white")
textSize(20)
text("Bullets="+bullets,displayWidth-210,displayHeight/2-250)
text("lives="+life,displayWidth-200,displayHeight/2-280)
text("Score="+score,displayWidth-200,displayHeight/2-220)
if(gamestate==="end"){
  textSize(50)
  fill("red")
  text("you ran out of bullets",470,410)
  zombieGroup.destroyEach()
  bulletGroup.destroyEach()
  player.destroy()
}
if(gamestate==="lost"){
  textSize(50)
  fill("red")
  text("game over",470,410)
  zombieGroup.destroyEach()
  
  player.destroy()
}
if(gamestate==="won"){
  textSize(50)
  fill("red")
  text("you won",470,410)
  zombieGroup.destroyEach()
  
  player.destroy()
}
}

function enemy(){
  if(frameCount%50===0){
    zombie=createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombieImg)
    zombie.velocityX=-3
    zombie.scale=0.15
    zombie.debug=true
    zombie.lifetime=400
    zombie.setCollider("rectangle",0,0,400,400)
    zombieGroup.add(zombie)
  }



}
