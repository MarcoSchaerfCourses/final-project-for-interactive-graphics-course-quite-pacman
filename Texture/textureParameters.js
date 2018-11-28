//-------------------------------------- MAZE TEXTURE -----------------------------------------------

// utility vars for the texture
var texSize = 64;
var texture;
var texCoordsArray =  [ ];
var usingTexture = 0.0;

// var holding the procedural texture	
var  image = new Uint8Array (4*texSize*texSize );

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