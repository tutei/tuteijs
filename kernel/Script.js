/**
 *
 * @author Thiago Campos Viana
 */
function Script(){

    this.parent=null;
    this.level=null;


    this.start=function(){};

    this.update=function(){};

    this.onGUI=function(g){};
    
    this.render=function(g){};
    
    this.destroy=function(){
        this.destroyFlag=true;
        for (var i in this.parent.scripts) {
			
            if(typeof(this.parent.scripts[i].destroyFlag)!='undefined'){
                this.parent.scripts.splice(i,1);
                break;
            }
            
        }
    }

    this.onMessage=function(message){};
	
    this.onCollisionEnter=function(other) {};
    
    this.onCollisionStay=function(other) {};

    this.onCollisionExit=function(other) {};
    
    this.onKeyUp=function(e) {};
    
    this.onKeyDown=function(e) {};
    
    this.onMouseUp=function(e) {};
    
    this.onMouseDown=function(e) {};

    /*
    this.onTriggerEnter=function(other) {};

    this.onTriggerStay=function(other) {};

    this.onTriggerExit=function(other) {};
    */

}
