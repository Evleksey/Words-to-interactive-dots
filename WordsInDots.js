//Single object
function Vehicle(x, y, colors) {
 this.pos = createVector(random(width), random(height));
 this.target = createVector(x, y);
 this.vel = createVector();
 this.acc = createVector();
 this.size = 8;
 this.maxSpeed = 10 + random(3);
 this.maxForce = 2;
 this.multFactor = 4;
 this.colors = colors;
}


//Updating its physical position
Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}


//Updating its physical property maximum speed
Vehicle.prototype.setMaxSpeed = function(max) {
  if (max > 0 ) {
    this.maxSpeed = max;
  }  
}


//Applyind steering force
Vehicle.prototype.applyforce = function(f) {
  this.acc.add(f);
}


// Different behaviors
Vehicle.prototype.behavior = function() {
  //Serching for spot
  var arrive = this.arrive(this.target);
  
  this.applyforce(arrive);
  //Scared of cursor
  var mouse = createVector(mouseX, mouseY);
  var run = this.seek(mouse);
  run.mult(this.multFactor);
  
  this.applyforce(run);
}


// Seeking for its spot
Vehicle.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } else return createVector();
}

// Martin, add description here
Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxSpeed;
  if (d < 80) {
    speed = map(d, 0, 100, 0, this.maxSpeed);
  } 
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
}


// Showing it on the canvas
Vehicle.prototype.show = function() {
  stroke(this.colors);
  strokeWeight(this.size);
  point(this.pos.x, this.pos.y)
}






// Swarm is a multiple objects
function Swarm(font){
  this.vehicles = [];
  this.font = font;
  this.colors = 255;
}


// Create new word
Swarm.prototype.newWord = function(str, x, y, size) {
  var points = this.font.textToPoints(str, x, y, size);
  
  for(var i = 0; i < points.length; i++) {
    
    var pt = points[i];
    
    if (this.vehicles.length > i){
      var veh = this.vehicles[i];
      veh.target = createVector(pt.x, pt.y)
    }
    else {      
      var veh = new Vehicle(pt.x, pt.y, this.colors);
      this.vehicles[i] = veh;
    }
  }
  
  for(var i = points.length; i < this.vehicles.length; i++) {
    var veh = this.vehicles[i];
    if (veh.pos.y > height / 2){
      veh.target = createVector(random(width), height + 10);
    } else {
      veh.target = createVector(random(width), -10);
    }
    this.vehicles[i] = veh;
  }
}

//Updating everything and displaying
Swarm.prototype.iterate = function() {
  for(var i = 0; i < this.vehicles.length; i++) {
   var vehicle = this.vehicles[i];
   vehicle.behavior();
   vehicle.update();
   vehicle.show();
  }  
}


//Setting new max speed
Swarm.prototype.setMaxSpeed = function(max) {
  for(var i = 0; i < this.vehicles.length; i++) {
   var vehicle = this.vehicles[i];
   vehicle.setMaxSpeed(max + random(-2, +2))
  }  
}

//Change color
Swarm.prototype.changeColor = function(r, g, b) {
  this.colors = [r, g, b];
  for(var i = 0; i < this.vehicles.length; i++) {
   var vehicle = this.vehicles[i];
   vehicle.colors = [r, g, b];   
  }  
}

//Change object size
Swarm.prototype.changeSize = function(size) {
  for(var i = 0; i < this.vehicles.length; i++) {
   var vehicle = this.vehicles[i];
   vehicle.suize = size;
  }  
}
