/**
 * Particles test screen level.
 * 
 * 
 * @author Thiago Campos Viana
 */
ParticleTest.prototype = new GameObject;
function ParticleTest() {
    this.name="Particle";
		
    this.start=function(){		
        //this.x=100;
        this.ps = new ParticleSystem();
        this.insertScript(this.ps);
        this.ps.init(1000, 150, 150, 30, 30);
        this.ps.setParticlesColor("#ff0000");
        this.ps.setParticlesValues( -100, 100, -150, 150, 1, 5);
        this.ps.oneShot=false;		
    },
	


    this.onKeyDown=function() {	

        if(Input.isKeyDown_left){
            this.ps.setPos(150, 150, 30, 30);
            this.ps.setParticlesValues( -200, 200, -100, 100, 1, 10);
        }
        if(Input.isKeyDown_right){
            this.ps.setPos(0, 0, 10, 10);
            this.ps.setParticlesValues( 200, 500, 100, 100, 1, 5);
        }
        if(Input.isKeyDown_down){
            this.ps.setPos(0, 0, 400, 400);
            this.ps.setParticlesValues( 0, 0, 100, 100, 1, 5);
        }
		
        if(Input.isKeyDown_space){
            this.ps.setPos(300, 300, 20, 20);
            this.ps.setParticlesValues( -100, 100, -100, -200, 1, 2);
        }
		
        if(Input.isKeyDown_up){
            this.ps.oneShot=this.ps.oneShot==true?false:true;
        }

    }
    /*
    this.onMouseUp=function(e) {console.log('mouse up')};
    
    this.onMouseDown=function(e) {console.log('mouse down')};
    */

}






