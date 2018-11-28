// ------------------------------------------ COMPUTETEXTURE FUNCTION ------------------------------------------
// function to compute the texture
function computeTexture(){
	for(  var  i = 0;  i < texSize ;  i++ ){
		for(  var  j = 0;  j <texSize ;  j++ ){
			image[4*i*texSize+4*j ]  = red;//(256*256*red) + (256*green) + blue;
			image[4*i*texSize+4*j+1] = green;//(256*256*red) + (256*green) + blue;
			image[4*i*texSize+4*j+2] = blue;//(256*256*red) + (256*green) + blue;
			image[4*i*texSize+4*j+3] = 255;//(256*256*red) + (256*green) + blue;
		}
	}
	configureTexture(image);
}

//------------------------------------------ MAPPING DISTANCES TO COLOR INTENSITY ------------------------------------------
//function to map custom distances from objectives to rgb components
function mapDistance( positionX, positionZ, objective ){
	var distanceX = 0;
	var distanceZ = 0;
	
	var distance = 0;
	var maxDistance = 1;
	
	if ( objective == 1 ){
		distanceX 		= positionX - objective1X; 	
		if (distanceX < 0 )
			distanceX 	= distanceX * (-1);
		distanceZ 		= positionZ - objective1Z;
		if (distanceZ < 0 )
			distanceZ 	= distanceZ * (-1);
		distance		= distanceX + distanceZ;
		maxDistance 	= maxDistance1;
	}
	else if ( objective == 2 ){
		distanceX 		= positionX - objective2X; 	
		if (distanceX < 0 )
			distanceX 	= distanceX * (-1);
		distanceZ 		= positionZ - objective2Z;
		if (distanceZ < 0 )
			distanceZ 	= distanceZ * (-1);
		distance 		= distanceX + distanceZ;
		maxDistance 	= maxDistance2;
	}
	else if ( objective == 3 ){
		distanceX 		= positionX - objective3X; 	
		if (distanceX < 0 )
			distanceX 	= distanceX * (-1);
		distanceZ 		= positionZ - objective3Z;
		if (distanceZ < 0 )
			distanceZ 	= distanceZ * (-1);
		distance 		= distanceX + distanceZ;
		maxDistance 	= maxDistance3;		
	}
	else {
		distanceX 		= positionX - objective4X; 	
		if (distanceX < 0 )
			distanceX 	= distanceX * (-1);
		distanceZ 		= positionZ - objective4Z;
		if (distanceZ < 0 )
			distanceZ 	= distanceZ * (-1);
		distance 		= distanceX + distanceZ;
		maxDistance 	= maxDistance4;		
	}
	distance = Math.pow(distance, 5);
	maxDistance = Math.pow(maxDistance, 5);
	return 255*distance/maxDistance;
}

// ------------------------------------------ UPDATETEXTURE FUNCTION ------------------------------------------
// function to update rgb components for the texture
function updateTexture(){
	// compute rgb components from distance
	red 	= 100 + mapDistance( torsoX, torsoZ, 1) + mapDistance( torsoX, torsoZ, 2);
	green 	= 100 + mapDistance( torsoX, torsoZ, 3) + mapDistance( torsoX, torsoZ, 2);
	blue 	= 100 + mapDistance( torsoX, torsoZ, 4);
	// avoid to have components greater than 255 ( since R and G components have 2 sources )
	if ( green 	> 255 ) green 	= 255;
	if ( blue 	> 255 ) blue 	= 255;
	if ( red 	> 255 ) red 	= 255;
	// compute the texture
	computeTexture();
}

// ------------------------------------------ CONFIGURETEXTURE FUNCTION ------------------------------------------------
function configureTexture(image){
		texture = gl.createTexture();
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
}