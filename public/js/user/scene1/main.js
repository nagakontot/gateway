"use strict"

var container, scene, camera, renderer;
var stats, requestId;
var controls;

init();
animate();

function init() 
{	// Setup
	container = document.getElementById( 'container' );
	//container = document.createElement( 'div' );
	//document.body.appendChild( container );	

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 5;

	renderer = new THREE.WebGLRenderer( { alpha: true} );
	renderer.setSize( window.innerWidth, window.innerHeight);
	renderer.autoClear = false;

  // Let there be light!
	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 50, 50, 50 );
	scene.add(light);
	
	// Load game world

	firebase.auth().onAuthStateChanged(function( user ) 
	{	if ( user ) 
		{	// User is signed in

			console.log( "Player is signed in " );
			playerID = user.uid;

			fbRef.child( "Players/" + playerID + "/isOnline" ).once( "value" ).then( function( isOnline ) 
			{	if ( isOnline.val() === null || isOnline.val() === false ) 
				{	loadGame();
				} 
				else 
				{	alert( "Hey, only one session at a time buddy!" );
				}
			});


		} 
		else 
		{	// User is signed out
			console.log( "Player is signed out " );

			firebase.auth().signInAnonymously().catch(function(error) 
			{	console.log( error.code + ": " + error.message );
			})
		}
	});


	// Events
	window.addEventListener( "resize", onWindowResize, false );

	container.appendChild( renderer.domElement );
	document.body.appendChild( container );
	
	stats = new Stats();
	
	//var width 	= String(window.innerWidth) + "px";
  var height	= String(window.innerHeight-50) + "px";
  
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left 		= '5px';
	stats.domElement.style.top		  = height;//'5px';

	container.appendChild( stats.dom );	
	
/*	
	////////////////////////////////////////////////////////////
  // Ok, now we have the cube. Next we'll create the hud. For that we'll
  // need a separate scene which we'll render on top of our 3D scene. We'll
  // use a dynamic texture to render the HUD.
  
  // We will use 2D canvas element to render our HUD.  
  hudCanvas = document.createElement('canvas');
  
  var width 	= window.innerWidth;
  var height	= window.innerHeight;
  // Again, set dimensions to fit the screen.
  hudCanvas.width = width;
  hudCanvas.height = height;

  // Get 2D context and draw something supercool.
  hudBitmap 			= hudCanvas.getContext('2d');
  hudBitmap.font		= "Normal 100px Arial";
  hudBitmap.textAlign	= 'center';
  hudBitmap.fillStyle	= "rgba(245,145,45,0.75)";
  hudBitmap.fillText('Initializing...', width / 2, height / 2);
     
  // Create the camera and set the viewport to match the screen dimensions.
  cameraHUD = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0, 30 );

  // Create also a custom scene for HUD.
  sceneHUD = new THREE.Scene();
 
	// Create texture from rendered graphics.
  hudTexture = new THREE.Texture(hudCanvas) 
  hudTexture.needsUpdate = true;
  
  // Create HUD material.
  var material = new THREE.MeshBasicMaterial( {map: hudTexture} );
  material.transparent = true;

  // Create plane to render the HUD. This plane fill the whole screen.
  var planeGeometry = new THREE.PlaneGeometry( width, height );
  var plane = new THREE.Mesh( planeGeometry, material );
  sceneHUD.add( plane );
*/

	////////////////////////////////////////////////////////////
}

function animate() 
{	requestId =  requestAnimationFrame( animate );

	if ( controls )controls.update();
	
	render();
	//renderer.clear();
	//renderer.render( scene, camera );
}

function render() 
{	//renderer.clear();
	renderer.render( scene, camera );

	//////////////////////////
    // Update HUD graphics.
    /*
    hudBitmap.clearRect(0, 0, window.innerWidth, hudCanvas.height);
    hudBitmap.fillText("This is a test" , window.innerWidth / 2, hudCanvas.height / 2);
  	hudTexture.needsUpdate = true;
    
    // Render HUD on top of the scene.
    renderer.render(sceneHUD, cameraHUD);
    */
   
   stats.update(); 
}

function onWindowResize() 
{	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	renderer.setSize( window.innerWidth, window.innerHeight );
}