"use strict"


/////////////////////////////////////////////////////////
/*
		class CContainer
		{		constructor(name='container')
				{   //if(name)	this._container = document.createElement( name );
						//else			this._container = document.getElementById( 'container' );
						this._container = document.getElementById( 'container' );
          	document.body.appendChild( this._container );
				}
				
				appendChild(elem)
				{		//this._container.appendChild( elem );
						$("#container").append(elem);
				}
		}

		class CRenderer
		{		constructor(width,height)
				{   this._renderer           = new THREE.WebGLRenderer({ antialias: false,alpha: true });
            this._renderer.setPixelRatio( window.devicePixelRatio );
            this._renderer.setSize( width,height);
            this._renderer.setClearColor( 0xffffff); 
            this._renderer.autoClearColor = false;//true;//
            this._renderer.gammaOutput    = true;
				}
				
				resize(w,h)
				{		this._renderer.setSize(w,h)
				}
				
				setSize(w,h)
				{		this._renderer.setSize(w,h)
				}
				
				render(scene,camera)
				{		this._renderer.render(scene,camera ); 
				}
		}
		
		class CStat
		{		constructor()
				{		this.stats = new Stats();
	
						//var width 	= String(window.innerWidth) + "px";
  					var height	= String(window.innerHeight-50) + "px";
  
						this.stats.domElement.style.position = 'absolute';
						this.stats.domElement.style.left 		= '5px';
						this.stats.domElement.style.top		  = height;//'5px';

				}
				
				update()
				{		this.stats.update();
				}
		}
		
		class CThreejs 
    {   constructor(width=window.innerWidth,height=window.innerHeight,fps=30) 
        {   this.scene              = new THREE.Scene();  
            this.scene.fog          = new THREE.FogExp2( 0x9999ff, 0.00025 );
          
          	this.container					= new CContainer();
          	//this.container					= document.getElementById( 'container' );
          	//document.body.appendChild( this.container );
          	
            this.renderer           = new CRenderer(width,height);
          	      
			      this.container.appendChild( this.renderer.domElement );		
			      //$("#container").append(this.renderer.domElement);
            
            this.stats              = new CStat();
						this.container.appendChild( this.stats.dom );           
						//$("#container").append(this.stats.dom );
						
						this._camera 						= new THREE.PerspectiveCamera( 62,width/height,1,1000 );
						this._camera.position.z  = 5;
						
						this.light							= new THREE.DirectionalLight( 0xffffff);
						this.light.position.set(1000,1000,1000).normalize();
						this.scene.add(this.light);

            this.rafThrottler	    	= new RafThrottler();
	        	this.rafThrottler.fps   = fps;	
	               
	        	this.texLoader          = new THREE.TextureLoader();       
        }
				        
        update(delta)       {   this.stats.update();}
        render()            {		this.renderer.render( this.scene, this.camera );}       
        resize(w,h)         {   this.renderer.resize(w,h);}
        
        add(node)           {   this.scene.add(node);}
        remove(node)        {   this.scene.remove(node);}

        setFPS(fps)         {   this.rafThrottler.fps  = fps;}
        
        onWindowResize()		{		this._camera.aspect = window.innerWidth / window.innerHeight;
																this._camera.updateProjectionMatrix();
																this.renderer.setSize( window.innerWidth, window.innerHeight );
														}
				get camera()				{		return this._camera;}														
    }
*/    
/////////////////////////////////////////////////////////
//var  mygame;// = new  CThreejs();

var container;
var scene, camera, renderer;
var stats;

var requestId;
var controls;

init();
animate();

function init() 
{	
	
	// Setup
	container = document.getElementById( 'container' );
	//container = document.createElement( 'div' );
	//document.body.appendChild( container );	
	


	//mygame = new  CThreejs();


	scene  = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 62, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 5;

	renderer = new THREE.WebGLRenderer( { antialias: false,alpha: true} );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight);
  renderer.setClearColor( 0xffffff); 
	renderer.autoClear		= false;
	renderer.gammaInput 	= true;
	renderer.gammaOutput  = true;
	
  // Let there be light!
	var light = new THREE.DirectionalLight( 0xffffff);
	light.position.set(1000,1000,1000).normalize();
	scene.add(light);
	
	// Load game world
	firebase.auth().onAuthStateChanged(function( user ) 
	{	if ( user ) 
		{	// User is signed in
			console.log( "Player is signed in " );
			playerID = user.uid;

			fbRef.child( "Players/" + playerID + "/isOnline" ).once( "value" ).then( function( isOnline ) 
			{		if ( isOnline.val() === null || isOnline.val() === false )	loadGame();
					else																												alert( "Hey, only one session at a time buddy!" );
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
	//mygame.render();

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
   //mygame.update(); 
}

function onWindowResize() 
{	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	//mygame.onWindowResize();
}