var LoaderPosition={
    TOP:0,
    MIDDLE:1,
    BOTTOM:2
};
Loader=function(images,nextLevel, position){
    this.name="LoadScreen";
    this.height=20;
    this.nextLevel=nextLevel;

    this.position=0;
    this.updateRate=0.3;
    this.nextUpdate = this.updateRate;
    
    ImageDB.load(images);
    
    if(typeof(position) == 'undefined')
        position=LoaderPosition.TOP;

    switch(position){
        case LoaderPosition.TOP:
            this.posY=this.height*3;
            break;
        case LoaderPosition.MIDDLE:
            this.posY=Application.canvas.height/2-this.height/2;
            break;
        case LoaderPosition.BOTTOM:
            this.posY=Application.canvas.height-this.height*3;
            break;
    }
    
    
    
    
    
    this.update=function() {
        
        if(ImageDB.percentLoaded()==1) Application.loadLevel(this.nextLevel);

        this.nextUpdate-=Time.deltaTime;

        if (this.nextUpdate>0) return 0;

        this.nextUpdate = this.updateRate;
					
        if( this.position < 3 ){
            this.position++;
        } else {
            this.position=0;
        }
    }
				
    this.render=function(g){
        g.font = "bold 14pt Monospace";
        g.fillStyle = "#fff"; // text color
        var extra='';
        for (var x = 0;x < this.position; x++) extra+='.';
        var percent=ImageDB.percentLoaded();
        g.fillText("Loading(" +Math.round(100*percent)+ "%)" + extra, 10, this.posY-this.height);
        g.fillText("tutei.com", Application.canvas.width-110, Application.canvas.height-20);
					
        g.fillStyle = "rgba(255, 255, 255, 0.5)";

        g.beginPath();
        g.rect(10,this.posY, Application.canvas.width - 20, this.height);
        g.closePath();
        g.lineWidth = 4;
        g.strokeStyle = "#00ff00";
        g.stroke();
        g.fill();
					
        g.fillStyle = "rgba(55, 255, 255, 1.0)";

        g.beginPath();
        g.rect(10,this.posY, Math.round((Application.canvas.width-20)*percent), this.height);
        g.closePath();
        g.fill();
				
				
				
    }

}
Loader.prototype=new Script;

