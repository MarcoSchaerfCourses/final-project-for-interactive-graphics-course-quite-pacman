//---------------------------------------------------------------

// ----------------------------------- CHECKCOLLISION FUNCTION ------------------------------------------
function checkCollision( charX, charZ, direction){
	// function used to check for a collision before moving the character.
	// returns 1 if there will be the collision, 0 if there will be not
	if ( direction == 0 ){
		// moving up
		if ( charZ > -5 && isAWall( charX+0.1, charZ ) == 0 )
			return 0;
		else
			return 1;
	}
	else if ( direction == 1 ){
		// moving right
		if ( charX > -5 	&& isAWall( charX, charZ+0.1 ) == 0 )
			return 0;
		else
			return 1;
	}
	else if ( direction == 2 ){
		// moving down
		if ( charZ < 4	&& isAWall( charX+0.1, charZ+1 ) == 0 )
			return 0;
		else
			return 1;
	}
	else if ( direction == 3 ){
		// moving left
		if ( charX < 4	&& isAWall( charX+1, charZ+0.1 ) == 0 )
			return 0;
		else
			return 1;
	}
	else{
		// wrong direction 
		return -1;
	}
}
// -------------------------- ROTATION FUNCTION -------------------------------
function rotateCharacter(){
	switch(rotationDirection){
		case 0:
			// -------------------------- anti-clockwise rotation -------------------------------
			// --------------- use the animation for walking to the left			
			// if we are in the first 10 frames
			if ( rotationCounter < 10 ){
				// legs moving forward
				// top S
				nodesAngle[topUpSLegId] += 5;
				nodesAngle[topUpSLegId+2] -= 5;
				nodesAngle[topLowSLegId+1] += 5;
				// bot R
				nodesAngle[botUpRLegId] -= 5;
				nodesAngle[botUpRLegId+2] += 5;
				nodesAngle[botLowRLegId+1] += 5;
				// legs moving backward
				// top R
				nodesAngle[topUpRLegId+2] += 5
				nodesAngle[topLowRLegId+1] -= 5;
				// bot S
				nodesAngle[botUpSLegId+2] -= 5
				nodesAngle[botLowSLegId+1] -= 5;
			}
			// if we are in the last 10 frames of the animation
			else {
				// legs moving backward
				// top S
				nodesAngle[topUpSLegId] -= 5;
				nodesAngle[topUpSLegId+2] += 5;
				nodesAngle[topLowSLegId+1] -= 5;
				// bot R
				nodesAngle[botUpRLegId] += 5;
				nodesAngle[botUpRLegId+2] -= 5;
				nodesAngle[botLowRLegId+1] -= 5;
				// legs moving forward
				// top R
				nodesAngle[topUpRLegId+2] -= 5
				nodesAngle[topLowRLegId+1] += 5;
				// bot S
				nodesAngle[botUpSLegId+2] += 5
				nodesAngle[botLowSLegId+1] += 5;
			}
			// ---------------------------------- rotate the torso
			nodesAngle[torsoId+1] -= 4.5;
			// -------------------------- update the cameraMode
			switch(cameraPosition){
				case 0:
					factorX -= 0.025;
					factorZ -= 0.025;
					if(rotationCounter == 19){
						cameraPosition = 3;
					}
					break;
				case 1:
					factorX += -0.025;
					factorZ += 0.025;
					if(rotationCounter == 19){
						cameraPosition = 0;
					}
					break;
				case 2:
					factorX += 0.025;
					factorZ += 0.025;
					if(rotationCounter == 19){
						cameraPosition = 1;
					}
					break;
				case 3:
					factorX += 0.025;
					factorZ += -0.025;
					if(rotationCounter == 19){
						cameraPosition = 2;
					}
					break;
			}
			break;
		case 1:
			// --------------------------      clockwise rotation -------------------------------
			// --------------- use the animation for walking to the right					
			// if we are in the first 10 frames
			if ( rotationCounter < 10 ){
				// legs moving forward
				// top R
				nodesAngle[topUpRLegId] += 5;
				nodesAngle[topUpRLegId+2] += 5;
				nodesAngle[topLowRLegId+1] -= 5;
				// bot S
				nodesAngle[botUpSLegId] -= 5;
				nodesAngle[botUpSLegId+2] -= 5;
				nodesAngle[botLowSLegId+1] -= 5;
				// legs moving backward
				// top S
				nodesAngle[topUpSLegId+2] -= 5;
				nodesAngle[topLowSLegId+1] += 5;
				// bot R
				nodesAngle[botUpRLegId+2] += 5;
				nodesAngle[botLowRLegId+1] += 5;
			}
			// if we are in the last 10 frames of the animation
			else {
				// legs moving backward
				// top R
				nodesAngle[topUpRLegId] -= 5;
				nodesAngle[topUpRLegId+2] -= 5;
				nodesAngle[topLowRLegId+1] += 5;
				// bot S
				nodesAngle[botUpSLegId] += 5;
				nodesAngle[botUpSLegId+2] += 5;
				nodesAngle[botLowSLegId+1] += 5;	
				// legs moving forward
				// top S
				nodesAngle[topUpSLegId+2] += 5;
				nodesAngle[topLowSLegId+1] -= 5;
				// bot R
				nodesAngle[botUpRLegId+2] -= 5;
				nodesAngle[botLowRLegId+1] -= 5;
			}
			// -------------------------- rotate the torso
			nodesAngle[torsoId+1] += 4.5;
			// -------------------------- update the cameraMode
			switch(cameraPosition){
				case 0:
					factorX += 0.025;
					factorZ += -0.025;
					if(rotationCounter == 19){
						cameraPosition = 1;
					}
					break;
				case 1:
					factorX += -0.025;
					factorZ += -0.025;
					if(rotationCounter == 19){
						cameraPosition = 2;
					}
					break;
				case 2:
					factorX += -0.025;
					factorZ += 0.025;
					if(rotationCounter == 19){
						cameraPosition = 3;
					}
					break;
				case 3:
					factorX += 0.025;
					factorZ += 0.025;
					if(rotationCounter == 19){
						cameraPosition = 0;
					}
					break;
			}
			break;
	}
}
// -------------------------- MOVEMENT FUNCTIONS ------------------------------
// -------------------------- top-down movement 
function topDownMove(direction){
	switch (direction){
		case 0:
			// ------------------- moving up-------------------------
			// translate the whole character
			torsoZ -= 0.05;
			// MOVE THE LIGHT SOURCE
			lightPosition[1] -= 0.05;
			if ( lightPosition[2] != 0.9 )
				lightPosition[2] -= 0.015;
			// if we are in the first 10 frames
			if ( movementCounter < 10 ){
				// legs moving forward
				// top R
				nodesAngle[topUpRLegId+2] += 5;
				nodesAngle[topLowRLegId+1] -= 5;
				// bot S
				nodesAngle[botUpSLegId] += 5;
				nodesAngle[botUpSLegId+2] += 5;
				// legs moving backward
				// top S
				nodesAngle[topUpSLegId] += 5;
				nodesAngle[topLowSLegId] += 2;
				// bot R
				nodesAngle[botUpRLegId] += 5;
				nodesAngle[botLowRLegId] -=8;
			}
			// if we are in the last 10 frames of the animation
			else {
				// legs moving backward
				// top R
				nodesAngle[topUpRLegId+2] -= 5;
				nodesAngle[topLowRLegId+1] += 5;
				// bot S
				nodesAngle[botUpSLegId] -= 5;
				nodesAngle[botUpSLegId+2] -= 5;
				// legs moving forward
				// top S
				nodesAngle[topUpSLegId] -= 5;
				nodesAngle[topLowSLegId] -= 2;
				// bot R
				nodesAngle[botUpRLegId] -= 5;
				nodesAngle[botLowRLegId] += 8;
			}
			break;
		case 1:
			// ---------------------------- moving right -------------------------
			// translate the whole character
			torsoX -= 0.05;
			// MOVE THE LIGHT SOURCE
			lightPosition[0] -= 0.05;						
			// if we are in the first 10 frames
			if ( movementCounter < 10 ){
				// legs moving forward
				// top R
				nodesAngle[topUpRLegId] += 5;
				nodesAngle[topUpRLegId+2] += 5;
				nodesAngle[topLowRLegId+1] -= 5;
				// bot S
				nodesAngle[botUpSLegId] -= 5;
				nodesAngle[botUpSLegId+2] -= 5;
				nodesAngle[botLowSLegId+1] -= 5;
				// legs moving backward
				// top S
			nodesAngle[topUpSLegId+2] -= 5;
				nodesAngle[topLowSLegId+1] += 5;
				// bot R
				nodesAngle[botUpRLegId+2] += 5;
				nodesAngle[botLowRLegId+1] += 5;
			}
			// if we are in the last 10 frames of the animation
			else {
				// legs moving backward
				// top R
				nodesAngle[topUpRLegId] -= 5;
				nodesAngle[topUpRLegId+2] -= 5;
				nodesAngle[topLowRLegId+1] += 5;
				// bot S
				nodesAngle[botUpSLegId] += 5;
				nodesAngle[botUpSLegId+2] += 5;
				nodesAngle[botLowSLegId+1] += 5;	
				// legs moving forward
				// top S
				nodesAngle[topUpSLegId+2] += 5;
				nodesAngle[topLowSLegId+1] -= 5;
				// bot R
				nodesAngle[botUpRLegId+2] -= 5;
				nodesAngle[botLowRLegId+1] -= 5;
			}
			break;
		case 2:
			// ------------------------------- moving down ------------------------
			// translate the whole character
			torsoZ += 0.05;
			// MOVE THE LIGHT SOURCE
			lightPosition[1] += 0.05;
			lightPosition[2] += 0.015;
			// if we are in the first 10 frames
			if ( movementCounter < 10 ){
				// top S ( like bot S UP )
				nodesAngle[topUpSLegId] += 5;
				nodesAngle[topUpSLegId+2] -= 5;
				nodesAngle[topLowSLegId+1] += 5;
				// bot R ( like top R UP ) 
				nodesAngle[botUpRLegId] -= 5;
				nodesAngle[botUpRLegId+2] -= 5;
				nodesAngle[botLowRLegId+1] -= 5;
				// top R ( like bot R UP )
				nodesAngle[topUpRLegId] -= 5;
				nodesAngle[topLowRLegId] +=8;
				// bot S ( like top S UP )
				nodesAngle[botUpSLegId] -= 5;
				nodesAngle[botLowSLegId] -= 2;	
			}
			// if we are in the last 10 frames of the animation
			else {
				// top S
				nodesAngle[topUpSLegId] -= 5;
				nodesAngle[topUpSLegId+2] += 5;
				nodesAngle[topLowSLegId+1] -= 5;
				// bot S
				nodesAngle[botUpSLegId] += 5;
				nodesAngle[botLowSLegId] += 2;
				// top R
				nodesAngle[topUpRLegId] += 5;
				nodesAngle[topLowRLegId] -=8;
				// bot R 
				nodesAngle[botUpRLegId] += 5;
				nodesAngle[botUpRLegId+2] += 5;
				nodesAngle[botLowRLegId+1] += 5;
			}
			break;
		case 3:
			// ------------------------------- moving left ----------------------------------
			// translate the whole character
			torsoX += 0.05;
			// MOVE THE LIGHT SOURCE
			lightPosition[0] += 0.05;				
			// if we are in the first 10 frames
			if ( movementCounter < 10 ){
				// legs moving forward
				// top S
				nodesAngle[topUpSLegId] += 5;
				nodesAngle[topUpSLegId+2] -= 5;
				nodesAngle[topLowSLegId+1] += 5;
				// bot R
				nodesAngle[botUpRLegId] -= 5;
				nodesAngle[botUpRLegId+2] += 5;
				nodesAngle[botLowRLegId+1] += 5;
				// legs moving backward
				// top R
				nodesAngle[topUpRLegId+2] += 5
				nodesAngle[topLowRLegId+1] -= 5;
				// bot S
				nodesAngle[botUpSLegId+2] -= 5
				nodesAngle[botLowSLegId+1] -= 5;
			}
			// if we are in the last 10 frames of the animation
			else {
				// legs moving backward
				// top S
				nodesAngle[topUpSLegId] -= 5;
				nodesAngle[topUpSLegId+2] += 5;
				nodesAngle[topLowSLegId+1] -= 5;
				// bot R
				nodesAngle[botUpRLegId] += 5;
				nodesAngle[botUpRLegId+2] -= 5;
				nodesAngle[botLowRLegId+1] -= 5;
				// legs moving forward
				// top R
				nodesAngle[topUpRLegId+2] -= 5
				nodesAngle[topLowRLegId+1] += 5;
				// bot S
				nodesAngle[botUpSLegId+2] += 5
				nodesAngle[botLowSLegId+1] += 5;
			}
			break;
	
	}
}
// -------------------------- first-person movement
function firstPersonMove(direction){
	console.log("moving in first person with direction:"+direction);
	// always use the animation for walking right, moving the torso in the right direction
	// -------------------------- animation
	// if we are in the first 10 frames
	if ( movementCounter < 10 ){
		// legs moving forward
		// top R
		nodesAngle[topUpRLegId] += 5;
		nodesAngle[topUpRLegId+2] += 5;
		nodesAngle[topLowRLegId+1] -= 5;
		// bot S
		nodesAngle[botUpSLegId] -= 5;
		nodesAngle[botUpSLegId+2] -= 5;
		nodesAngle[botLowSLegId+1] -= 5;
		// legs moving backward
		// top S
		nodesAngle[topUpSLegId+2] -= 5;
		nodesAngle[topLowSLegId+1] += 5;
		// bot R
		nodesAngle[botUpRLegId+2] += 5;
		nodesAngle[botLowRLegId+1] += 5;
	}                                                                                                                                                                                                                                                                          
	// if we are in the last 10 frames of the animation
	else {
		// legs moving backward
		// top R
		nodesAngle[topUpRLegId] -= 5;
		nodesAngle[topUpRLegId+2] -= 5;
		nodesAngle[topLowRLegId+1] += 5;
		// bot S
		nodesAngle[botUpSLegId] += 5;
		nodesAngle[botUpSLegId+2] += 5;
		nodesAngle[botLowSLegId+1] += 5;	
		// legs moving forward
		// top S
		nodesAngle[topUpSLegId+2] += 5;
		nodesAngle[topLowSLegId+1] -= 5;
		// bot R
		nodesAngle[botUpRLegId+2] -= 5;
		nodesAngle[botLowRLegId+1] -= 5;
	}
	// ---------------- translate the torso and the light in the right direction
	switch(direction){
		case 0:
			// ------------------- moving up
			// translate the whole character
			torsoZ -= 0.05;
			// MOVE THE LIGHT SOURCE
			lightPosition[2] -= 0.05;
			break;
		case 1:
			// ---------------- moving right
			// translate the whole character
			torsoX -= 0.05;
			// MOVE THE LIGHT SOURCE
			lightPosition[0] -= 0.05;	
			break;
		case 2:
			// ----------------- moving down
			// translate the whole character
			torsoZ += 0.05;
			// MOVE THE LIGHT SOURCE
			lightPosition[2] += 0.05;
			break;
		case 3:
			// ----------------- moving left
			// translate the whole character
			torsoX += 0.05;
			// MOVE THE LIGHT SOURCE
			lightPosition[0] += 0.05;	
			break;
	}
}
// ------------------------------------------------- UPDATE FUNCTION -------------------------------------
function update() {
		
		// animate objective 1
		nodesAngle[objective1Id] 	+= 0.5;
	    nodesAngle[objective1Id+1] 	+= 0.5;
	    nodesAngle[objective1Id+2] 	+= 0.5;
	    // animate objective 2
		nodesAngle[objective2Id] 	+= 0.5;
	    nodesAngle[objective2Id+1] 	+= 0.5;
	    nodesAngle[objective2Id+2] 	+= 0.5;
	    // animate objective 3
		nodesAngle[objective3Id] 	+= 0.5;
	    nodesAngle[objective3Id+1] 	+= 0.5;
	    nodesAngle[objective3Id+2] 	+= 0.5;
	    // animate objective 4
		nodesAngle[objective4Id] 	+= 0.5;
	    nodesAngle[objective4Id+1] 	+= 0.5;
	    nodesAngle[objective4Id+2] 	+= 0.5;
	    // avoid overflow for objective 1
		if ( nodesAngle[objective1Id] 	>= 360 ) 		nodesAngle[objective1Id] 	= 0;
		if ( nodesAngle[objective1Id+1] >= 360 ) 		nodesAngle[objective1Id+1]	= 0;
		if ( nodesAngle[objective1Id+2] >= 360 ) 		nodesAngle[objective1Id+2]	= 0;
	    // avoid overflow for objective 2
		if ( nodesAngle[objective2Id] 	>= 360 ) 		nodesAngle[objective2Id] 	= 0;
		if ( nodesAngle[objective2Id+1] >= 360 ) 		nodesAngle[objective2Id+1]	= 0;
		if ( nodesAngle[objective2Id+2] >= 360 ) 		nodesAngle[objective2Id+2]	= 0;
		// avoid overflow for objective 3
		if ( nodesAngle[objective3Id] 	>= 360 ) 		nodesAngle[objective3Id] 	= 0;
		if ( nodesAngle[objective3Id+1] >= 360 ) 		nodesAngle[objective3Id+1]	= 0;
		if ( nodesAngle[objective3Id+2] >= 360 ) 		nodesAngle[objective3Id+2]	= 0;
		// avoid overflow for objective 4
		if ( nodesAngle[objective4Id] 	>= 360 ) 		nodesAngle[objective4Id] 	= 0;
		if ( nodesAngle[objective4Id+1] >= 360 ) 		nodesAngle[objective4Id+1]	= 0;
		if ( nodesAngle[objective4Id+2] >= 360 ) 		nodesAngle[objective4Id+2]	= 0;
		
		// --------------------------- ROTATE THE CHARACTER -------------------------
		if ( characterRotation == 1){
			rotateCharacter();
			rotationCounter++;
			if ( rotationCounter == 20 ){
				rotationCounter = 0;
				characterRotation = 0;
				// update direction
				if ( rotationDirection == 0 ){
					// we rotated left
					direction--;
					// check correctness of the new direction
					if ( direction < 0 )
						direction = 3;
				}
				else{
					// we rotated right
					direction++;
					// check correctness of the new direction
					if ( direction > 3 )
						direction = 0;
				}				
			}
		}
		// --------------------------- MOVE THE CHARACTER ---------------------------
		if ( characterMovement == 1 ){			
			// if there will be no collision in the current movement direction, move the character
			if ( checkCollision(torsoX, torsoZ, direction) == 0 ){
				if (cameraMode > 0)
					topDownMove(direction);
				else
					firstPersonMove(direction);
			}
			// update the movement fram counter and the maze texuture
			movementCounter++;
			updateTexture();
			// after 20 movement frames reset movement parameters 
			if ( movementCounter == 20 ){
				characterMovement = 0;
				movementCounter = 0;
				torsoX = Math.round(torsoX);
				torsoZ = Math.round(torsoZ);
				console.log("torsoX:" + torsoX + ", torsoZ:" + torsoZ );
				
				// ------------------------------------------------------  check if the user has collected an objective
				if ( torsoX == 4 && torsoZ == -5 && objective1Captured == 0 ){
					objective1Captured = 1;
					objectivesCaptured++;
					// update the text in the html
					document.getElementById("objectivesDiv").innerHTML = "Objectives collected: " + objectivesCaptured;
					document.getElementById("objectivesDiv").style.fontSize = "20px";
				}
				if ( torsoX == 4 && torsoZ ==  4 && objective2Captured == 0 ){
					objective2Captured = 1;
					objectivesCaptured++;
					// update the text in the html
					document.getElementById("objectivesDiv").innerHTML = "Objectives collected: " + objectivesCaptured;
					document.getElementById("objectivesDiv").style.fontSize = "20px";
				}
				if ( torsoX == -5 && torsoZ == -5 && torsoZ <= -4 && objective3Captured == 0 ){
					objective3Captured = 1;
					objectivesCaptured++;
					// update the text in the html
					document.getElementById("objectivesDiv").innerHTML = "Objectives collected: " + objectivesCaptured;
					document.getElementById("objectivesDiv").style.fontSize = "20px";
				}
				if ( torsoX == -5 && torsoZ == 2 && 3 >= torsoZ && torsoZ <= 4 && objective4Captured == 0 ){
					objective4Captured = 1;
					objectivesCaptured++;
					// update the text in the html
					document.getElementById("objectivesDiv").innerHTML = "Objectives collected: " + objectivesCaptured;
					document.getElementById("objectivesDiv").style.fontSize = "20px";
				}
			}
		}
		
		// update torso
		initNodes(torsoId);
		// update legs
		initNodes(topUpRLegId);
		initNodes(botUpSLegId);
		initNodes(topUpSLegId);
		initNodes(botUpRLegId);
		initNodes(botLowSLegId);
		initNodes(botLowRLegId);
		initNodes(topLowRLegId);
		initNodes(topLowSLegId);
		// update objectives
		initNodes(objective1Id);
		initNodes(objective2Id);
		initNodes(objective3Id);
		initNodes(objective4Id);
		// update light position
		gl.uniform4fv	(gl.getUniformLocation(program,"lightPosition"), 	flatten(lightPosition));
}