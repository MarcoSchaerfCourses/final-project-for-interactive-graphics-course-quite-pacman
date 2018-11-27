"use strict";

var canvas;
var gl;
var program;

var NumVertices  = 0;

var wallsIndex = 4;


//	------------------------------------------ LIGHTING PARAMETERS -----------------------------------------
var lightPosition 	= vec4( 0.5, 0.5, 0.9, 1.0 );
var lightAmbient 	= vec4( 0.2, 0.2, 0.2, 1.0);
var lightDiffuse 	= vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular 	= vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient		= vec4( 1.0, 1.0, 1.0, 1.0 );
var materialDiffuse		= vec4( 1.0, 1.0, 1.0, 1.0 );
var materialSpecular	= vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess	= 70.0;

//	------------------------------------------ LIGHTING UTILITIES ------------------------------------------

// array containing all the normals to send to the shader
var normalsArray = [];

//-------------------------------------- VERTICES ---------------------------------------
var mazeVertices = [
    	//floor
        vec4( 5.5,  0,  5.5, 1.0 ),	
        vec4(-5.5,  0,  5.5, 1.0 ),	
        vec4(-5.5,  0, -5.5, 1.0 ),	
        vec4( 5.5,  0, -5.5, 1.0 ),	
        //wall 1
        vec4(   4,  0,   -5, 1.0 ),
        vec4(   4,  0,   -3, 1.0 ),	
        vec4(   3,  0,   -3, 1.0 ),	
        vec4(   3,  0,   -5, 1.0 ),	
        
        vec4(   4,  2,   -5, 1.0 ),	
        vec4(   4,  2,   -3, 1.0 ),	
        vec4(   3,  2,   -3, 1.0 ),	
        vec4(   3,  2,   -5, 1.0 ),	
        //wall 2
        vec4(   5,  0,   -2, 1.0 ),	
        vec4(   5,  0,   -1, 1.0 ),
        vec4(   0,  0,   -1, 1.0 ),	
        vec4(   0,  0,   -2, 1.0 ),	
        
        vec4(   5,  2,   -2, 1.0 ),	
        vec4(   5,  2,   -1, 1.0 ),	
        vec4(   0,  2,   -1, 1.0 ),	
        vec4(   0,  2,   -2, 1.0 ),	
        //wall 3
        vec4(   2,  0,   -1, 1.0 ),	
        vec4(   2,  0,    2, 1.0 ), 	
        vec4(   1,  0,    2, 1.0 ),	
        vec4(   1,  0,   -1, 1.0 ),	
        
    	vec4(   2,  2,   -1, 1.0 ),	
        vec4(   2,  2,    2, 1.0 ), 	
        vec4(   1,  2,    2, 1.0 ),	
        vec4(   1,  2,   -1, 1.0 ),		
        //wall 4
        vec4(   4,  0,    0, 1.0 ),	
        vec4(   4,  0,    5, 1.0 ), 	
        vec4(   3,  0,    5, 1.0 ),	
        vec4(   3,  0,    0, 1.0 ),	
        
        vec4(   4,  2,    0, 1.0 ),	
        vec4(   4,  2,    5, 1.0 ), 	
        vec4(   3,  2,    5, 1.0 ),	
        vec4(   3,  2,    0, 1.0 ),	
        //wall 5
        vec4(   2,  0,    3, 1.0 ),	
        vec4(   2,  0,    4, 1.0 ), 	
        vec4(  -2,  0,    4, 1.0 ),	
        vec4(  -2,  0,    3, 1.0 ),	
        
        vec4(   2,  2,    3, 1.0 ),	
        vec4(   2,  2,    4, 1.0 ), 	
        vec4(  -2,  2,    4, 1.0 ),	
        vec4(  -2,  2,    3, 1.0 ),	
        //wall 6
        vec4(   0,  0,    4, 1.0 ),	
        vec4(   0,  0,    5, 1.0 ), 	
        vec4(  -1,  0,    5, 1.0 ),	
        vec4(  -1,  0,    4, 1.0 ),	
        
        vec4(   0,  2,    4, 1.0 ),	
        vec4(   0,  2,    5, 1.0 ), 	
        vec4(  -1,  2,    5, 1.0 ),	
        vec4(  -1,  2,    4, 1.0 ),
        //wall 7	
        vec4(   2,  0,   -4, 1.0 ),	
        vec4(   2,  0,   -3, 1.0 ), 	
        vec4(  -1,  0,   -3, 1.0 ),	
        vec4(  -1,  0,   -4, 1.0 ),
        
        vec4(   2,  2,   -4, 1.0 ),	
        vec4(   2,  2,   -3, 1.0 ), 	
        vec4(  -1,  2,   -3, 1.0 ),	
        vec4(  -1,  2,   -4, 1.0 ),
        //wall 8
        vec4(  -1,  0,   -5, 1.0 ),	
        vec4(  -1,  0,    2, 1.0 ), 	
        vec4(  -2,  0,    2, 1.0 ),	
        vec4(  -2,  0,   -5, 1.0 ),
        
        vec4(  -1,  2,   -5, 1.0 ),	
        vec4(  -1,  2,    2, 1.0 ), 	
        vec4(  -2,  2,    2, 1.0 ),	
        vec4(  -2,  2,   -5, 1.0 ),
        //wall 9
        vec4(  -3,  0,   -4, 1.0 ),	
        vec4(  -3,  0,   -3, 1.0 ), 	
        vec4(  -5,  0,   -3, 1.0 ),	
        vec4(  -5,  0,   -4, 1.0 ),
        
        vec4(  -3,  2,   -4, 1.0 ),	
        vec4(  -3,  2,   -3, 1.0 ), 	
        vec4(  -5,  2,   -3, 1.0 ),	
        vec4(  -5,  2,   -4, 1.0 ),
        //wall 10
        vec4(  -3,  0,   -2, 1.0 ),	
        vec4(  -3,  0,    4, 1.0 ), 	
        vec4(  -4,  0,    4, 1.0 ),	
        vec4(  -4,  0,   -2, 1.0 ),
        
        vec4(  -3,  2,   -2, 1.0 ),	
        vec4(  -3,  2,    4, 1.0 ), 	
        vec4(  -4,  2,    4, 1.0 ),	
        vec4(  -4,  2,   -2, 1.0 ),   
        //wall 11
        vec4(  -4,  0,    1, 1.0 ),	
        vec4(  -4,  0,    2, 1.0 ), 	
        vec4(  -5,  0,    2, 1.0 ),	
        vec4(  -5,  0,    1, 1.0 ),  
        
        vec4(  -4,  2,    1, 1.0 ),	
        vec4(  -4,  2,    2, 1.0 ), 	
        vec4(  -5,  2,    2, 1.0 ),	
        vec4(  -5,  2,    1, 1.0 ),    	
        //wall 12 (external wall 1)	
        vec4( 5.5,  0, -5.5, 1.0 ),	
        vec4( 5.5,  0,  5.5, 1.0 ), 	
        vec4(   5,  0,  5.5, 1.0 ),	
        vec4(   5,  0, -5.5, 1.0 ), 
        
    	vec4( 5.5,  2, -5.5, 1.0 ),	
        vec4( 5.5,  2,  5.5, 1.0 ), 	
        vec4(   5,  2,  5.5, 1.0 ),	
        vec4(   5,  2, -5.5, 1.0 ), 
        //wall 13 (external wall 2)	
        vec4(   5,  0,    5, 1.0 ),	
        vec4(   5,  0,  5.5, 1.0 ), 	
        vec4(-5.5,  0,  5.5, 1.0 ),	
        vec4(-5.5,  0,    5, 1.0 ),
        
        vec4(   5,  2,    5, 1.0 ),	
        vec4(   5,  2,  5.5, 1.0 ), 	
        vec4(-5.5,  2,  5.5, 1.0 ),	
        vec4(-5.5,  2,    5, 1.0 ),  
        //wall 14 (external wall 3)	
 	    vec4(  -5,  0, -5.5, 1.0 ),	
        vec4(  -5,  0,    5, 1.0 ), 	
        vec4(-5.5,  0,    5, 1.0 ),	
        vec4(-5.5,  0, -5.5, 1.0 ),
        
 	    vec4(  -5,  2, -5.5, 1.0 ),	
        vec4(  -5,  2,    5, 1.0 ), 	
        vec4(-5.5,  2,    5, 1.0 ),	
        vec4(-5.5,  2, -5.5, 1.0 ),  
        //wall 15 (external wall 4)	
        vec4(   5,  0, -5.5, 1.0 ),	
        vec4(   5,  0,   -5, 1.0 ), 	
        vec4(  -5,  0,   -5, 1.0 ),	
        vec4(  -5,  0, -5.5, 1.0 ), 
        
        vec4(   5,  2, -5.5, 1.0 ),	
        vec4(   5,  2,   -5, 1.0 ), 	
        vec4(  -5,  2,   -5, 1.0 ),	
        vec4(  -5,  2, -5.5, 1.0 )
    ];
    
