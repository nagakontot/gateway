"use strict"

		class CBaseUtils
		{	constructor(v)	{	this._	= v;}
			get_()			{	return this._;}
			set_(v)			{	this._	= v;}
		}
		
		class CScene extends CBaseUtils
		{	constructor()
			{	super(new THREE.Scene());

	        	this._.fog          	= new THREE.FogExp2( 0x9999ff, 0.00025 );

	        	return this;
			}		
		}
		
		class CContainer extends CBaseUtils
		{	constructor(name)
			{ 	super((name)? document.createElement(name):document.getElementById('container'));

				this._name				= (name)? name:'container';
          		document.body.appendChild( this._ );         	

          		return this;
			}
		}

		class CRenderer extends CBaseUtils
		{	constructor(width,height)
			{   super(new THREE.WebGLRenderer({ antialias: false,alpha: true }));

            	this._.setPixelRatio( window.devicePixelRatio || 1 );
            	this._.setSize( width,height);
        		this._.setClearColor( 0xffffff); 
            	this._.autoClearColor	= false;//true;//
            	this._.gammaInput   	= true;
            	this._.gammaOutput  	= true;

            	return this;
			}
			
			exit()
			{	this._.domElement.addEventListener('dblclick', null, false); //remove listener to render
    			this._.forceContextLoss();
    			this._.context			= null;
    			this._.domElement		= null;
    			this._					= null;  
			}
		}
		
		class CStat extends CBaseUtils
		{	constructor()
			{	super(new Stats());
	
				//var width 	= String(window.innerWidth) + "px";
  				var height	= String(window.innerHeight-50) + "px";
  
				this._.domElement.style.position	= 'absolute';
				this._.domElement.style.left 		= '5px';
				this._.domElement.style.top			= height;//'5px';
						
				return this;
			}
				
		}
		
		class CCamera extends CBaseUtils
		{	constructor(viewangle,ratio,near,far)
			{	super(new THREE.PerspectiveCamera(viewangle,ratio,near,far));

				return this;
			}
		}
		
		class CTexture extends CBaseUtils
		{	constructor()
			{	super(new THREE.TextureLoader());

				return this;
			}
		}
		
		class CThrottler extends CBaseUtils
		{	constructor(fps)
			{	super(new RafThrottler());
				this._.fps   	= fps;

				return this;
			}
		}		
		
		class CGridHelper extends CBaseUtils
		{	constructor()
			{	super(new THREE.GridHelper ( 200 , 50 )); // size, step
    			//this.scene.add ( this.gridHelper );
    			return this;
			}
		}
		class CAxisHelper extends CBaseUtils
		{	constructor()
			{	super(new THREE.AxisHelper ( 200 , 50 ));
    			//this.scene.add ( this.axisHelper );    			
    			return this;
			}
		}
		class CLightHelper extends CBaseUtils
		{	constructor(light)
			{	super(new THREE.DirectionalLightHelper ( light , 20 ));
    			//this.scene.add ( this.lightHelper );
    			return this;
			}
		}
		//////////////////////////////////////////////////////////////////////////
		class CThreejs 
    	{   constructor(width=window.innerWidth,height=window.innerHeight,fps=30) 
        	{   //this.requestId;
				//this.controls;

        		this.scene_					= new CScene();        	  	
        		this.scene					= this.scene_.get_();
        		
            	this.renderer_           	= new CRenderer(width,height);          	      
            	this.renderer           	= this.renderer_.get_();
            	
            	this.stats_              	= new CStat();
            	this.stats              	= this.stats_.get_();

            	this.container_				= new CContainer();
            	this.container				= this.container_.get_();
			    this.container.appendChild( this.renderer.domElement );		
				this.container.appendChild( this.stats.dom );           
						
				this.cam_ 					= new CCamera( 62,width/height,1,1000 );						
				this.cam 					= this.cam_.get_();
				this.cam.position.z 		= 5;
							
				this.light					= new THREE.DirectionalLight( 0xffffff);
				this.light.position.set(1000,1000,1000).normalize();
				this.scene.add(this.light);
				
				this.ambientLight			= new THREE.AmbientLight ( 0xffaa55 );
				this.scene.add(this.ambientLight);

				this.rafThrottler_	    	= new CThrottler(fps);
            	this.rafThrottler	    	= this.rafThrottler_.get_();
	               
	        	this.texLoader_          	= new CTexture();      
	        	this.texLoader          	= this.texLoader_.get_();
	        	
	        	this.grid_					= new CGridHelper();
	        	this.grid					= this.grid_.get_();
	        	this.scene.add(this.grid);
	        	
	        	this.axis_					= new CAxisHelper();
	        	this.axis					= this.axis_.get_();
	        	this.scene.add(this.axis);

	        	this.lighthelper_			= new CLightHelper(this.light);
	        	this.lighthelper			= this.lighthelper_.get_();
	        	this.scene.add(this.lighthelper);
	        		
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
				this.renderer_.exit();
          
    			///////////////////////
    			//this.projector = null;
    			this.scene		= null;
    			this.cam		= null;
    			//this.controls	= null;
    			window.empty(this.container);
			}
    	}