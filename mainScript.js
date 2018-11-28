"use strict";

var canvas;
var gl;
var program;

var NumVertices  = 0;

var wallsIndex = 4;

// arrays containing stuff to send to the shader trough buffers
var normalsArray = [];
var points = [];
var colors = [];

//------------------------------------------- TRANSFORMATION MATRICES --------------------------------------------------

var modelViewMatrix;
var modelViewMatrixLoc;

var projectionMatrix;
var projectionMatrixLoc;

//---------------------------------------------------------------
// INIT FUNCTION

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
	
    //
    //  -------------- Load shaders and initialize attribute buffers
    //
	program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
	// --------------- sending texture flag 
	gl.uniform1f	(gl.getUniformLocation(program,"usingTexture"), 	usingTexture);
	//  -------------- lighting parameters 
	// computing products
    var ambientProduct = mult(lightAmbient, materialAmbient);
	var diffuseProduct = mult(lightDiffuse, materialDiffuse);
	var specularProduct = mult(lightSpecular, materialSpecular);
	//sending values 
	gl.uniform4fv	(gl.getUniformLocation(program,"ambientProduct"),	flatten(ambientProduct));
	gl.uniform4fv	(gl.getUniformLocation(program,"diffuseProduct"), 	flatten(diffuseProduct));
	gl.uniform4fv	(gl.getUniformLocation(program,"specularProduct"), 	flatten(specularProduct));
	gl.uniform4fv	(gl.getUniformLocation(program,"lightPosition"), 	flatten(lightPosition));
	gl.uniform1f	(gl.getUniformLocation(program,"shininess"), 		materialShininess);
    // -------------- matrices binding
		//	modelViewMatrix
	modelViewMatrix = mat4();
	modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
		//	projection matrix
	projectionMatrix = mat4();
	projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");
		// instance matrix
	instanceMatrix = mat4();
	
	//initialize the structure
	for(var i=0; i<numNodes; i++) 
		initNodes(ids[i]);
	traverse(sceneId);
	//computeNormals();
	// --------------------------- DEBUG -------------------------------------------
	console.log("Ended traversing the structure, printing it");
	console.log(figure);
	
//---------------------------------------------------------------
// BUFFERS
	// normals buffer
	var nBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);
	
	var vNormal = gl.getAttribLocation(program, "vNormal");
	gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vNormal);
	
	// texture buffer
	var tBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW);
	
	var vTexCoord = gl.getAttribLocation(program, "vTexCoord");
	gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vTexCoord);
	
	// colors buffer
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
	// points buffer
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

// utilities for the texture
	updateTexture();
	computeTexture();	
	
//---------------------------------------------------------------
    //event listeners for buttons
	// SCENE rotations
    document.getElementById( "xButtonSP" ).onclick = function () {
        nodesAngle[sceneId] += 3;
		console.log(nodesAngle);
		initNodes(sceneId);
    };
    document.getElementById( "yButtonSP" ).onclick = function () {
        nodesAngle[sceneId+1] += 3;
		console.log(nodesAngle);
		initNodes(sceneId);
    };
    document.getElementById( "zButtonSP" ).onclick = function () {
        nodesAngle[sceneId+2] += 3;
		console.log(nodesAngle);
		initNodes(sceneId);
    };
    document.getElementById( "xButtonSN" ).onclick = function () {
        nodesAngle[sceneId] -= 3;
		console.log(nodesAngle);
		initNodes(sceneId);
    };
    document.getElementById( "yButtonSN" ).onclick = function () {
        nodesAngle[sceneId+1] -= 3;
		console.log(nodesAngle);
		initNodes(sceneId);
    };
    document.getElementById( "zButtonSN" ).onclick = function () {
        nodesAngle[sceneId+2] -= 3;
		console.log(nodesAngle);
		initNodes(sceneId);
    };
	// MAZE rotations 
	document.getElementById( "xButtonMP" ).onclick = function () {
        nodesAngle[mazeId] += 3;
		console.log(nodesAngle);
		initNodes(mazeId);
    };
    document.getElementById( "yButtonMP" ).onclick = function () {
        nodesAngle[mazeId+1] += 3;
		console.log(nodesAngle);
		initNodes(mazeId);
    };
    document.getElementById( "zButtonMP" ).onclick = function () {
        nodesAngle[mazeId+2] += 3;
		console.log(nodesAngle);
		initNodes(mazeId);
    };
    document.getElementById( "xButtonMN" ).onclick = function () {
        nodesAngle[mazeId] -= 3;
		console.log(nodesAngle);
		initNodes(mazeId);
    };
    document.getElementById( "yButtonMN" ).onclick = function () {
        nodesAngle[mazeId+1] -= 3;
		console.log(nodesAngle);
		initNodes(mazeId);
    };
    document.getElementById( "zButtonMN" ).onclick = function () {
        nodesAngle[mazeId+2] -= 3;
		console.log(nodesAngle);
		initNodes(mazeId);
    };
	// toggle animation 
	document.getElementById( "animationOn" ).onclick = function () {
		animationFlag = 1;
    };
	document.getElementById( "animationOff" ).onclick = function () {
		animationFlag = 0;
    };

    render();
}
//---------------------------------------------------------------


window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowDown":
    	// code for "down arrow" key press.
      	if ( animationFlag == 1 ){
			if ( characterMovement == 0 ) {
				characterMovement = 1;
				movementDirection = 1;
			}
		}
      	break;
    case "ArrowUp":
      	// code for "up arrow" key press.
    	if ( animationFlag == 1 ){
			if ( characterMovement == 0 ) {
				characterMovement = 1;
				movementDirection = 0;
			}
		}
      	break;
    case "ArrowLeft":
      	// code for "left arrow" key press.
      	if ( animationFlag == 1 ){
			if ( characterMovement == 0 ) {
				characterMovement = 1;
				movementDirection = 2;
			}
		}
		break;
    case "ArrowRight":
      	// code for "right arrow" key press.
      	if ( animationFlag == 1 ){
			if ( characterMovement == 0 ) {
				characterMovement = 1;
				movementDirection = 3;
			}
		}
      	break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window 


//---------------------------------------------------------------
// render function
function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	//	projection
	projectionMatrix = ortho(-6, 6, -6, 6, 15, -15);
	//sending matrices to GPU
	gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
	
	traverse(sceneId);

	// resetting numvertices
	NumVertices = 0;
	
	if ( animationFlag ) update();
	
    requestAnimFrame( render );
}