var objective1Vertices = [ 
		//objective 1
		vec4( 4.8,0.8, -4.2, 1.0 ),
		vec4( 4.2,0.8, -4.2, 1.0 ),
		vec4( 4.2,0.8, -4.8, 1.0 ),
		vec4( 4.8,0.8, -4.8, 1.0 ),
		
		vec4( 4.8,1.4, -4.2, 1.0 ),
		vec4( 4.2,1.4, -4.2, 1.0 ),
		vec4( 4.2,1.4, -4.8, 1.0 ),
		vec4( 4.8,1.4, -4.8, 1.0 )
		
		//center at ( 4.5, 1.1, -4.5 )
   ];

var objective2Vertices = [ 
		//objective 2
		vec4( 4.8,0.8,  4.2, 1.0 ),
		vec4( 4.2,0.8,  4.2, 1.0 ),
		vec4( 4.2,0.8,  4.8, 1.0 ),
		vec4( 4.8,0.8,  4.8, 1.0 ),
		
		vec4( 4.8,1.4,  4.2, 1.0 ),
		vec4( 4.2,1.4,  4.2, 1.0 ),
		vec4( 4.2,1.4,  4.8, 1.0 ),
		vec4( 4.8,1.4,  4.8, 1.0 )
		
		//center at ( 4.5, 1.1, 4.5 )
   ];

