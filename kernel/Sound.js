var Sound = {


    playMusic:function(src){
		if(typeof(this.music) != 'undefined')this.music.stop();
		this.music = new Audio(src); 
		this.music.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
		this.music.play();
        
    },
	play:function(src){
		new Audio(src).play();	
	}


}
