"use strict"

		class CScene
		{	constructor()
			{	this._scene              = new THREE.Scene();  
	        	this._scene.fog          = new THREE.FogExp2( 0x9999ff, 0.00025 );
	        	return this._scene;
			}		
		}
		
		class CContainer
		{	constructor(name)
			{ 	this._container = (name)? document.createElement(name):document.getElementById('container');
				this._name			= (name)? name:'container';
          		document.body.appendChild( this._container );         	
          		return this._container;
			}
		}

		class CRenderer
		{	constructor(width,height)
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
		{	constructor()
			{	this._stats = new Stats();
	
				//var width 	= String(window.innerWidth) + "px";
  				var height	= String(window.innerHeight-50) + "px";
  
				this._stats.domElement.style.position	  = 'absolute';
				this._stats.domElement.style.left 			= '5px';
				this._stats.domElement.style.top		  	= height;//'5px';
						
				return this._stats;
			}
				
		}
		
		class CCamera
		{	constructor(viewangle,ratio,near,far)
			{	this._cam = new THREE.PerspectiveCamera(viewangle,ratio,near,far);
				return this._cam;
			}
		}
		
		//////////////////////////////////////////////////////////////////////////
		class CThreejs 
    	{   constructor(width=window.innerWidth,height=window.innerHeight,fps=30) 
        	{   //this.requestId;
				//this.controls;

        		this.scene					= new CScene();        	  	
            	this.renderer           	= new CRenderer(width,height);          	      
            	this.stats              	= new CStat();

            	this.container				= new CContainer();
			    this.container.appendChild( this.renderer.domElement );		
				this.container.appendChild( this.stats.dom );           
						
				this.cam 					= new CCamera( 62,width/height,1,1000 );
				this.cam.position.z 		= 5;
							
				this.light					= new THREE.DirectionalLight( 0xffffff);
				this.light.position.set(1000,1000,1000).normalize();
				this.scene.add(this.light);

            	this.rafThrottler	    	= new RafThrottler();
	        	this.rafThrottler.fps   	= fps;	
	               
	        	this.texLoader          	= new THREE.TextureLoader();      
	        		
	        	this.onWindowResize 		= this.onWindowResize.bind(this);
	        	window.addEventListener( "resize", this.onWindowResize, false );

	        	//this.WindowResize 			= evt => this.onWindowResize(evt);
	        	//window.addEventListener( "resize", this.WindowResize, false );
	        		
	        	return this;
        	}
				        
        	update(delta)       	{   this.stats.update();}
        	render()            	{	this.renderer.render( this.scene, this.cam );}
        	resize(w,h)         	{   this.renderer.setSize(w,h);}
        
        	add(node)           	{   this.scene.add(node);}
        	remove(node)        	{   this.scene.remove(node);}

        	setFPS(fps)         	{   this.rafThrottler.fps  = fps;}
        
        	//onWindowResize(evt)	
        	onWindowResize()	
        	{	this.cam.aspect 	= window.innerWidth / window.innerHeight;
				this.cam.updateProjectionMatrix();
				this.renderer.setSize( window.innerWidth, window.innerHeight );
			}
			
			get camera()			{	return this.cam;}
			
			exit(requestId)
			{	window.cancelAnimationFrame(requestId);// Stop the animation
    			///////////////////////
				//this.renderer.exit();
    			this.renderer.domElement.addEventListener('dblclick', null, false); //remove listener to render
    			this.renderer.forceContextLoss();
    			this.renderer.context = null;
    			this.renderer.domElement = null;
    			this.renderer = null;            
    			///////////////////////
    			//this.projector = null;
    			this.scene		= null;
    			this.cam		= null;
    			//this.controls	= null;
    			window.empty(this.container);
			}
    	}