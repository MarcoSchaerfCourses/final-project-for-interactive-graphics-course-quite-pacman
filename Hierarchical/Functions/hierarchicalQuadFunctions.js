//--------------------------- QUAD FUNCTIONS -----------------------------------------------------
// quad function for the maze
function quadMaze(a, b, c, d) {

	//---------------------LIGHTING UTILITIES-------------------------
	// computer the normal
	var t1 = subtract(mazeVertices[b], mazeVertices[a]);
	var t2 = subtract(mazeVertices[c], mazeVertices[b]);
	var normal = cross(t1, t2);
	normal = vec3(normal);
	
    var indices = [ a, b, c, a, c, d ];
	
	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[1]);
	texCoordsArray.push(texCoord[2]);
	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[2]);
	texCoordsArray.push(texCoord[3]);
	
    for ( var i = 0; i < indices.length; ++i ) {
        points.push( mazeVertices[indices[i]] );
		// send the normal
		normalsArray.push(normal);
        colors.push( mazeVertexColor );
    }
    	
	// telling to the shader that we need to use the texture
	usingTexture = 1.0;
	// --------------- sending texture flag 
	gl.uniform1f	(gl.getUniformLocation(program,"usingTexture"), 	usingTexture);
	// drawing 
	gl.drawArrays( gl.TRIANGLES, NumVertices, 6 );
    NumVertices += 6;
    
}

// quad function for the objectives
function quadObjectives(a, b, c, d, index) {
	
	// telling to the shader to stop using the texture
	usingTexture = 0.0;
	// --------------- sending texture flag 
	gl.uniform1f	(gl.getUniformLocation(program,"usingTexture"), 	usingTexture);	
	//---------------------LIGHTING UTILITIES----------------------------
	var normal;
	// compute the normal----------------------------------------
	var t1 = subtract(objective1Vertices[b], objective1Vertices[a]);
	var t2 = subtract(objective1Vertices[c], objective1Vertices[b]);
	normal = cross(t1, t2);
	normal = vec3(normal);

	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[1]);
	texCoordsArray.push(texCoord[2]);
	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[2]);
	texCoordsArray.push(texCoord[3]);
		
    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
    	// send points and colors
    	if ( index == 1 ) {
        	points.push( objective1Vertices[indices[i]] );
			// send the normal
			normalsArray.push(normal);
			colors.push( objective1VertexColor );
        }
        if ( index == 2 ) {
        	points.push( objective2Vertices[indices[i]] );
			// send the normal
			normalsArray.push(normal);
			colors.push( objective2VertexColor );			
        }
        if ( index == 3 ) {
        	points.push( objective3Vertices[indices[i]] );
			// send the normal
			normalsArray.push(normal);
			colors.push( objective3VertexColor );
        }
        if ( index == 4 ) {
        	points.push( objective4Vertices[indices[i]] );
			// send the normal
			normalsArray.push(normal);
			colors.push( objective4VertexColor );
        }
    }
    
	gl.drawArrays( gl.TRIANGLES, NumVertices, 6 );
    NumVertices += 6;
    
}
// quad function for the torso
function quadTorso(a, b, c, d) {

	//---------------------LIGHTING UTILITIES-------------------------
	// computer the normal
	var t1 = subtract(torsoVertices[b], torsoVertices[a]);
	var t2 = subtract(torsoVertices[c], torsoVertices[b]);
	var normal = cross(t1, t2);
	normal = vec3(normal);
	//------------------------------------------------------------------
	
	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[1]);
	texCoordsArray.push(texCoord[2]);
	texCoordsArray.push(texCoord[0]);
	texCoordsArray.push(texCoord[2]);
	texCoordsArray.push(texCoord[3]);
	
	var indices = [ a, b, c, a, c, d ];
	for ( var i = 0; i < indices.length; ++i ) {
		points.push( torsoVertices[indices[i]] );
		// send the normal
		normalsArray.push(normal);
		colors.push( torsoVertexColor );
	}
	
	gl.drawArrays( gl.TRIANGLES, NumVertices, 6 );
	NumVertices += 6;
	
}