var objective3Vertices = [ 
		//objective 3
		vec4(-4.2,0.8, -4.2, 1.0 ),
		vec4(-4.8,0.8, -4.2, 1.0 ),
		vec4(-4.8,0.8, -4.8, 1.0 ),
		vec4(-4.2,0.8, -4.8, 1.0 ),
		
		vec4(-4.2,1.4, -4.2, 1.0 ),
		vec4(-4.8,1.4, -4.2, 1.0 ),
		vec4(-4.8,1.4, -4.8, 1.0 ),
		vec4(-4.2,1.4, -4.8, 1.0 )
		
		//center at (-4.5, 1.1,-4.5 )
   ];
   
var objective4Vertices = [ 
		//objective 4
		vec4(-4.2,0.8,  2.8, 1.0 ),
		vec4(-4.8,0.8,  2.8, 1.0 ),
		vec4(-4.8,0.8,  2.2, 1.0 ),
		vec4(-4.2,0.8,  2.2, 1.0 ),
		
		vec4(-4.2,1.4,  2.8, 1.0 ),
		vec4(-4.8,1.4,  2.8, 1.0 ),
		vec4(-4.8,1.4,  2.2, 1.0 ),
		vec4(-4.2,1.4,  2.2, 1.0 )
		
		//center at (-4.5, 1.1, 2.5 )
   ];

var torsoVertices = [
		vec4(   0,  0,    1, 1.0 ),
		vec4(   1,  0,    1, 1.0 ),
		vec4(   1,  0,    0, 1.0 ),
		vec4(   0,  0,    0, 1.0 ),
		
		vec4(   0,  1,    1, 1.0 ),
		vec4(   1,  1,    1, 1.0 ),
		vec4(   1,  1,    0, 1.0 ),
		vec4(   0,  1,    0, 1.0 )
	];
	
// ------------------------------------------ COLORS ------------------------------------------
var mazeVertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  	// black
        [ 0.7, 0.7, 0.7, 1.0 ],		// grey
        [ 1.0, 1.0, 1.0, 1.0 ],  	// white
        [ 0.0, 0.0, 0.0, 1.0 ],  	// black
        [ 1.0, 1.0, 1.0, 1.0 ],  	// white
        [ 0.7, 0.7, 0.7, 1.0 ]		// grey
    ];
    
