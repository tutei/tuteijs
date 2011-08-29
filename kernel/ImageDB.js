var ImageDB = {
	images:new Array(),
	
	get:function(src){
		return this.images[src];
	
	},
	
	percentLoaded:function(){
		var total=0;
		var completed=0;
		for (var x in this.images){
			total++;
			if(this.images[x].complete) completed++;
		}
		
		return completed/total;
	
	},
	
    load:function(res){
		for (var x in res){
			this.images[res[x]]=new Image();
			this.images[res[x]].src=res[x];
		
		}
    }

};