//---------------------------------------------------------------
//animations
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
		
		// --------------------------- MOVE THE CHARACTER ---------------------------
		if ( characterMovement == 1 ){
			// ----------------------------------- MOVING UP --------------------------------------------
			// check direction UP || check for external wall || check for walls
			if ( movementDirection == 0 && torsoZ > -5	&& isAWall( torsoX+0.1, torsoZ ) == 0 ) {
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
			}
			// ----------------------------------- MOVING DOWN --------------------------------------------
			// check direction DOWN || check for external wall || check for walls
			if ( movementDirection == 1 && torsoZ < 4	&& isAWall( torsoX+0.1, torsoZ+1 ) == 0 ) {
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
			}
			// ----------------------------------- MOVING LEFT --------------------------------------------
			// check direction LEFT || check for external wall || check for walls
			if ( movementDirection == 2 && torsoX < 4	&& isAWall( torsoX+1, torsoZ+0.1 ) == 0 ) {
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
			}
			// ----------------------------------- MOVING RIGHT --------------------------------------------
			// check direction RIGHT || check for external wall || check for walls
			if ( movementDirection == 3 && torsoX > -5 	&& isAWall( torsoX, torsoZ+0.1 ) == 0 ){
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
			}
			
			movementCounter += 1;
			updateTexture();
			
			if ( movementCounter == 20 ){
				characterMovement = 0;
				movementCounter = 0;
				torsoX = Math.round(torsoX);
				torsoZ = Math.round(torsoZ);
				console.log("torsoX:" + torsoX + ", torsoZ:" + torsoZ );
				
				// check if the user has collected an objective
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