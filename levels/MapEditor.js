/**
 * MapEditor little test screen level.
 * @author Thiago Campos Viana
 */
MapEditor.prototype = new GameObject;
function MapEditor() {
    this.name="MapEditor",
    this.pallete=0,
    this.tileSet=null,
	this.layer=0,
		
    this.start=function(){
		this.tiles=new Array();
		this.insertLayer();		
    },
	
	this.floodFill=false,
	
	this.insertLayer=function(){
		
		this.tileObj=new GameObject('Layer'+this.children.length);
        this.insertChild(this.tileObj);
		this.tileObj.x=this.x;
		this.tileObj.y=this.y;
		// totalX and totalY now are global variables
        //totalY=Math.floor(Application.canvas.width/Settings.tileHeight);
        //totalX=Math.floor(Application.canvas.height/Settings.tileWidth);
        tiles=new Array();
        for(x=0;x<totalY;x++){
            tiles[x]=new Array();
            for(y=0;y<totalX;y++){
                tiles[x][y]=-1;				
            }
        }
		this.tiles.push(tiles);
		this.tileObj.insertScript(new TileMap('res/tileset.png',this.tiles[(this.tiles.length-1)]));
		
	
	}
	


    this.update=function() {
		
        if ( Input.mouseIsDown ){
            y=Math.floor((Input.mousePosition.x-this.x)/Settings.tileHeight);
            x=Math.floor((Input.mousePosition.y-this.y)/Settings.tileWidth);

            //console.log(this.pallete);	
            if( x>=0 && y>=0 && x < this.tiles[this.layer].length && y < this.tiles[this.layer][x].length ){
                if(!this.floodFill)this.tiles[this.layer][x][y]=this.pallete;
				else Utils.floodFill(this.tiles[this.layer],x,y,this.tiles[this.layer][x][y],this.pallete);
				
				
            }
        } 
		move=100;
		if(Input.isKeyDown_right || Input.isKeyDown_d){
			this.x-=move*Time.deltaTime;
			for(var i in this.children)
                this.children[i].x-=move*Time.deltaTime;

        }
		
		if(Input.isKeyDown_left || Input.isKeyDown_a){
			this.x+=move*Time.deltaTime;
			for(var i in this.children)
                this.children[i].x+=move*Time.deltaTime;

        }
		
		if(Input.isKeyDown_up || Input.isKeyDown_w){
			this.y+=move*Time.deltaTime;
			for(var i in this.children)
                this.children[i].y+=move*Time.deltaTime;

        }
		
		if(Input.isKeyDown_down || Input.isKeyDown_s){
			this.y-=move*Time.deltaTime;
			for(var i in this.children)
                this.children[i].y-=move*Time.deltaTime;

        }


    }    	

}

