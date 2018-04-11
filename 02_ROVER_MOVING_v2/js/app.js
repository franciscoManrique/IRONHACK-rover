
//---------------------MESSAGES---------------------//
function message1(){
  $('#message').text('Establishing communication...');
}

function message2(){
  $('#message').text('The rover is placed in position: ' + rover.position + ' and is facing ' + rover.direction);
}

function showLives(){
  document.getElementById('lives').textContent = rover.lives + ' lives';
}

$(document).ready(function(){
  update();
});


//---------------------ROVER OBJECT---------------------//
var rover = {
  obstacles: [],
  prizes: [],
  direction: 'N',
  lives: 3,
  position: $('.rover').data('num'),
  left: function(){
    moveToPosition(-1, 0);
  },
  right: function(){
    moveToPosition(1, 0);
  },
  up: function(){
    moveToPosition(0, -1);
  },
  down: function(){
    moveToPosition(0, 1);
  }
};

//---------------------MOVING---------------------//
function moveToPosition(ejeX, ejeY){
  let newPositionRover = [ //Calculate new position
    rover.position[0] + ejeX,
    rover.position[1] + ejeY
  ];

  if (newPositionRover[0] < 0 || newPositionRover[0] >9 || newPositionRover[1] <0 || newPositionRover[1] >9 ) {
    console.log('no puede salirse');
    return; // Stop the execution if is out of the grid
  }


  //Update new position so I accumulate the new values
  rover.position = newPositionRover;

  //Moving the rover
  $("div[data-num='[" + newPositionRover +"]']").append( $(".rover"));
  message2();



  // Check if obstacle
  for(var i = 0; i < rover.obstacles.length; i++){
    if (rover.obstacles[i][0] === newPositionRover[0] && rover.obstacles[i][1] === newPositionRover[1]){
      console.log(rover.obstacles[i]);
      $("div[data-num='[" + rover.obstacles[i] +"]']").css('background-color', 'red');

      //Resting hearts when crash
      rover.lives--;
      showLives();
    }
  }

  // Check if prize
  for(var i = 0; i < rover.prizes.length; i++){

    if (rover.prizes[i][0] === newPositionRover[0] && rover.prizes[i][1] === newPositionRover[1]) {
      updatePrize(i);
    }

  }

  //When win
  if (newPositionRover[0] === 9 && newPositionRover[1] === 9) {

    alert('you won');

    if (confirm('want to play again?')) {
      update();
    }
  }

  //When lose
  if (rover.lives === 0) {

    alert('you lost');

    if (confirm('want to play again?')) {
      update();
    }
  }
  else if (rover.lives === 1) { // fixing typo
    document.getElementById('lives').textContent = rover.lives + ' live';
  }
}


//---COMMON UPDATE INFO AND RE-POSITIONING ROVER WHEN LOSE OR WIN---//
function update(){
  rover.lives = 3; // update hearts (show it in a modal)

  showLives(); // show 3 lives again in panel

  message2(); // update coordinates of the rover in panel

  $("div[data-num='[" + [0,0] +"]']").append( $(".rover")); // re-position rover in [0,0]

  rover.position = [0,0]; // updates the new location

  newGame();
}

//---------------COMMON UPDATE WHEN HAVING PRIZE-----------------//
//Adding hearts when prize
function updatePrize(i){


  let randomX = Math.floor(Math.random() * 5) + 5;
  let randomY = randomX;

  while(randomX === randomY){
    randomY = Math.floor(Math.random() * 5) + 5;
  }

  let positionToJump = [randomX, randomY];

  $("div[data-num='[" + rover.prizes[i] +"]']").css('background-color', 'gold');
  $("div[data-num='[" + positionToJump +"]']").append( $(".rover"));
  rover.position = positionToJump;

  $('#mensajes').addClass('visible').text('You found a prize');
  setTimeout(function(){
    $('#mensajes').removeClass('visible');
  },2000);

  // rover.lives++;
  showLives();
}


//-----------------MOVEMENT KEYS------------------//
$(document).on('keydown', function(e){
  if (e.keyCode === 37) {
    rover.left();
    e.preventDefault();
  }
  if (e.keyCode === 39) {
    rover.right();
    e.preventDefault();
  }
  if (e.keyCode === 38) {
    rover.up();
    e.preventDefault();
  }
  if (e.keyCode === 40) {
    rover.down();
    e.preventDefault();
  }
});

//-------CREATION OF OBSTACLES IN EACH ROUND-------//
function newGame(){

  $("div.celda").css('background-color', 'white');
  rover.obstacles = []; // Empty array for new round when lose
  rover.prizes = [];    // Empty array for new round when lose

  //---OBSTCALE---//
  for (var i = 0; i < 8; i++) {

    let axisX = Math.floor(Math.random() * 10);
    let axisY = Math.floor(Math.random() * 10) + 1;

    let obstacle = [axisX, axisY];
    rover.obstacles.push(obstacle);
    // $("div[data-num='["+ obstacle +"]']").css('background-color', 'red');
  }


  //---PRIZE//---//
  for (var j = 0; j < 6; j++) {

    let axisXprize = Math.floor(Math.random() * 10);
    let axisYprize = Math.floor(Math.random() * 10) + 1;

    let prize = [axisXprize, axisYprize];
    rover.prizes.push(prize);
    // $("div[data-num='["+ prize +"]']").css('background-color', 'gold');
  }
}
