//Create variables here
var dog, dogImage, happyDog, happyDogImage, milk, milkImage; 
var database; 
var foodS, foodStock;
var backImage;

function preload()
{
  //load images here
  dogImage = loadImage("images/Dog.png");
  happyDogImage = loadImage("images/happydog.png");
  milkImage = loadImage("images/milk.png");
  backImage = loadImage("images/back.jpg")

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(300,380,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.20;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20);

  milk = createSprite(140,470,10,10);
  milk.addImage(milkImage);
  milk.scale = 0.040;

  
  milk1 = createSprite(254,420,10,10);
  milk1.addImage(milkImage);
  milk1.scale = 0.030;
  milk1.visible = false;

}


function draw() { 
  background(backImage);
  
  if(foodS !== 0){
    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImage);
      milk1.visible = true;
  
     
    }
  
    if(keyWentUp(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dogImage);
      milk1.visible = false;
    }
  }

  if(foodS == 0){
  
    dog.addImage(dogImage);
    foodS = 20;
  
  }
  
  drawSprites();
  
  strokeWeight(10);
 stroke(random(0, 245), random(0, 245), random(0, 245));
  fill("red");
  textSize(40);
  text("VIRTUAL PET", 140, 50)


  textSize(17);
  fill("yellow");
  text("I am your Puppy 🐶Drago..😍 I am Hungry!! ",100,150);
  fill("yellow");
  text("Note: Press up arrow key to feed your pet Dog Drago!!",50,100);
  fill("yellow");
  text("Milk Bottles Remaining  "+foodS,170,490);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



