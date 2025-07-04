/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
    const KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
  };


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
  }
   else if (event.which === KEY.UP) {
      walker.speedY = -5;
    }
    else if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }
    else if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = 0;
    }
    else if (event.which === KEY.UP) {
      walker.speedY = 0;
    }
    else if (event.which === KEY.RIGHT) {
      walker.speedX = 0;
    }
    else if (event.which === KEY.DOWN) {
      walker.speedY = 0;
    }
  }
    

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function repositionGameItem() {
    walker.x += walker.speedX;
    walker.y += walker.speedY;
  }

  function redrawGameItem() {
    $('#walker').css("left", walker.x);
    $('#walker').css("top", walker.y);

  }

  function wallCollision() {
    if (walker.x < 0) {
      walker.speedX -= -5;
      walker.x = 0;
    }
    else if (walker.x > $("#board").width() - 25) {
      walker.speedX -= 5;
      walker.x = $("#board").width() - 50;
    }
    else if (walker.y < 0) {
      walker.speedY -= -5;
      walker.y = 0;
    }
    else if (walker.y > $("#board").height() - 25) {
      walker.speedY -= 5;
      walker.y = $("#board").height() - 50;
    }
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
