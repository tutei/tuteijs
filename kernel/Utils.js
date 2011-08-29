//function to get random number from range
var Utils = {
	endsWith:function(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	},


    rangedRandom:function(min,max,toFloat)
    {
        var rand = min+(Math.random()*(max-min));
        return typeof toFloat=='undefined'?Math.round(rand):rand.toFixed(toFloat);
    },
    
    inArray:function(key,array)
    {
        for(var i in array)
        {
            if(array[i]===key) return true;
        }
        return false;
    },
	
	floodFill:function(array,x,y,target, replacement){
		if(x>=0 && x<array.length && y>=0 && 
			y<array[x].length && array[x][y] == target && array[x][y]!=replacement) {
			array[x][y] = replacement;
			this.floodFill(array,x+1,y,target, replacement);
			this.floodFill(array,x-1,y,target, replacement);
			this.floodFill(array,x,y+1,target, replacement);
			this.floodFill(array,x,y-1,target, replacement);
		}
	
	},
	
	supportsStorage:function() {
	  try {
		return 'localStorage' in window && window['localStorage'] !== null;
	  } catch (e) {
		return false;
	  }
	}

}