var objective1VertexColors = [
        [ 0.4, 0.0, 0.0, 1.0 ],  	// red3
		[ 0.7, 0.0, 0.0, 1.0 ],  	// red2
		[ 1.0, 0.0, 0.0, 1.0 ],  	// red1
		[ 0.4, 0.0, 0.0, 1.0 ],  	// red3	
		[ 1.0, 0.0, 0.0, 1.0 ],  	// red1
		[ 0.7, 0.0, 0.0, 1.0 ],  	// red2
    ];

var objective2VertexColors = [
		[ 0.4, 0.4, 0.0, 1.0 ],  	// yellow3
        [ 0.7, 0.7, 0.0, 1.0 ],  	// yellow2
        [ 1.0, 1.0, 0.0, 1.0 ],  	// yellow1
        [ 0.4, 0.4, 0.0, 1.0 ],  	// yellow3
        [ 1.0, 1.0, 0.0, 1.0 ],  	// yellow1
        [ 0.7, 0.7, 0.0, 1.0 ]	 	// yellow2
    ];
    
var objective3VertexColors = [
		[ 0.0, 0.4, 0.0, 1.0 ],  	// green3
		[ 0.0, 0.7, 0.0, 1.0 ],  	// green2
        [ 0.0, 1.0, 0.0, 1.0 ],  	// green1
        [ 0.0, 0.4, 0.0, 1.0 ],  	// green3
        [ 0.0, 1.0, 0.0, 1.0 ],  	// green1
        [ 0.0, 0.7, 0.0, 1.0 ]  	// green2
    ];
    
var objective4VertexColors = [
        [ 0.0, 0.0, 0.4, 1.0 ],  	// blue3
        [ 0.0, 0.0, 0.7, 1.0 ], 	// blue2
        [ 0.0, 0.0, 1.0, 1.0 ],  	// blue1
        [ 0.0, 0.0, 0.4, 1.0 ],  	// blue3
        [ 0.0, 0.0, 1.0, 1.0 ], 	// blue1
        [ 0.0, 0.0, 0.7, 1.0 ]  	// blue2      
    ];
    
var torsoVertexColors = [
        [ 0.4, 0.0, 0.4, 1.0 ],  	// violet3
        [ 0.7, 0.0, 0.7, 1.0 ],  	// violet2
        [ 1.0, 0.0, 1.0, 1.0 ],  	// violet1
		[ 0.4, 0.0, 0.4, 1.0 ],  	// violet3
		[ 1.0, 0.0, 1.0, 1.0 ],  	// violet1
		[ 0.7, 0.0, 0.7, 1.0 ]  	// violet2
    ];

var points = [];
var colors = [];

//-------------------------------------- MAZE TEXTURE -----------------------------------------------

// utility vars for the texture
var texSize = 64;
var texture;
var texCoordsArray =  [ ];
var usingTexture = 0.0;

// starting color components for the texture
var red = 0;
var blue = 0;
var green = 0;

// vars to hold objectives top right corner and tiles with max distance from them
// notice that objectives and max distance tiles are inverted in order to have the mapper work correctly
// objective 1
var objective1X 	= 	-5;
var objective1Z 	= 	 4;
// max distance 1 at (4,-5)
var maxDistance1 	= 	18;
// objective 2
var objective2X 	=  	-5;
var objective2Z 	=  	-5;
// max distance 2 at (4,4) 
var maxDistance2 	= 	18;
// objective 3
var objective3X 	= 	 4;
var objective3Z 	= 	 4;
// max distance 3 at (-5,-5)
var maxDistance3 	= 	18;
// objective 4
var objective4X 	=  	 4;
var objective4Z 	=  	-5;
// max distance 4 at ( -5, 2)
var maxDistance4 	= 	18;

// coordinate system for the texture
var  texCoord = [
	vec2 (0 ,  0), 
	vec2 (1 ,  0),
	vec2 (1 ,  1),
	vec2 (0 ,  1)
];

// var holding the procedural texture	
var  image = new Uint8Array (4*texSize*texSize );

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
// ------------------------------------------ MAPPING DISTANCES TO COLOR INTENSITY ------------------------------------------
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
//------------------------------------------- TRANSFORMATION MATRICES --------------------------------------------------

