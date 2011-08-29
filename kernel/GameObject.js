/**
 *
 * @author Thiago Campos Viana
 */

var Orientation = {
    UP:0,
    RIGHT:1,
    DOWN:2, 
    LEFT:3
};
 
function GameObject(name, layer) {

    this.children=new Array();
    this.scripts=new Array();
    this.animation=null;
    this.active=true;
    this.parent=null;
    this.x=0;
    this.y=0;
    this.orientation=Orientation.RIGHT;

    this.name = typeof(name) != 'undefined' ? name : 'GameObject';
    this.layer = typeof(layer) != 'undefined' ? layer : 0;

    this.children = new Array();
    this.scripts = new Array();
    this.active = true;

    

    this.destroy=function() {

        
        this.active=false;
        if(this.collider){           

            this.collider.destroy();              
            
        }
        if(this.parent==null) return;
		
        this.destroyFlag=true;
        for (var i in this.parent.children) {
			
            if(typeof(this.parent.children[i].destroyFlag)!='undefined'){
                this.parent.children.splice(i,1);
                break;
            }
            
        }

    }

    this.start=function(){
        
    }
	
    this.findObjectsOfType=function(type,list){
		
        list = typeof(list) != 'undefined' ? list : new Array();
        for (i = 0; i < this.scripts.length; i++) {
            if (typeof(this.scripts[i]) == type) {
                list.push(this.scripts[i]);
            }

            this.scripts[i].findObjectsOfType(type, list);

        }
		
        return list;
	
    }

    this.insertAnimation=function(animation) {
        level = this.getRoot();
        
        if (this.animation != null) {
            this.animation.cancel();
            this.getRoot().layerManager.remove(this.animation.sprite);
        }
        if (animation != null) {
            
            this.animation = animation;
            Time.getInstance().timer.scheduleAtFixedRate(animation, 0, Settings.walkDelay);
            
            
            if (this.animation.sprite != null) 
                level.layerManager.append(this.animation.sprite);
            
            
            
        }

        if (level.terrain != null)
            level.layerManager.append(level.terrain);

    }

    this.insertScript=function(script) {

        script.parent = this;
        script.level = this.getRoot();
        script.start();
        this.scripts.push(script);   
        
    }

    this.insertChild=function(child) {

        child.parent = this;
        child.updateGlobalPos();
        //child.insertAnimation(child.animation);
        child.start();
        this.children.push(child);

        


    }

    this.find=function(layer) {

        list = new Array();
        this.getRoot().findChildren(layer, list);
        return list;

    }

    this.findChildren=function(layer,list) {
        for (i = 0; i < this.children.length; i++) {
            if (this.children[i].layer == layer) {
                list.push(this.children[i]);
            }

            this.children[i].findChildren(layer, list);


        }

    }

    this.onMessage=function(message) {
    }

    this.sendMessage=function(message, receiver) {
        receiver.onMessage(message);
    }

    this.broadCastMessage=function(message) {
        for (i = 0; i < this.children.length; i++) {

            this.children[i].onMessage(message);

            this.children[i].broadCastMessage(message);


        }
    }
    /*
    this.find=function(name) {

        return this.getRoot().findChild(name);

    }
    
    this.findChild=function(name) {
        for (i = 0; i < this.children.size(); i++) {
            if (((GameObject) children.elementAt(i)).name.compareTo(name) == 0) {
                return ((GameObject) children.elementAt(i));
            }
            GameObject childFind = ((GameObject) children.elementAt(i)).findChild(name);
            if (childFind != null) {
                return childFind;
            }

        }
        return null;
    }
    */
    this.getRoot=function() {
        if (this.parent != null) {
            return this.parent.getRoot();
        } else {
            return this;
        }
    }

    this.update=function() {
    }
    
    this.updateGlobalPos=function(){
        this.globalX=this.x;
        this.globalY=this.y
        parent=this.parent;
        while(parent){
            this.globalX+=parent.x;
            this.globalY+=parent.y;
            parent=parent.parent;
        }
    }

    this.updateAll=function() {
        
        if (this.active) {
            this.updateGlobalPos();
            this.update();            
			
            for (var i in this.children) {
                this.children[i].updateAll();
            }
            
            for (var i in this.scripts) {
                this.scripts[i].update();
                
            }
			
            //console.log(this.hasCollision);
            if(this.hasCollision){
                this.onCollisionStayAll(this.collisionObject);
            }
			
			
        }      
		

    }
    
    /**
     *
     * @param g
     */
    this.render=function(g) {
    }

    /**
     *
     * @param g
     */
    this.renderAll=function(g) {
		
        if (this.active) {
            this.render(g);
            for (var i in this.children) {
                this.children[i].renderAll(g);
            }
            for (var i in this.scripts) {
                this.scripts[i].render(g);
            }
        }
		
    }

    /**
     *
     * @param g
     */
    this.onGUI=function(g) {
    }

    /**
     *
     * @param g
     */
    this.onGUIAll=function(g) {
		
        if (this.active) {
            this.onGUI(g);
            for (var i in this.scripts) {
                this.scripts[i].onGUI(g);
            }
            for (var i in this.children) {
                this.children[i].onGUIAll(g);
            }
        }
		
    }

    this.setPosition=function(x, y, orientation) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    /*
        if (this.animation.sprite != null) {
            this.animation.sprite.setPosition(x * Settings.tileWidth, y * Settings.tileHeight);
        }
        */
    }
    
    this.onCollisionEnter=function(other) {};
    
    this.onCollisionStay=function(other) {};

    this.onCollisionExit=function(other) {};
    
    /**
     *
     * @param other
     */
    this.onCollisionEnterAll=function(other) {
        this.hasCollision=true;
        this.collisionObject=other;
        this.onCollisionEnter(other);
        if (this.active) {
            for (var i in this.scripts) {
                this.scripts[i].onCollisionEnter(other);
            }
            for (var i in this.children) {
                this.children[i].onCollisionEnterAll(other);
            }
        }
    }
    
    /**
     *
     * @param other
     */
    this.onCollisionStayAll=function(other) {
        if (this.active) {
            this.onCollisionStay(other);
            for (var i in this.scripts) {
                this.scripts[i].onCollisionStay(other);
            }
            for (var i in this.children) {
                this.children[i].onCollisionStayAll(other);
            }
        }
    }
    
    /**
     *
     * @param other
     */
    this.onCollisionExitAll=function(other) {
        this.hasCollision=false;
        this.collisionObject=null;
        if (this.active) {
            this.onCollisionExit(other);
            for (var i in this.scripts) {
                this.scripts[i].onCollisionExit(other);
            }
            for (var i in this.children) {
                this.children[i].onCollisionExitAll(other);
            }
        }
    }
    
    this.onKeyUp=function(e) {};
    
    this.onKeyDown=function(e) {};
    
    this.onKeyDownAll=function(e) {
        if (this.active) {
            this.onKeyDown(e);
            for (var i in this.scripts) {
                this.scripts[i].onKeyDown(e);
            }
            for (var i in this.children) {
                this.children[i].onKeyDownAll(e);
            }
        }
    }
    
    this.onKeyUpAll=function(e) {
        if (this.active) {
            this.onKeyDown(e);
            for (var i in this.scripts) {
                this.scripts[i].onKeyUp(e);
            }
            for (var i in this.children) {
                this.children[i].onKeyUpAll(e);
            }
        }
    }
    
    this.onMouseUp=function(e) {};
    
    this.onMouseDown=function(e) {};
    
    this.onMouseDownAll=function(e) {
        if (this.active) {
            this.onMouseDown(e);
            for (var i in this.scripts) {
                this.scripts[i].onMouseDown(e);
            }
            for (var i in this.children) {
                this.children[i].onMouseDownAll(e);
            }
        }
    }
    
    this.onMouseUpAll=function(e) {
        if (this.active) {
            this.onMouseUp(e);
            for (var i in this.scripts) {
                this.scripts[i].onMouseUp(e);
            }
            for (var i in this.children) {
                this.children[i].onMouseUpAll(e);
            }
        }
    }
}
