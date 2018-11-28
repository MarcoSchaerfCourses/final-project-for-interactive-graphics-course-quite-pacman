// ------------------------------------------ CREATENODE FUNCTION ------------------------------------------
// how to create a node in the structure
function createNode(transform, render, sibling, child){
    var node = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
    }
    return node;
}

// ------------------------------------------ INITNODES FUNCTION ------------------------------------------
// how to create the structure, iterating on each node that has to be created
function initNodes(Id) {
	
    var m = mat4();

    switch(Id) {
		
		case sceneId:
			//rotations
			// x
			m = mult( m, rotate(nodesAngle[sceneId], 	1, 0, 0 ) );
			// y
			m = mult( m, rotate(nodesAngle[sceneId+1],	0, 0, 1 ) );
			// z
			m = mult( m, rotate(nodesAngle[sceneId+2], 	0, 1, 0 ) );
			figure[sceneId] = createNode( m, scene, null, mazeId );
			break;
			
		case mazeId:
			// rotations
			// x
			m = mult( m, rotate(nodesAngle[mazeId], 	1, 0, 0 ) );
			// y
			m = mult( m, rotate(nodesAngle[mazeId+1], 	0, 0, 1 ) );
			// z
			m = mult( m, rotate(nodesAngle[mazeId+2], 	0, 1, 0 ) );
			figure[mazeId] = createNode( m, maze, objective1Id, null );
			break;
		
		case objective1Id:
		
			if ( objective1Captured == 1 )
				m = mult ( m, translate( 0, -20, 0 ) );
			else {
				// rotations
				m = mult ( m, translate(  4.5, 1.1, -4.5 ) );
				// x
				m = mult( m, rotate(nodesAngle[objective1Id], 	1, 0, 0 ) );
				// y
				m = mult( m, rotate(nodesAngle[objective1Id+1], 0, 0, 1 ) );
				// z
				m = mult( m, rotate(nodesAngle[objective1Id+2], 0, 1, 0 ) );
				m = mult ( m, translate(  -4.5, -1.1, 4.5 ) );
			}	
			figure[objective1Id] = createNode( m, objective1, objective2Id, null );
			break;
		
		case objective2Id:
		
			if ( objective2Captured == 1 )
				m = mult ( m, translate( 0, -20, 0 ) );
			else {
				// rotations
				m = mult ( m, translate(  4.5, 1.1,  4.5 ) );
				// x
				m = mult( m, rotate(nodesAngle[objective2Id], 	1, 0, 0 ) );
				// y
				m = mult( m, rotate(nodesAngle[objective2Id+1], 0, 0, 1 ) );
				// z
				m = mult( m, rotate(nodesAngle[objective2Id+2], 0, 1, 0 ) );
				m = mult ( m, translate(  -4.5, -1.1,-4.5 ) );
			}	
			figure[objective2Id] = createNode( m, objective2, objective3Id, null );
			break;	
			
		case objective3Id:
			if ( objective3Captured == 1 )
				m = mult ( m, translate( 0, -20, 0 ) );
			else {
				// rotations
				m = mult ( m, translate(  -4.5, 1.1, -4.5 ) );
				// x
				m = mult( m, rotate(nodesAngle[objective3Id], 	1, 0, 0 ) );
				// y
				m = mult( m, rotate(nodesAngle[objective3Id+1], 0, 0, 1 ) );
				// z
				m = mult( m, rotate(nodesAngle[objective3Id+2], 0, 1, 0 ) );
				m = mult ( m, translate(  4.5, -1.1, 4.5 ) );
			}		
			figure[objective3Id] = createNode( m, objective3, objective4Id, null );
			break;	
			
		case objective4Id:
				
			if ( objective4Captured == 1 )
				m = mult ( m, translate( 0, -20, 0 ) );
			else {
				// rotations
				m = mult ( m, translate(  -4.5, 1.1, 2.5 ) );
				// x
				m = mult( m, rotate(nodesAngle[objective4Id], 	1, 0, 0 ) );
				// y
				m = mult( m, rotate(nodesAngle[objective4Id+1], 0, 0, 1 ) );
				// z
				m = mult( m, rotate(nodesAngle[objective4Id+2], 0, 1, 0 ) );
				m = mult ( m, translate(  4.5, -1.1, -2.5 ) );
			}	
			figure[objective4Id] = createNode( m, objective4, torsoId, null );
			break;
		
		case torsoId:
			// translation
			m = mult ( m, translate( torsoX, torsoY, torsoZ ) );
			figure[torsoId] = createNode( m, torso, null, botUpSLegId );
			break;
		
		case botUpSLegId:
			// rotations
			m = mult ( m, translate( uSLegsTransX-(uLegWidth/2) , torsoTransY+(uLegHeight/2), uBLegsTransZ ) );
			m = mult ( m, rotate( nodesAngle[botUpSLegId], 1, 0, 0 ) );
			m = mult ( m, rotate( nodesAngle[botUpSLegId+1], 0, 0, 1 ) );
			m = mult ( m, rotate( nodesAngle[botUpSLegId+2], 0, 1, 0 ) );
			m = mult ( m, translate( -1*(uSLegsTransX-(uLegWidth/2)) , -1*(torsoTransY+(uLegHeight/2)), -1*uBLegsTransZ ) );
			figure[botUpSLegId] = createNode ( m, botUpSLeg, botUpRLegId, botLowSLegId );
			break;
			
		case botUpRLegId:
			// rotations
			m = mult ( m, translate( uRLegsTransX+(uLegWidth/2) , torsoTransY+(uLegHeight/2), uBLegsTransZ ) );
			m = mult ( m, rotate( nodesAngle[botUpRLegId], 1, 0, 0 ) );
			m = mult ( m, rotate( nodesAngle[botUpRLegId+1], 0, 0, 1 ) );
			m = mult ( m, rotate( nodesAngle[botUpRLegId+2], 0, 1, 0 ) );
			m = mult ( m, translate( -1*(torsoTransX+(uLegWidth/2)) , -1*(torsoTransY+(uLegHeight/2)), -1*uBLegsTransZ ) );
			figure[botUpRLegId] = createNode ( m, botUpRLeg, topUpSLegId, botLowRLegId );
			break;
			
		case topUpSLegId:
			// rotations
			m = mult ( m, translate( uSLegsTransX-(uLegWidth/2) , torsoTransY+(uLegHeight/2), uTLegsTransZ ) );
			m = mult ( m, rotate( nodesAngle[topUpSLegId], 1, 0, 0 ) );
			m = mult ( m, rotate( nodesAngle[topUpSLegId+1], 0, 0, 1 ) );
			m = mult ( m, rotate( nodesAngle[topUpSLegId+2], 0, 1, 0 ) );
			m = mult ( m, translate( -1*(uSLegsTransX-(uLegWidth/2)) , -1*(torsoTransY+(uLegHeight/2)), -1*uTLegsTransZ ) ); 		
			figure[topUpSLegId] = createNode ( m, topUpSLeg, topUpRLegId, topLowSLegId );
			break;
		
		case topUpRLegId:
			// rotations
			m = mult ( m, translate( uRLegsTransX+(uLegWidth/2) , torsoTransY+(uLegHeight/2), uTLegsTransZ ) );
			m = mult ( m, rotate( nodesAngle[topUpRLegId], 1, 0, 0 ) );
			m = mult ( m, rotate( nodesAngle[topUpRLegId+1], 0, 0, 1 ) );
			m = mult ( m, rotate( nodesAngle[topUpRLegId+2], 0, 1, 0 ) );
			m = mult ( m, translate( -1*(torsoTransX+(uLegWidth/2)) , -1*(torsoTransY+(uLegHeight/2)), -1*uTLegsTransZ ) ); 
			figure[topUpRLegId] = createNode ( m, topUpRLeg, null, topLowRLegId );
			break;
		
		case botLowSLegId:
			// rotations
			m = mult ( m, translate( lSLegsTransX-(lLegWidth/2) , torsoTransY , lBLegsTransZ+(lLegDepth/2) ) );
			m = mult ( m, rotate( nodesAngle[botLowSLegId], 1, 0, 0 ) );
			m = mult ( m, rotate( nodesAngle[botLowSLegId+1], 0, 0, 1 ) );
			m = mult ( m, rotate( nodesAngle[botLowSLegId+2], 0, 1, 0 ) );
			m = mult ( m, translate( -1*(lSLegsTransX-(lLegWidth/2)) , -1*torsoTransY, -1*(lBLegsTransZ+(lLegDepth/2 )) ) );
			figure[botLowSLegId] = createNode ( m, botLowSLeg, null, null );
			break;
		
		case botLowRLegId:
			// rotations
			m = mult ( m, translate( lRLegsTransX+(lLegWidth/2) , torsoTransY , lBLegsTransZ+(lLegDepth/2) ) );
			m = mult ( m, rotate( nodesAngle[botLowRLegId], 1, 0, 0 ) );
			m = mult ( m, rotate( nodesAngle[botLowRLegId+1], 0, 0, 1 ) );
			m = mult ( m, rotate( nodesAngle[botLowRLegId+2], 0, 1, 0 ) );
			m = mult ( m, translate( -1*(lRLegsTransX+(lLegWidth/2)) , -1*torsoTransY, -1*(lBLegsTransZ+(lLegDepth/2 )) ) );
			figure[botLowRLegId] = createNode ( m, botLowRLeg, null, null );
			break;
			
		case topLowSLegId:
			// rotations
			m = mult ( m, translate( lSLegsTransX-(lLegWidth/2) , torsoTransY , lTLegsTransZ+(lLegDepth/2) ) );
			m = mult ( m, rotate( nodesAngle[topLowSLegId], 1, 0, 0 ) );
			m = mult ( m, rotate( nodesAngle[topLowSLegId+1], 0, 0, 1 ) );
			m = mult ( m, rotate( nodesAngle[topLowSLegId+2], 0, 1, 0 ) );
			m = mult ( m, translate( -1*(lSLegsTransX-(lLegWidth/2)) , -1*torsoTransY, -1*(lTLegsTransZ+(lLegDepth/2 )) ) );
			figure[topLowSLegId] = createNode ( m, topLowSLeg, null, null );
			break;
			
		case topLowRLegId:
			// rotations
			m = mult ( m, translate( lRLegsTransX+(lLegWidth/2) , torsoTransY , lTLegsTransZ+(lLegDepth/2) ) );
			m = mult ( m, rotate( nodesAngle[topLowRLegId], 1, 0, 0 ) );
			m = mult ( m, rotate( nodesAngle[topLowRLegId+1], 0, 0, 1 ) );
			m = mult ( m, rotate( nodesAngle[topLowRLegId+2], 0, 1, 0 ) );
			m = mult ( m, translate( -1*(lRLegsTransX+(lLegWidth/2)) , -1*torsoTransY, -1*(lTLegsTransZ+(lLegDepth/2 )) ) );
			figure[topLowRLegId] = createNode ( m, topLowRLeg, null, null );
			break;
    }
}
// ------------------------------------------ TRAVERSE FUNCTION ------------------------------------------
function traverse(Id) {	
	if(Id == null){
		return;
	}
	stack.push(modelViewMatrix);
	modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
	figure[Id].render();
	if(figure[Id].child != null) traverse(figure[Id].child);
	modelViewMatrix = stack.pop();
	if(figure[Id].sibling != null) traverse(figure[Id].sibling);
}
