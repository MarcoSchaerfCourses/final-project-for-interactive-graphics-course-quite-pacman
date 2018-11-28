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