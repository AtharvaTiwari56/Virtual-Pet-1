var dog, dogimg, dog_happyimg, database, foodStock, foodCount;

function preload() {
  dogimg = loadImage("images/dogImg.png");
  dog_happyimg = loadImage("images/dogImg1.png");
}

function setup() {
	
  database = firebase.database();
  createCanvas(800, 700);
  dog = createSprite(400, 350, 34, 34);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodCount);
    dog.addImage(dog_happyimg);
  }
  drawSprites();
  stroke("black");
  fill("black");
  textSize(22);
  text("Food Remaining: " + foodCount, 300, 200);

}
function readStock(data) {
  foodCount = data.val();
}
function writeStock(d) {
  if(d <= 0) {
    d = 20;
  } else {
    d = d-1;
  }
  database.ref('/').update({
    'Food': d
  })
}


