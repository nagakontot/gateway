"use strict"

    	
//////////////////////////////////////////////////////////////////////////
var mygame;
var requestId;
var controls;

init();
animate();

function init() 
{		// Setup
		mygame		= new CThreejs();
	
		////////////////////////////////////////////////////////////////	
		// Load game world
		firebase.auth().onAuthStateChanged(function( user ) 
		{	if ( user ) 
			{	// User is signed in
				console.log( "Player is signed in " );
				playerID = user.uid;

				fbRef.child( "Players/" + playerID + "/isOnline" ).once( "value" ).then( function( isOnline ) 
				{	var isOnlinetrue = ( isOnline.val() === null || isOnline.val() === false );
					if(isOnlinetrue)loadGame();
					else						alert( "Hey, only one session at a time buddy!" );				
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
	//renderer.render( scene, camera );
	mygame.render();
	mygame.update(); 
}

