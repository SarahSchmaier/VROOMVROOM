var lambo;
var marble;
var button;
var slider;
var amp;
var charli;
var volhistory = [];
var numsamples = 5;

function preload() {
  song = loadSound('assets/vroom.mp3');
  // Load model with normalise parameter set to true
  lambo = loadModel('assets/lambo.obj', true);
  charli = loadImage('assets/CHARLI.png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  song.setVolume(0.2);
  button = createButton("play");
  button.addClass('buttonz');
  button.mousePressed(togglePlaying);
  slider = createSlider(0, 1, 0.5, 0.1);
  slider.addClass('sliderz');
	amp = new p5.Amplitude();
}
//sound visualization - average volume amplitude mapped on to lambo size
function draw() {
  var vol = (amp.getLevel()+0.1)*5;
  volhistory.push(vol);
  if (volhistory.length > numsamples) {
    volhistory.splice(0,1); 
  }
  var avg = 0;
  for (var i = 0; i < volhistory.length; i++) {
    avg+=volhistory[i];
  }
  avg/=volhistory.length;
  scale(avg);
  background(0,0,0);
  rotateX(frameCount * 0.01); //lambo rotation
  rotateY(frameCount * 0.01);
  normalMaterial(lambo); // for lambo color effect
  model(lambo);
  song.setVolume(slider.value());
  texture(charli); //creating texture for flying XCX logo
  rotateX(-frameCount * 0.015); //logo inverse rotation
  rotateZ(-frameCount * 0.005);
  scale(1/avg);
  rect(100,200,50,50); //flying logo rectangle
}

//play-pause button creation
function togglePlaying() { 
  if (!song.isPlaying()){
    song.play();
    button.html("pause");
  }
  else {
    song.pause();
    button.html("play");
  }
}