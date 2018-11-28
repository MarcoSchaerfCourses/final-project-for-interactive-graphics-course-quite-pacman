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