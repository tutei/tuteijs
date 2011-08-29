ShowName=function(){
    this.width = Settings.tileWidth;
    this.height = Settings.tileHeight;
                
    this.render=function(g){
        
        if( Math.floor(this.parent.globalX)>-this.width*2
            && Math.floor(this.parent.globalX)<Application.canvas.width+this.width*2
            && Math.floor(this.parent.globalY)>-this.height*2
            && Math.floor(this.parent.globalY)<Application.canvas.height+this.height*2){
            width=10;
            g.font = "bold "+width+"pt Monospace";
            g.fillStyle = "#000000"; // text color

            g.fillText(this.parent.name, this.parent.globalX - (this.parent.name.length+1)*(width-4)/4, this.parent.globalY-10);
            hp=this.parent.hp/this.parent.max_hp;
            g.fillStyle = "rgba(255, 255, 255, 0.0)";

            g.beginPath();
					
            if(hp>0.7)
                g.fillStyle = "#00ff00";
            else if(hp>0.4)
                g.fillStyle = "#ffff00";
            else g.fillStyle = "#ff0000";
            if(hp>0)
                g.rect(this.parent.globalX - Settings.tileWidth/8, this.parent.globalY - 7, Settings.tileWidth*hp, 5);
        
            g.closePath();
            g.lineWidth = 1;
            g.strokeStyle = "#000000";
            g.stroke();
            g.fill();

        }         
                            
    }
};
            
ShowName.prototype=new Script;
