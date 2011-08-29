Parallax.prototype = new Script; //inherit from Particle
function Parallax(image, repeatX,repeatY){

    this.name="Parallax";
    this.pos={
        x:0,
        y:0
    };
    this.offset={
        x:0,
        y:0
    };
    this.speedX=6.0;
    this.speedY=6.0;

    this.repeatX = typeof(repeatX) == 'undefined' ? false : repeatX;
    this.repeatY = typeof(repeatY) == 'undefined' ? false : repeatY;
	
	


		
    this.image = new Image();
    this.image.src = image;		
		

    this.render=function(g) {

        if(this.image.complete){
		
            if(this.repeatX && this.repeatY){
                for(x=-this.image.width;x<=Application.canvas.width+this.image.width;x+=this.image.width-1)
                    for(y=-this.image.height;y<Application.canvas.height+this.image.height;y+=this.image.height-1)
                        g.drawImage(this.image,x-this.offset.x+this.pos.x,y-this.offset.y+this.pos.y);
            } else if( this.repeatX ) {			
                for(x=-this.image.width;x<Application.canvas.width+this.image.width;x+=this.image.width-1)
                    g.drawImage(this.image, x-this.offset.x+this.pos.x, this.pos.y);
		
            //g.drawImage(this.image, 0, 0, this.image.height, this.image.width, x-this.offset.x,0, this.image.height, this.image.width);
            } else if( this.repeatY ){
                for(y=-this.image.height;y<Application.canvas.height+this.image.height;y+=this.image.height-1)
                    g.drawImage(this.image, this.pos.x, y-this.offset.y);		
            } else {
                g.drawImage(this.image, this.pos.x, this.pos.y);			
            }
			
			
            if(this.offset.x<-this.image.width/2 )this.offset.x+=this.image.width;
            else if( this.offset.x>this.image.width/2) this.offset.x-=this.image.width;
			
            if(this.offset.y<-this.image.height/2 )this.offset.y+=this.image.height;
            else if( this.offset.y>this.image.height/2) this.offset.y-=this.image.height;
			
            if(this.repeatX)this.offset.x+=this.speedX*Time.deltaTime;
            if(this.repeatY)this.offset.y+=this.speedY*Time.deltaTime;

        }
		

		 

    };



}