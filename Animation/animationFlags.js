// ------------------------------------------ ANIMATION FLAGS ----------------------------------------------------------

// variable to keep track of the direction in which the character is moving 
// 0: UP, 1: RIGHT, 2:DOWN, 3:LEFT
var direction = 1;

// variable to keep track of the direction in which the character is rotating 
// 0: left, 1: right
var rotationDirection = 1;

// flag to check if we need to animate or not
var animationFlag = 1;

// flag to check if the character is moving or not
var characterMovement = 0;

// flag to check if the character is rotating or not
var characterRotation = 0;

// flag to check in which frame of the animation are we 
var movementCounter = 0;

// flag to check in which frame of the rotation are we
var rotationCounter = 0;

// flags to check if the user has collected the various objectives
var objective1Captured = 0;
var objective2Captured = 0;
var objective3Captured = 0;
var objective4Captured = 0;

// number of objectives captured by the user
var objectivesCaptured = 0;
