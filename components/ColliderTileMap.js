/*
 * tileSet
 * 
 */
ColliderTileMap.prototype = new Script;
function ColliderTileMap(tileArray) {

    this.tiles=tileArray;
	
	
    this.start=function(){
	
		this.width=0;
		
		for(x=0;x<this.tiles.length;x++){
            for(y=0;y<this.tiles[x].length;y++){
                if(this.tiles[x][y]==-1 ){
				//if(this.tiles[x][y]!=-1 ){
						if(this.width>0){
							this.createBlock(this.width,x,y);	
						}
						this.width=0;
						//this.createBlock(1,x,y);

   
                } else this.width+=1;
            }
			if(this.width>0){
				this.createBlock(this.width,x,y);				
			}
			this.width=0;
			
        }
		
    };
	
	this.createBlock=function(width,x,y){
			//width--;


			collider=new Collider(Settings.tileWidth*width,Settings.tileHeight);
			go=new GameObject();
			this.parent.insertChild(go);
			y-=width;
			go.x=Math.floor(y*Settings.tileHeight+this.parent.x);
			go.y=Math.floor(x*Settings.tileWidth+this.parent.y);						
			go.insertScript(collider);
			go.collider.setStatic();
	
	};

}

