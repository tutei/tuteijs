
/**
 *
 * @author Thiago Campos Viana
 */


Dialog=function(text,image, background, fontSize){
    
    if(typeof(background) != 'undefined')
        this.background=background;
        
    
    if(typeof(image) != 'undefined'){
        this.image=new Image();
        this.image.src=image;
        
    } else {
        this.image=new Object();
        this.image.complete=false;
    }

    this.updateRate=0.05;
    this.nextUpdate = this.updateRate;
    
    this.height=Application.canvas.height/3;
    this.y=this.height-this.height/10;
    this.width=Application.canvas.width-Application.canvas.width*2/30;
    this.x=this.width/30;
    
    
    // string array
    this.text=text;
    this.position=0;
    this.dialog=0;
    
    if(typeof(fontSize) == 'undefined')
        fontSize=24;
    
    this.stringHeight=fontSize;
    
    this.finished=false;
    this.finalAction=function(){};

    /**
     *
     * @return
     */
    this.update=function() {
        this.nextUpdate-=Time.deltaTime;

        if (this.nextUpdate>0) return 0;

        this.nextUpdate = this.updateRate;
        
        if( this.position < this.text[this.dialog].length - 1 )
            this.position++;
    }
    
    this.onKeyDown=function(e){
        if(Input.isKeyDown_space
            && this.position == this.text[this.dialog].length - 1
            && this.dialog == this.text.length - 1){
            this.destroy();
            this.finalAction();
            this.finished=true;
        }
        else if(Input.isKeyDown_space
            && this.position == this.text[this.dialog].length - 1 && this.dialog < this.text[this.dialog].length - 1 ){
            this.position=0;
            this.dialog++;
        } else if(Input.isKeyDown_space)this.position=this.text[this.dialog].length - 1;
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

        strings=this.text[this.dialog].substring(0, this.position + 1).split("\n");
        //strings=this.text[this.dialog];
        for(var k=0;k<strings.length;k++)
            g.fillText(strings[k], this.x + this.width/30, k*this.stringHeight*1.3 + this.y + this.stringHeight+this.height/10);

    }

}
Dialog.prototype=new Script;