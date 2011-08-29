var Time = {

    /**
     * Time since app has started in ms
     */
    time:0,

    /**
     * Time since last level was loaded in ms
     */
    timeSinceLevelLoad:0,

    /**
     * Time between current frame and last frame update in ms
     */
    deltaTime:0,

    /**
     * Current time in ms
     */
    base:0,

    /**
     * Updates all important variables every frame update.
     */
    update:function(){
		
        this.deltaTime=((new Date()).getTime()-this.base)/1000;
        this.base = (new Date()).getTime();
        this.time+=this.deltaTime;
        this.timeSinceLevelLoad+=this.deltaTime;
    //alert(this.timeSinceLevelLoad);
        
    },

    /**
     * Resets variable timeSinceLevelLoad, so it will be 0 again.
     */
    resetTimeSinceLevelLoad:function(){
        this.base=(new Date()).getTime();
        this.timeSinceLevelLoad=0;
    }

}
