/**
 * MapEditor little test screen level.
 * @author Thiago Campos Viana
 */
/*
 * tileSet
 * 
 */
TileMap.prototype = new Script;
function TileMap(image,tileArray) {

    this.tileSet=new Image();
    this.tileSet.src=image;
    this.tiles=tileArray;

    this.render=function(g) {
        for(x=0;x<this.tiles.length;x++){
            for(y=0;y<this.tiles[x].length;y++){
                if(this.tileSet.complete && this.tiles[x][y]!=-1 
                        && x*Settings.tileWidth+Math.floor(this.parent.globalY)>-Settings.tileWidth*2
                        && x*Settings.tileHeight+Math.floor(this.parent.globalY)<Application.canvas.width+Settings.tileHeight*2
                        && y*Settings.tileHeight+Math.floor(this.parent.globalX)>-Settings.tileHeight*2
                        && y*Settings.tileHeight+Math.floor(this.parent.globalX)<Application.canvas.width+Settings.tileHeight*2){
                        cols=this.tileSet.width/Settings.tileWidth;
                        rows=this.tileSet.height/Settings.tileHeight;
                        try{
                            imgY=Math.floor(this.tiles[x][y]/cols);
                            imgX=(this.tiles[x][y]-(imgY*cols));
                            //console.log((this.tiles[x][y]/cols) + ' ' + imgY);
                            g.drawImage(this.tileSet, imgX*Settings.tileWidth, imgY*Settings.tileHeight, Settings.tileHeight, Settings.tileWidth, y*Settings.tileHeight+Math.floor(this.parent.globalX),x*Settings.tileWidth+Math.floor(this.parent.globalY), Settings.tileHeight, Settings.tileWidth);
                        } catch(err){
                            console.log(this.tiles[x][y] + ' ' + rows+ ' ' + this.tiles[x][y]/cols);
					
                        }
                    
                }
            }
        }	
    }	

}

