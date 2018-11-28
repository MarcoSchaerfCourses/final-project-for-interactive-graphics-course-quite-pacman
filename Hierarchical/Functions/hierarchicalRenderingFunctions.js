// --------------------------------RENDERING FUNCTIONS----------------------------------------------------
// how to "render the scene"
function scene(){}

// how to render the maze
function maze() {	
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));	
	//drawing floor
    quadMaze( 0, 1, 2, 3 );
	//drawing walls with a loop
    var x = wallsIndex;
    for (var i=1; i<=15; i++){
    	var x2 = x;
    	for (var j=0; j<3; j++){
    		quadMaze( x2, x2+1, x2+5, x2+4 );
    		x2++;
    	}
    	quadMaze( x+3, x, x+4, x+7 );
    	quadMaze( x+4, x+5, x+6, x+7);
    	
    	x = x+8;
    }
}

// how to render objective1
function objective1 () {
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	
	var x = 0;
	
	quadObjectives(x+2, x+3, x, x+1, 1);
	var x2 = x;
	for (var j=0; j<3; j++){
		quadObjectives( x2, x2+1, x2+5, x2+4, 1);
		x2++;
	}
	quadObjectives( x+3, x, x+4, x+7, 1);
	quadObjectives( x+4, x+5, x+6, x+7, 1);
}

// how to render objective2
function objective2 () {
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	
	var x = 0;
	
	quadObjectives(x+2, x+3, x, x+1, 2 );
	var x2 = x;
	for (var j=0; j<3; j++){
		quadObjectives( x2, x2+1, x2+5, x2+4, 2);
		x2++;
	}
	quadObjectives( x+3, x, x+4, x+7, 2);
	quadObjectives( x+4, x+5, x+6, x+7, 2);
}

// how to render objective3
function objective3 () {
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	
	var x = 0;
	
	quadObjectives(x+2, x+3, x, x+1, 3 );
	var x2 = x;
	for (var j=0; j<3; j++){
		quadObjectives( x2, x2+1, x2+5, x2+4, 3);
		x2++;
	}
	quadObjectives( x+3, x, x+4, x+7, 3);
	quadObjectives( x+4, x+5, x+6, x+7, 3);
}

// how to render objective4
function objective4 () {
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	
	var x = 0;
	
	quadObjectives(x+2, x+3, x, x+1, 4 );
	var x2 = x;
	for (var j=0; j<3; j++){
		quadObjectives( x2, x2+1, x2+5, x2+4, 4);
		x2++;
	}
	quadObjectives( x+3, x, x+4, x+7, 4);
	quadObjectives( x+4, x+5, x+6, x+7, 4);
}

// how to render the torso
function torso () {
	
	instanceMatrix = mult( modelViewMatrix, translate(torsoTransX, torsoTransY, torsoTransZ) );
	instanceMatrix = mult(instanceMatrix, scale4(torsoScaleX, torsoScaleY, torsoScaleZ) );
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	
	var x = 0;
	
	quadTorso(x+2, x+3, x, x+1);
	var x2 = x;
	for (var j=0; j<3; j++){
		quadTorso( x2, x2+1, x2+5, x2+4);
		x2++;
	}
	quadTorso( x+3, x, x+4, x+7);
	quadTorso( x+4, x+5, x+6, x+7);
	
}
//------UPPER LEGS ---------
// how to render the botUpSLeg
function botUpSLeg() { 

	instanceMatrix = mult(modelViewMatrix, translate( uSLegsTransX, torsoTransY, uBLegsTransZ) );
	instanceMatrix = mult(instanceMatrix, scale4(-uLegWidth, uLegHeight, uLegDepth) );
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.drawArrays( gl.TRIANGLES, NumVertices-36, 36 );
}
// how to render the topUpSLeg
function topUpSLeg() {

	instanceMatrix = mult(modelViewMatrix, translate( uSLegsTransX, torsoTransY, uTLegsTransZ) );
	instanceMatrix = mult(instanceMatrix, scale4(-uLegWidth, uLegHeight, -uLegDepth) );
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.drawArrays( gl.TRIANGLES, NumVertices-36, 36 );
}
// how to render the botUpRLeg
function botUpRLeg() {
	
	instanceMatrix = mult(modelViewMatrix, translate( uRLegsTransX, torsoTransY, uBLegsTransZ) );
	instanceMatrix = mult(instanceMatrix, scale4(uLegWidth, uLegHeight, uLegDepth) );
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.drawArrays( gl.TRIANGLES, NumVertices-36, 36 );
}
// how to render the topUpRLeg
function topUpRLeg() {
	
	instanceMatrix = mult(modelViewMatrix, translate( uRLegsTransX, torsoTransY, uTLegsTransZ) );
	instanceMatrix = mult(instanceMatrix, scale4(uLegWidth, uLegHeight, -uLegDepth) );
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.drawArrays( gl.TRIANGLES, NumVertices-36, 36 );
}
//---- LOWER LEGS --------------
// how to render the botLowSLeg
function botLowSLeg() { 
	
	instanceMatrix = mult(modelViewMatrix, translate( lSLegsTransX, torsoTransY, lBLegsTransZ) );
	instanceMatrix = mult(instanceMatrix, scale4(-lLegWidth, -1*lLegHeight, lLegDepth) );
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.drawArrays( gl.TRIANGLES, NumVertices-36, 36 );
	
}
// how to render the topLowSLeg
function topLowSLeg() {
	
	instanceMatrix = mult(modelViewMatrix, translate( lSLegsTransX, torsoTransY, lTLegsTransZ) );
	instanceMatrix = mult(instanceMatrix, scale4(-lLegWidth, -1*lLegHeight, lLegDepth) );
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.drawArrays( gl.TRIANGLES, NumVertices-36, 36 );
	
}
// how to render the botLowRLeg
function botLowRLeg() {
	
	instanceMatrix = mult(modelViewMatrix, translate( lRLegsTransX, torsoTransY, lBLegsTransZ) );
	instanceMatrix = mult(instanceMatrix, scale4(lLegWidth, -1*lLegHeight, lLegDepth) );
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.drawArrays( gl.TRIANGLES, NumVertices-36, 36 );
	
}
// how to render the topLowRLeg
function topLowRLeg() {
	
	instanceMatrix = mult(modelViewMatrix, translate( lRLegsTransX, torsoTransY, lTLegsTransZ) );
	instanceMatrix = mult(instanceMatrix, scale4(lLegWidth, -1*lLegHeight, lLegDepth) );
	
	gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
	gl.drawArrays( gl.TRIANGLES, NumVertices-36, 36 );
	
}