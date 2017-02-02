"use strict"

		class CScene
		{		constructor()
				{		this._scene              = new THREE.Scene();  
	          this._scene.fog          = new THREE.FogExp2( 0x9999ff, 0.00025 );
	          return this._scene;
				}		
		}
		
		class CContainer
		{		constructor(name)
				{ 	this._container = (name)? document.createElement(name):document.getElementById('container');
						this._name			= (name)? name:'container';
          	document.body.appendChild( this._container );         	
          	return this._container;
				}
		}

		class CRenderer
		{		constructor(width,height)
				{   this._renderer           = new THREE.WebGLRenderer({ antialias: false,alpha: true });
            this._renderer.setPixelRatio( window.devicePixelRatio );
            this._renderer.setSize( width,height);
        		this._renderer.setClearColor( 0xffffff); 
            this._renderer.autoClearColor = false;//true;//
            this._renderer.gammaInput     = true;
            this._renderer.gammaOutput    = true;
            return this._renderer;
				}
		}
		
		class CStat
		{		constructor()
				{		this._stats = new Stats();
	
						//var width 	= String(window.innerWidth) + "px";
  					var height	= String(window.innerHeight-50) + "px";
  
						this._stats.domElement.style.position	  = 'absolute';
						this._stats.domElement.style.left 			= '5px';
						this._stats.domElement.style.top		  	= height;//'5px';
						
						return this._stats;
				}
				
		}
		
		class CCamera
		{		constructor(viewangle,ratio,near,far)
				{		this._cam = new THREE.PerspectiveCamera(viewangle,ratio,near,far);
						return this._cam;
				}
		}
		
		//////////////////////////////////////////////////////////////////////////
		class CThreejs 
    	{   constructor(width=window.innerWidth,height=window.innerHeight,fps=30) 
        	{   this.scene								= new CScene();

        	  	this.container						= new CContainer();
          	
            	this.renderer           	= new CRenderer(width,height);          	      
			    		this.container.appendChild( this.renderer.domElement );		
            
            	this.stats              	= new CStat();
							this.container.appendChild( this.stats.dom );           
						
							this.cam 									= new CCamera( 62,width/height,1,1000 );
							this.cam.position.z 			= 5;
							
							this.light								= new THREE.DirectionalLight( 0xffffff);
							this.light.position.set(1000,1000,1000).normalize();
							this.scene.add(this.light);

            	this.rafThrottler	    		= new RafThrottler();
	        		this.rafThrottler.fps   	= fps;	
	               
	        		this.texLoader          	= new THREE.TextureLoader();      
	        		
	        		this.onWindowResize 			= this.onWindowResize.bind(this);
	        		window.addEventListener( "resize", this.onWindowResize, false );

	        		//this.WindowResize 			= evt => this.onWindowResize(evt);
	        		//window.addEventListener( "resize", this.WindowResize, false );
	        		
	        		return this;
        	}
				        
        	update(delta)       	{   this.stats.update();}
        	render()            	{		this.renderer.render( this.scene, this.cam );}
        	resize(w,h)         	{   this.renderer.setSize(w,h);}
        
        	add(node)           	{   this.scene.add(node);}
        	remove(node)        	{   this.scene.remove(node);}

        	setFPS(fps)         	{   this.rafThrottler.fps  = fps;}
        
        	//onWindowResize(evt)	
        	onWindowResize()	
        	{		this.cam.aspect 	= window.innerWidth / window.innerHeight;
							this.cam.updateProjectionMatrix();
							this.renderer.setSize( window.innerWidth, window.innerHeight );
					}
			
					get camera()					{		return this.cam;}
    	}
    	
//////////////////////////////////////////////////////////////////////////
//var container, scene, camera, renderer;
//var stats;
var mygame;
var requestId;
var controls;

init();
animate();

function init() 
{	// Setup
	mygame		= new CThreejs();
	
/*	
	container = new CContainer();
	//container = document.getElementById( 'container' );
	//container = document.createElement( 'div' );
	//document.body.appendChild( container );	

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 62, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 5;

	renderer = new CRenderer(window.innerWidth, window.innerHeight);
	//renderer = new THREE.WebGLRenderer( { alpha: true} );
	//renderer.setSize( window.innerWidth, window.innerHeight);
	//renderer.autoClear = false;


  // Let there be light!
	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 50, 50, 50 );
	scene.add(light);

	container.appendChild( renderer.domElement );
	//document.body.appendChild( container );
	
	stats = new Stats();
	
	//var width 	= String(window.innerWidth) + "px";
    var height	= String(window.innerHeight-50) + "px";
  
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left 		= '5px';
	stats.domElement.style.top		  = height;//'5px';

	container.appendChild( stats.dom );	
*/	
	
	// Events
	//window.addEventListener( "resize", onWindowResize, false );

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
	//renderer.render( scene, camera );
	mygame.render();

	//////////////////////////
    // Update HUD graphics.
    /*
    hudBitmap.clearRect(0, 0, window.innerWidth, hudCanvas.height);
    hudBitmap.fillText("This is a test" , window.innerWidth / 2, hudCanvas.height / 2);
  	hudTexture.needsUpdate = true;
    
    // Render HUD on top of the scene.
    renderer.render(sceneHUD, cameraHUD);
    */
   
   //stats.update(); 
   mygame.update(); 
}

/*
function onWindowResize() 
{	//camera.aspect = window.innerWidth / window.innerHeight;
	//camera.updateProjectionMatrix();	
	//renderer.setSize( window.innerWidth, window.innerHeight );
	mygame.onWindowResize();
}
*/