var modelViewMatrix;
var modelViewMatrixLoc;

var projectionMatrix;
var projectionMatrixLoc;

// ------------------------------------------ ANIMATION FLAGS ----------------------------------------------------------

var animationFlag = 1;
var characterMovement = 0;
var movementCounter = 0;
var movementDirection = 0; // 	|	0=UP	|	1=DOWN	|	2=LEFT	|	3=RIGHT	|

var objective1Captured = 0;
var objective2Captured = 0;
var objective3Captured = 0;
var objective4Captured = 0;

//------------------------------------------- SCALE4 FUNCTION ----------------------------------------------------------

function scale4(a, b, c) {
   var result = mat4();
   result[0][0] = a;
   result[1][1] = b;
   result[2][2] = c;
   return result;
}


//------------------------------------------ HIERARCHICAL STRUCTURE UTILITIES ------------------------------------------
// nodes' ids
var ids = [ 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42 ];
var sceneId 	 = 0;
var mazeId 		 = 3;
var objective1Id = 6;
var objective2Id = 9;
var objective3Id = 12;
var objective4Id = 15;
var torsoId 	 = 18;
var botUpSLegId  = 21;
var botUpRLegId  = 24;
var topUpSLegId  = 27;
var topUpRLegId  = 30;
var botLowSLegId = 33;
var botLowRLegId = 36;
var topLowSLegId = 39;
var topLowRLegId = 42;

//number of nodes
var numNodes = 15;

// var to hold the whole structure
var figure = [];

//vars to keep the trans. matrices saved while traversing
var stack = [];
var instanceMatrix;

/* starting rotations of each node: 	
	0	| SCENE 	  X | SCENE 	  Y | SCENE 	  Z | 	1
	3	| MAZE		  X | MAZE 		  Y | MAZE 		  Z | 	2
	6	| OBJECTIVE1  X | OBJECTIVE1  Y | OBJECTIVE1  Z |	3
 	9	| OBJECTIVE2  X | OBJECTIVE2  Y | OBJECTIVE2  Z | 	4
	12	| OBJECTIVE3  X | OBJECTIVE3  Y | OBJECTIVE3  Z |	5
	15	| OBJECTIVE3  X | OBJECTIVE3  Y | OBJECTIVE3  Z |	6
	18	| TORSO 	  X | TORSO 	  Y | TORSO 	  Z |	7
	21	| BOTUPS LEG  X	| B0TUPS LEG  Y | BOTUPS LEG  Z |	8
	24	| BOTUPR LEG  X	| B0TUPR LEG  Y | BOTUPR LEG  Z |	9
	27	| topUPS LEG  X	| topUPS LEG  Y | topUPS LEG  Z |	10
	30	| topUPR LEG  X	| topUPR LEG  Y | topUPR LEG  Z |	11
	33	| BOTLOWS LEG X	| B0TLOWS LEG Y	| BOTLOWS LEG Z |	12
	36	| BOTLOWR LEG X	| B0TLOWR LEG Y	| BOTLOWR LEG Z |	13
	39	| topLOWS LEG X	| topLOWS LEG Y	| topLOWS LEG Z |	14
	42	| topLOWR LEG X	| topLOWR LEG Y	| topLOW LEG  Z |	15
*/ 
var nodesAngle = 	[ 	
				   -75,  0, 180, 
					 0,  0,   0, 
					25, 35,   0, 
					25, 35,   0, 
					25, 35,   0, 
					25, 35,   0,
					 0,  0,   0,
				   -30,  0,  20,
				   -30,  0, -20,
				    30,  0, -20,
					30,  0,  20,
					30,  0,   0,
					30,  0,   0,
				   -30,  0,   0,
				   -30,  0,   0
					];
					
// torso position, expressed as top dx
var torsoX = 0;
var torsoY = 0;
var torsoZ = 0;
// torso transformation vars
var torsoScaleX = 0.4;
var torsoScaleY = 0.2;
var torsoScaleZ = 0.4;

var torsoTransX = 0.3;
var torsoTransY = 0.4;
var torsoTransZ = 0.3;

// upper legs position and transformation vars
var uLegHeight = 0.1;
var uLegWidth = 0.1;
var uLegDepth = 0.2;

