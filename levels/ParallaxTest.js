/**
 * Parallax test screen level.
 * 
 * @author Thiago Campos Viana
 */
ParallaxTest.prototype = new GameObject;
function ParallaxTest(){
    this.name="Parallax";
		
    this.start=function(){
        // 3 parallax only seems the run fine in firefox
        this.parallax = new Parallax("res/parallax-1.png",true);	
        this.parallax2 = new Parallax("res/parallax-2.png",true);
        this.parallax3 = new Parallax("res/parallax-3.png",true);
        this.parallax4 = new Parallax("res/parallax-4.png",true);
        this.parallax5 = new Parallax("res/parallax-5.png",true);
		
        this.parallax.speedX=30;
        this.parallax2.speedX=50;
        this.parallax3.speedX=60;
        this.parallax4.speedX=80;
        this.parallax5.speedX=100;
        
        this.parallax.speedY=30;
        this.parallax2.speedY=50;
        this.parallax3.speedY=60;
        this.parallax4.speedY=80;
        this.parallax5.speedY=100;
		
        this.parallax2.pos.y=50;
        this.parallax5.pos.y=-100;
        
        this.insertScript(this.parallax);
        this.insertScript(this.parallax2);
        this.insertScript(this.parallax3);
        this.insertScript(this.parallax4);
        this.insertScript(this.parallax5);
        
        
		

		
    };
    
    this.onKeyDown=function() {	
        console.log('down');
        if(Input.isKeyDown_z){
            this.parallax.repeatX=this.parallax.repeatX?false:true;
            this.parallax2.repeatX=this.parallax.repeatX;
            this.parallax3.repeatX=this.parallax.repeatX;
            this.parallax4.repeatX=this.parallax.repeatX;
            this.parallax5.repeatX=this.parallax.repeatX;
        }
        if(Input.isKeyDown_space){
            this.parallax.repeatY=this.parallax.repeatY?false:true;
            this.parallax2.repeatY=this.parallax.repeatY;
            this.parallax3.repeatY=this.parallax.repeatY;
            this.parallax4.repeatY=this.parallax.repeatY;
            this.parallax5.repeatY=this.parallax.repeatY;
        }

    }
	

}


