/**
 *
 * @author Thiago Campos Viana
 */


Sprite=function(image, animation, startAnim,width,height){        
    
    this.image=new Image();
    this.image.src=image;
        
    this.animation=animation;
    this.animPos=startAnim;
    this.updateRate=0.25;
    this.nextUpdate = this.updateRate;
    
    this.width = typeof(width) != 'undefined' ? width : Settings.tileWidth;
    this.height = typeof(height) != 'undefined' ? height : Settings.tileHeight;
    
    
    this.y=0;
    this.x=0;
    
    this.position=0;
	
    this.play=false;
    
    this.setAnimation=function(animPos){
        this.animPos=animPos;
        this.position=0;
    }
    
    this.start=function(){
        this.parent.sprite=this;
    }

    /**
     *
     * @param g
     */
    this.render=function(g) {
        cols=this.image.width/this.width;
        rows=this.image.height/this.height;        
        
        if(this.image.complete
            && Math.floor(this.x+this.parent.globalX)>-this.width*2
            && Math.floor(this.x+this.parent.globalX)<Application.canvas.width+this.width*2
            && Math.floor(this.y+this.parent.globalY)>-this.height*2
            && Math.floor(this.y+this.parent.globalY)<Application.canvas.height+this.height*2){
            imgY=Math.floor(eval("this.animation."+this.animPos)[this.position]/cols);
            imgX=(eval("this.animation."+this.animPos)[this.position]-(imgY*cols));
            g.drawImage(this.image, imgX*this.width, imgY*this.height,
                this.height, this.width, Math.floor(this.x+this.parent.globalX),
                Math.floor(this.y+this.parent.globalY), this.height, this.width);
        }
	

        this.nextUpdate-=Time.deltaTime;

        if (this.nextUpdate>0) return 0;

        this.nextUpdate = this.updateRate;
        animLength=eval("this.animation."+this.animPos).length;
        if( this.play && this.position < animLength - 1 && animLength>1) this.position++;
        else if(this.play) this.position=0;
        else this.position=0;        
		
    }

}
Sprite.prototype=new Script;