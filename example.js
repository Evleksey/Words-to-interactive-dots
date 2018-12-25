var swarm;
var time = 0;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  swarm = new Swarm(font);
  swarm.newWord("Hi!", 10, 250, 190);
}

function draw() {
  background(51);
  swarm.iterate();
  
  //if (time % 10 == 0) {console.log(time);}
  
  if (time == 200) {
    swarm.changeColor(120,120,120);
    swarm.newWord("Here!", 500, 300, 160);
  }
  
  if (time == 400) {
    swarm.changeColor(220,0,0);
    swarm.newWord("hahahahaaha", 40, 300, 160);
  }
  
  if (time == 600) {
    swarm.changeColor(255,255,255);
    swarm.newWord("Welcome!", 20, 100, 120);
    
    time = 0;
  }
  
  
  time++;
}
