var r_size = 200;
var a_size = 120;
var arrows = [];
var lifes = 220;
var count = 0;
var level = 10;
var speed = 7;
function preload() {
    img = loadImage('round.png');
    img_up = loadImage('arrow_up.png');
    img_left = loadImage('arrow_left.png');
    img_down = loadImage('arrow_down.png');
    img_right = loadImage('arrow_right.png');
    img_gameover = loadImage('gameover.png');
    img_empty = loadImage('pix.png');
}

function restart() {
  if (arrows.length == 0) {
   img = loadImage('round.png');
   arrows = [];
   lifes = 220;
   count = 0;
   level = 10;
   speed = 7;
   arrows[0] = new Arrow(Math.floor(random(0,4)));
   loop();
 }
}

function setup() {
var stage = document.querySelector("#stage");
stage.style.width = "800px";
stage.style.height = "500px";
var canvas  = createCanvas(parseInt(stage.style.width), parseInt(stage.style.height));
canvas.parent(stage);
frameRate(60);
arrows[0] = new Arrow(Math.floor(random(0,4)));
}

function mousePressed() {
  restart();
}

 function keyPressed() {
   restart();
   for (var i = 0; i < arrows.length; i++) {
      if (arrows[i].x > 50 && arrows[i].x < width-300 && arrows[i] != 2) {
        var temp = i;
        break;
      }
   }
  arrows[temp].point(keyCode);
}



function draw() {
  background(240);
if (count == level) {
  level += 2;
  count = 0;
  speed+=0.26;
}

push();
  noStroke(rect);
  fill(lifes);
  rect(0, 0, width, height);
pop();

push();
noStroke();
fill(255, 255, 255, 150);
rect(5, 5, map(count, 0, level, 5, width-5), 15, 10);
pop();

image(img, 90, height/2 - r_size/2, r_size, r_size);
if (lifes < 80) {
   gameover();
   if (arrows.length == 0) {
     noLoop();
   }
 }


for (var i = 0; i < arrows.length; i++) {
  arrows[i].create();
  arrows[i].show();
  arrows[i].move();
  arrows[i].lost();
}
}

function gameover() {
  for (var i = 0; i < arrows.length; i++) {
        arrows[i].child = 0;
        arrows[i].win = 2;
  }
  img = img_empty;
  image(img_gameover, width/2 - 225, 30, 450, 400);
}

function Arrow(type) {
  this.size = a_size;
  this.win = 0
  this.child = 1;
  this.x = 1000;
  this.y =  height/2 - a_size/2;
  this.x_speed = speed;
  this.y_speed = 0;
  this.type = type;
  switch(this.type) {
  case 0:
    this.img = img_up;
    break;
  case 1:
    this.img = img_left;
    break;
  case 2:
    this.img = img_down;
    break;
  case 3:
    this.img = img_right;
    break;
}

this.show = function() {
  image(this.img, this.x, this.y, this.size, this.size);
}

this.move = function() {
  this.x = this.x - this.x_speed;
  this.y = this.y + this.y_speed;
}

this.create = function() {
  if (this.child == 1 && this.x < random(0, 880)) {
    this.child = 0;
    var b = new Arrow(Math.floor(random(0,4)));
    arrows.push(b);
  }

  if (this.x < -130) {
    if(this.win == 2 && lifes > 50) lifes-=20; else {
      if (this.win == 1) count++;
    if(lifes < 230) {
      lifes+=5;
    }
  }
    arrows.splice(0, 1);

  }

}

this.lost = function() {
if (this.win == 0 && this.x < 50) {
  this.win = 2;
}

  if (this.win == 1) {
    this.x_speed += 2;
    this.size += 2;
  } else
      if (this.win == 2) {
         this.y_speed = random(-3, 3);
      }
}

this.point = function(key) {
if (this.x > 50 && this.x < 220) {
        switch(this.type) {
      case 0:
        if (key == 38 && this.win == 0) this.win = 1; else this.win = 2;
        break;
      case 1:
        if (key == 37 && this.win == 0) this.win = 1; else this.win = 2;
        break;
      case 2:
        if (key == 40 && this.win == 0) this.win = 1; else this.win = 2;
        break;
      case 3:
        if (key == 39 && this.win == 0) this.win = 1; else this.win = 2;
        break;
    }
} else {
  this.win = 2;
}
}

}
