
//UPDATE INFO
$(document).ready(function() {
  setTimeout(messages, 1000);
  resetGame();
});

function messages() {
  with(document){
    let mensajeDireccion = getElementById('direction').textContent = 'rover is facing ' + rover.direction;
    let mensajePosicion = getElementById('direction2').textContent = rover.position[0] + ',' + rover.position[1];
    let mensajeVidas = getElementById('lives').textContent = rover.lives + ' lives';
  }
}

//ROVER GRID
let grid = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
];

//ROVER OBJECT
let rover = {
  direction: 'N',
  position: [0, 0],
  obstacles: [],
  lives: 3,
  travelLog: []
};


// RANDOM OBSTACLES PLACEMENT
for (var i = 0; i < 10; i++) {
  let row       = randomObstacle();
  let column = randomObstacle();
  let obstacles = grid[row][column] = 'o';
  let obstacle = [row, column];
  rover.obstacles.push(obstacle);
}

function randomObstacle(){
  return Math.floor(Math.random() * 10);
}

//ROVER PLACEMENT ON GRID AND CHANGE IN EVERY MOVE
function update() {

  //new 'x' position on grid
  if (rover.position[0] < 0 || rover.position[0] > 9 || rover.position[1] < 0 || rover.position[1] > 9 ) {
    $('.alerta').addClass('visible').text('Go back to the grid');
    setTimeout(function(){
      $('.alerta').removeClass('visible');
    },1500);

  } else {
    grid[rover.position[1]].splice(rover.position[0], 1, 'x');
  }

  //update travelLog (splice method so doesnt update the same value always)
  //  rover.travelLog.push(rover.position.slice());

  //check if crash
  for (var i = 0; i < rover.obstacles.length; i++) {
    if (rover.obstacles[i][0] === rover.position[0] && rover.obstacles[i][1] === rover.position[1]) {
      rover.lives--;
      $('.alerta').addClass('visible');
      $('.alerta').text('you hit an obstacle, you have: ' + rover.lives + ' lives left');
      setTimeout(function(){
        $('.alerta').removeClass('visible');
      },1500);
    }
  }

  //when lose
  if (rover.lives === 0) {
    if (confirm('game over, want to play again?')) {
      resetGame();
    }
  }
}

//RESET
function resetGame(){
  grid[rover.position[1]].splice(rover.position[0], 1, 'x');
  rover.lives = 3;
  rover.position = [0,0];
  rover.travelLog = [];
  messages();
}

//LOGIC DECISSIONS
document.getElementById("decision").onkeyup = function(e) {

  let texto = e.target.value;

  let textoSanedo = texto.replace(" ", "").toUpperCase();

  e.target.value = textoSanedo;

  let commands;
  for (var i = 0; i < textoSanedo.length; i++) {
    commands = textoSanedo[i];
  }

  switch (commands) {
    case 'L':turnLeft(rover);break;
    case 'R':turnRight(rover);break;
    case 'F':moveForward(rover);break;
    case 'B':moveBackwards(rover);break;
  }
};

//TURN LEFT
function turnLeft(rover) {
  switch (rover.direction) {
    case 'N':rover.direction = 'W';break;
    case 'W':rover.direction = 'S';break;
    case 'S':rover.direction = 'E';break;
    case 'E':rover.direction = 'N';break;
  }
  messages();
  update();
}

//TURN RIGHT
function turnRight(rover) {
  switch (rover.direction) {
    case 'N':rover.direction = 'E';break;
    case 'E':rover.direction = 'S';break;
    case 'S':rover.direction = 'W';break;
    case 'W':rover.direction = 'N';break;
  }
  messages();
  update();
}

//MOVE FORWARD
function moveForward(rover) {
  switch (rover.direction) {
    case 'N':rover.position[1]--;break;
    case 'W':rover.position[0]--;break;
    case 'S':rover.position[1]++;break;
    case 'E':rover.position[0]++;break;
  }
  rover.travelLog.push([rover.position[0], rover.position[1]]);
  messages();
  update();
}

//MOVE BACKWARDS
function moveBackwards(rover) {
  switch (rover.direction) {
    case 'N':rover.position[1]++;break;
    case 'W':rover.position[0]++;break;
    case 'S':rover.position[1]--;break;
    case 'E':rover.position[0]--;break;
  }
  rover.travelLog.push([rover.position[0], rover.position[1]]);
  messages();
  update();
}
