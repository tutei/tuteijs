/**
 * Access to application run-time data.
 * <p>
 * This class contains static methods for looking up
 * information about and controlling the run-time data.
 * @author Thiago Campos Viana
 */

var GameLoop=function(){		
    
    Application.clearScreen();
    Application.update();
    Application.render();
    Application.onGUI();
			
			
    if(!Application.interrupted){
        try {
            gLoop = setTimeout(GameLoop, Math.max(Application.synchFramerate(),0));
        } catch (err) {
        //alert("Error: SynchFramerate "+Math.max(0, difference) );
        }
    }
    
    Application.FPS=Application.frames/Time.timeSinceLevelLoad;
    if(Settings.showFPS){
        
        Application.g.font = "24pt Calibri";
        Application.g.fillStyle = "#ff0000"; // text color
        Application.g.fillText("FPS: "+Application.FPS, 50, 50);
        
    }
    
    Application.frames++;

}
 
 
var Application = {

    gameStatus:null,
    interrupted:false,
    /**
     * How long the update tooks to be completed.
     * <p>
     * It determines how long the app has to sleep
     * to keep a certain frame rate.
     */
    cycleTime:null,

    currentLevel:null,
    /**
     * Constant for the About Level Screen.
     * <p>
     * Constant value 0 is set to LEVEL_ABOUT.
     */
    LEVEL_ABOUT:0,
    /**
     * Constant for the Credits Level Screen.
     * <p>
     * Constant value 1 is set to LEVEL_CREDITS.
     */
    LEVEL_CREDITS:1,
    /**
     * Constant for the Ending Level Screen.
     * <p>
     * Constant value 2 is set to LEVEL_ENDING.
     */
    LEVEL_ENDING:2,
    /**
     * Constant for the GameOver Level Screen.
     * <p>
     * Constant value 3 is set to LEVEL_GAMEOVER.
     */
    LEVEL_GAMEOVER:3,
    /**
     * Constant for the Help Level Screen.
     * <p>
     * Constant value 4 is set to LEVEL_HELP.
     */
    LEVEL_HELP:4,
    /**
     * Constant for the LoadGame Level Screen.
     * <p>
     * Constant value 5 is set to LEVEL_LOADGAME.
     */
    LEVEL_LOADGAME:5,
    /**
     * Constant for the MainMenu Level Screen.
     * <p>
     * Constant value 6 is set to LEVEL_MAINMENU.
     */
    LEVEL_MAINMENU:6,
    /**
     * Constant for the NewGame Level Screen.
     * <p>
     * Constant value 7 is set to LEVEL_NEWGAME.
     */
    LEVEL_NEWGAME:7,
    /**
     * Constant for the Options Level Screen.
     * <p>
     * Constant value 8 is set to LEVEL_OPTIONS.
     */
    LEVEL_OPTIONS:8,
    /**
     * Constant for the Splash Level Screen.
     * <p>
     * Constant value 9 is set to SPLASH.
     */
    LEVEL_SPLASH:9,
    /**
     * Constant for the TheGame Level Screen.
     * <p>
     * Constant value 10 is set to LEVEL_THEGAME.
     */
    LEVEL_GAMEPLAY:10,
    rs:null,
    canvas:null,
    g:null,

    /**
     * Application private constructor (Singleton).
     * <p>
     * Calls super(false) so it can map all key events.
     * <p>
     * Variable interrupted is setted to false, and it will run while this
     * variable is false.
     * <p>
     * Private variable g is setted just this time.
     */

    loadSavedStatus:function(){
    /*
        try {
            rs = RecordStore.openRecordStore("MobileFramework", false);
            gameStatus = rs.getRecord(1);

        } catch (RecordStoreException ex) {
            try {
                rs = RecordStore.openRecordStore("MobileFramework", true);


                this.resetStatusArray();
                rs.addRecord(gameStatus, 0, gameStatus.length);

            } catch (RecordStoreException ex1) {
                ex1.printStackTrace();
            }



        }
		*/
    },

    saveStatus:function() {
        
    },

    resetStatusArray:function() {
    /*
        gameStatus = new Array();
        for (int i = 0; i < 100; i++) {
            gameStatus[i] = 0;
        }
		*/
    },


    /**
     * This function loads level by its index.
     * <br />
     * Calls LevelDB loadLevel, time since level load and then clears the screen.
     * <p>
     * <b>Example:</b>
     * <br />
     * // Loads the about screen.
     * <p>
     * Application.getInstance().levelLoad(0);
     * @param index
     * The level constant being requested.
     * @see LevelDB#loadLevel(int)
     */
    loadLevel:function(index) {
	
        Application.frames=1;
        Time.resetTimeSinceLevelLoad();
        this.clearScreen();
		
        if(isNaN(index))
        {		
            this.currentLevel = eval("new "+index+"()");
        } 
        else 
        {
            switch (index) {
                case Application.LEVEL_ABOUT:
                    this.currentLevel = About;
                    break;
                case Application.LEVEL_CREDITS:
                    this.currentLevel = Credits;
                    break;
                case Application.LEVEL_ENDING:
                    this.currentLevel = Ending;
                    break;
                case Application.LEVEL_GAMEOVER:
                    this.currentLevel = GameOver;
                    break;
                case Application.LEVEL_HELP:
                    this.currentLevel = Help;
                    break;
                case Application.LEVEL_LOADGAME:
                    this.currentLevel = LoadGame;
                    break;
                case Application.LEVEL_MAINMENU:
                    this.currentLevel = MainMenu;
                    break;
                case Application.LEVEL_NEWGAME:
                    this.currentLevel = NewGame;
                    break;
                case Application.LEVEL_OPTIONS:
                    this.currentLevel = Options;
                case Application.LEVEL_SPLASH:
                    this.currentLevel = Splash;
                    break;
                case Application.LEVEL_GAMEPLAY:
                    this.currentLevel = GamePlay;
                    break;
                default:
                    this.currentLevel = null;
                    break;
            }	
		
        }
        if(this.currentLevel!=null)this.currentLevel.start();		

    },

    /**
     * This function returns the current level loaded by the application.
     * @return
     * The current application level.
     */
    getCurrentLevel:function() {
        return this.currentLevel;
    },

    /**
     * This function fills the screen with white color
     */
    clearScreen:function() {
        this.g.fillStyle = Settings.screenColor;  		  
        this.g.beginPath();
        this.g.rect(0, 0, this.canvas.width, this.canvas.height);
        this.g.closePath();
        this.g.fill();
    },

    /**
     * The running loop.
     * <p>
     * It updates the Time and Input singleton.
     * <br />
     * Then calls the update, render, and onGUI method of current level.
     * <br />
     * Finally it sleeps for a while to keep the frame rate specified.
     * <p>
     * The first level loaded is the splash screen.
     * @see Splash
     */
    run:function(canvasID,levelID,width, height) {
	
        canvasID = typeof(canvasID) != 'undefined' ? canvasID : 'canvas';
        levelID = typeof(levelID) != 'undefined' ? levelID : 'Splash';
        width = typeof(width) != 'undefined' ? width : 640;
        height = typeof(height) != 'undefined' ? height : 480;

        this.canvas = document.getElementById(canvasID);
        this.g = this.canvas.getContext('2d');
		
        this.canvas.setAttribute('width',  width);
        this.canvas.setAttribute('height', height);
		
        Input.addMouseListener(this.canvas);
        Time.resetTimeSinceLevelLoad();
        this.loadSavedStatus();
		
        this.cycleTime = (new Date()).getTime();
        this.loadLevel(levelID);

        //Font f1 = Font.getFont(Font.FACE_MONOSPACE, Font.STYLE_PLAIN, Font.SIZE_SMALL);
        //g.setFont(f1);

        //Utils.inialise("/res/fontsmall.png");

        GameLoop(this);

    },

    /**
     * It updates the Time and Input singleton.
     * <br />
     * Then calls the current level update method.
     * @see Level#update()
     * @see Time#update()
     * @see Input#setKeyState(int)
     */
    update:function() {
		if(typeof(Physics) != 'undefined') Physics.update();
        Time.update();
        this.currentLevel.updateAll();  
		
    },



    /**
     *
     * @param g
     */
    render:function() {
        this.currentLevel.renderAll(this.g);
		if(typeof(Physics) != 'undefined') Physics.render();

    },

    /**
     *
     * @param g
     */
    onGUI:function() {
        this.currentLevel.onGUIAll(this.g);
    },

    synchFramerate:function() {
        this.cycleTime = this.cycleTime + Settings.FRAME_DELAY;
        return (this.cycleTime - (new Date()).getTime());
    },

    /**
     * Stops and exits the game.
     */
    quit:function() {
        this.interrupted = true;        
    }
};
