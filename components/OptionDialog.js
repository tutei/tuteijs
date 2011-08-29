
/**
 *
 * @author Thiago Campos Viana
 */


OptionDialog=function(text,image, background){
    
    if(typeof(background) != 'undefined')
        this.background=background;
        
    
    if(typeof(image) != 'undefined'){
        this.image=new Image();
        this.image.src=image;
        
    } else {
        this.image=new Object();
        this.image.complete=false;
    }

    this.updateRate=Application.FPS/20;
    this.nextUpdate = this.updateRate;
    
    this.height=Application.canvas.height/3;
    this.y=this.height-this.height/10;
    this.width=Application.canvas.width-Application.canvas.width*2/30;
    this.x=this.width/30;
    
    
    // string array
    this.text=text;
    this.position=0;
    this.option=0;
    this.stringHeight=24;
    
    this.finished=false;
    this.finalAction=function(){};

    /**
     *
     * @return
     */
    this.update=function() {
        this.updateRate=Application.FPS/20;
        this.nextUpdate--;

        if (this.nextUpdate>0) return 0;

        this.nextUpdate = this.updateRate;
        
        if( this.position < this.text[this.option].length - 1 )
            this.position++;
    }
    
    this.onKeyDown=function(e){
        if(Input.isKeyDown_down){
            if(this.option==this.text.length-1) this.option=0;
			else this.option++;
        }
        else if(Input.isKeyDown_up){
			if(this.option==0) this.option=this.text.length-1;
            else this.option--;
        } else if(Input.isKeyDown_space){
			this.destroy();
            this.finalAction();
            this.finished=true;
        }
    }

    /**
     *
     * @param g
     */
    this.render=function(g) {
        
        if(this.image.complete){
            if(!this.background)
                g.drawImage(this.image, this.x, this.y-this.image.height-this.height/10);
            else g.drawImage(this.image, 0, 0);
        }
       
        g.fillStyle = "rgba(0, 00, 99, 1.0)";

        g.beginPath();
        g.rect(this.x,this.y, this.width, this.height);
        g.closePath();
        g.lineWidth = 4;
        g.strokeStyle = "#ff0000";
        g.stroke();
        g.fill();
        
        g.font = this.stringHeight+"pt monospace";
        g.fillStyle = "#fff"; // text color

        strings=this.text;
        //strings=this.text[this.option];
        for(var k=0;k<strings.length;k++) {
			var fc='  ';
			if(k==this.option) fc ='* ';
            g.fillText(fc+strings[k], this.x + this.width/30, k*this.stringHeight*1.3 + this.y + this.stringHeight+this.height/10);
		}

    }

}
OptionDialog.prototype=new Script;