var uSLegsTransX = torsoTransX+torsoScaleX;
var uRLegsTransX = torsoTransX;
var uTLegsTransZ = torsoTransZ;
var uBLegsTransZ = torsoTransZ+torsoScaleZ;

// lower legs position and transformation vars
var lLegHeight = 0.4;
var	lLegWidth = 0.1;
var lLegDepth = 0.1;

var lSLegsTransX = uSLegsTransX;
var lRLegsTransX = uRLegsTransX;
var lTLegsTransZ = uTLegsTransZ-uLegDepth;
var lBLegsTransZ = uBLegsTransZ+(uLegDepth/2);

// ------------------------------------------ WALLS STRUCTURE ------------------------------------------
var walls = [ 
				3, 4, -5, -4,
				3, 4, -4, -3,
				
				1, 2, -4, -3,
				0, 1, -4, -3,
				-1, 0, -4, -3,
				
				-2, -1, -5, -4,
				-2, -1, -4, -3,
				-2, -1, -3, -2,
				-2, -1, -2, -1,
				-2, -1, -1, 0,
				-2, -1, 0, 1,
				-2, -1, 1, 2,
				
				-4, -3, -4, -3, 
				-5, -4, -4, -3,
				
				4, 5, -2, -1,
				3, 4, -2, -1,
				2, 3, -2, -1,
				1, 2, -2, -1,
				0, 1, -2, -1,
				
				1, 2, -1, 0,
				1, 2, 0, 1,
				1, 2, 1, 2,
				
				3, 4, 0, 1,
				3, 4, 1, 2,
				3, 4, 2, 3,
				3, 4, 3, 4,
				3, 4, 4, 5,
				
				1, 2, 3, 4,
				0, 1, 3, 4,
				-1, 0, 3, 4,
				-2, -1, 3, 4,
				
				-1, 0, 4, 5,
				
				-4, -3, -2, -1,
				-4, -3, -1, 0,
				-4, -3, 0, 1,
				-4, -3, 1, 2,
				-4, -3, 2, 3,
				-4, -3, 3, 4,
				
				-5, -4, 1, 2
			
			]
			
// ------------------------------------------ ISAWALL FUNCTION ------------------------------------------
// how to check if a tile is a wall
function isAWall( x, z ) {

	var i = 0;
	var result = 0;
	
	for ( i; i<walls.length; i+=4 ){
		if ( walls[i] <= x && x <= walls[i+1] && walls[i+2] <= z && z <= walls[i+3] ){
			result = 1;
			break;
		}
	}
	
	return result;
	
}

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
	
	quadTorso(0,1,2,3);
	quadTorso(5,4,7,6);
	quadTorso(2,1,5,6);
	quadTorso(1,0,4,5);
	quadTorso(0,3,7,4);
	quadTorso(3,2,6,7);
	
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
        colors.push( mazeVertexColors[1] );
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
			colors.push( objective1VertexColors[2] );
        }
        if ( index == 2 ) {
        	points.push( objective2Vertices[indices[i]] );
			// send the normal
			normalsArray.push(normal);
			colors.push( objective2VertexColors[2] );			
        }
        if ( index == 3 ) {
        	points.push( objective3Vertices[indices[i]] );
			// send the normal
			normalsArray.push(normal);
			colors.push( objective3VertexColors[2] );
        }
        if ( index == 4 ) {
        	points.push( objective4Vertices[indices[i]] );
			// send the normal
			normalsArray.push(normal);
			colors.push( objective4VertexColors[2] );
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
		colors.push( torsoVertexColors[2] );
	}
	
	gl.drawArrays( gl.TRIANGLES, NumVertices, 6 );
	NumVertices += 6;
	
}
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
					console.log("Objective1 captured!");
				}
				if ( torsoX == 4 && torsoZ ==  4 && objective2Captured == 0 ){
					objective2Captured = 1;
					console.log("Objective2 captured!");
				}
				if ( torsoX == -5 && torsoZ == -5 && torsoZ <= -4 && objective3Captured == 0 ){
					objective3Captured = 1;
					console.log("Objective3 captured!");
				}
				if ( torsoX == -5 && torsoZ == 2 && 3 >= torsoZ && torsoZ <= 4 && objective4Captured == 0 ){
					objective4Captured = 1;
					console.log("Objective4 captured!");
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