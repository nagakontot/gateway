"use strict"

//var texLoader;//       	= new THREE.TextureLoader();

var otherPlayers		= {};
var playerID;
var player;

function loadGame() 
{	loadEnvironment();				// load the environment
	initMainPlayer();				// load the player

	listenToOtherPlayers();

	window.onunload = function() 
	{	fbRef.child( "Players/" + playerID ).remove();
	};

	window.onbeforeunload = function() 
	{	fbRef.child( "Players/" + playerID ).remove();
	};
}

function listenToPlayer( playerData ) 
{	if ( playerData.val() ) 
	{	otherPlayers[playerData.key].setOrientation( playerData.val().orientation.position, playerData.val().orientation.rotation );
	}
}

function listenToOtherPlayers() 
{	// when a player is added, do something
	fbRef.child( "Players" ).on( "child_added", function( playerData ) 
	{	if ( playerData.val() ) 
		{	if ( playerID != playerData.key && !otherPlayers[playerData.key] ) 
			{	otherPlayers[playerData.key] = new Player( playerData.key );
				otherPlayers[playerData.key].init();
				fbRef.child( "Players/" + playerData.key ).on( "value", listenToPlayer );
			}
		}
	});

	// when a player is removed, do something
	fbRef.child( "Players" ).on( "child_removed", function( playerData ) 
	{	if ( playerData.val() ) 
		{	fbRef.child( "Players/" + playerData.key ).off( "value", listenToPlayer );
			scene.remove( otherPlayers[playerData.key].mesh );
			//mygame.remove( otherPlayers[playerData.key].mesh );
			delete otherPlayers[playerData.key];
		}
	});
}

function initMainPlayer() 
{	fbRef.child( "Players/" + playerID ).set(
	{	isOnline:		true,
		orientation:	{	position: {x: 0, y:0, z:0},
							rotation: {x: 0, y:0, z:0}
						}
	});

	player = new Player( playerID );
	player.isMainPlayer = true;
	player.init();
}

function loadEnvironment() 
{	
	var sphere_geometry = new THREE.SphereGeometry( 1 );
	var sphere_material = new THREE.MeshNormalMaterial();
	var sphere			= new THREE.Mesh( sphere_geometry, sphere_material );

	scene.add( sphere );
	//mygame.add( sphere );
	
    /////////////////////////////////////////////////////////
        	
        	var texLoader			= new THREE.TextureLoader();
			var floorTexture        = texLoader.load( 'images/dirt/dirt_COLOR.jpg' );
            floorTexture.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTexture.wrapS      = floorTexture.wrapT = THREE.MirroredRepeatWrapping;
            floorTexture.repeat.set( 100,100 );
            
	        //var floorTextureBump    = texLoader.load( 'images/dirt/dirt_NRM.jpg' );
            //var floorTextureOCC     = texLoader.load( 'images/dirt/dirt_OCC.jpg' );
            //var floorTextureSPEC    = texLoader.load( 'images/dirt/dirt_SPEC.jpg' );
	        //var floorTextureDISP    = texLoader.load( 'images/dirt/dirt_DISP.jpg' );
			
	        var params = 
	        {   map:                floorTexture,

                //normalMap:          floorTextureBump,
                //normalScale:        new THREE.Vector2( 1,1 ),

                //aoMap:              floorTextureOCC,         
                //specularMap:        floorTextureSPEC,

                //displacementMap:    floorTextureDISP,
                //displacementBias:   1,
                //displacementScale:  1,  
                
                //blending:   		THREE.AdditiveBlending,
                emissive:			0x000000,
                //ambient:			0xdddddd,
                shininess:          15.0,
                color:              0xffffff,
				specular:           0x101010,
                //side:               THREE.BackSide
            };
			
	        /////////////////////////////////////////////////////////
            // FLOOR

            var floorMaterial       = new THREE.MeshPhongMaterial( params );
            //var floorMaterial       = new THREE.MeshLambertMaterial( params );
            var floorGeometry       = new THREE.PlaneBufferGeometry(1000,1000);
            
            
            //make 2nd uv for aomap to function
            //var uvs = floorGeometry.attributes.uv.array;
            //floorGeometry.addAttribute( 'uv2', new THREE.BufferAttribute( uvs, 2 ) );
            //floorGeometry.computeFaceNormals();

            var floor 		        = new THREE.Mesh( floorGeometry, floorMaterial );
            
            floor.position.y 	    = 0;
            floor.rotation.x 	    = -Math.PI / 2;
            
            scene.add(floor);
            //mygame.add( floor );
	

}

/*
var loader = new THREE.FontLoader();
loader.load(	'fonts/gentilis_regular.typeface.json', 
				function ( font ) 
				{	init( font );
					animate();
				} );
			
function addLabel( name, location ) 
{	var textGeo 		= new THREE.TextGeometry( name, {font: font,size: 20,height: 1,curveSegments: 1});
	var textMaterial	= new THREE.MeshBasicMaterial( { color: 0xffffff } );
	var textMesh		= new THREE.Mesh( textGeo, textMaterial );
	textMesh.position.copy( location );
	scene.add( textMesh );
}
*/