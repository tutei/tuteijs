var KEY = {
    SHIFT:16, 
    CTRL:17, 
    ESC:27, 
    RIGHT:39, 
    UP:38, 
    LEFT:37, 
    DOWN:40, 
    SPACE:32,
    A:65,    
    D:68,   
    E:69, 
    G:71, 
    L:76, 
    P:80, 
    R:82,
    S:83,
    W:87,
    X:88,
    Z:90
};

var Input = {
    mousePosition:{
        x:0,
        y:0
    },
    mouseIsDown:false,
    mouseMove:function(e)
    {
        if(e.offsetX) {
            Input.mousePosition.x = e.offsetX;
            Input.mousePosition.y = e.offsetY;
        }
        else if(e.layerX) {
            Input.mousePosition.x = e.layerX;
            Input.mousePosition.y = e.layerY;
			
            Input.mousePosition.x -= Application.canvas.offsetLeft;
            Input.mousePosition.y -= Application.canvas.offsetTop;
        }
    },
	
    mouseDown:function(e)
    {
        Application.currentLevel.onMouseDownAll(e);
        Input.mouseIsDown=true;
		
    },
	
    mouseUp:function(e)
    {
        Application.currentLevel.onMouseUpAll(e);
        Input.mouseIsDown=false;
		
    },
	
    addMouseListener:function(canvas){
        canvas.onmousedown = this.mouseDown;
        canvas.onmousemove = this.mouseMove;
        canvas.onmouseup = this.mouseUp;
    }

};

document.onkeydown = function(event)
{
        
    var keyCode = (event === null ? window.event.keyCode : event.keyCode);
    
    if(Utils.inArray(keyCode,KEY)){
        if(Settings.inputPreventDefault)event.preventDefault();
    }
        
    switch (keyCode)
    {
        case KEY.LEFT:
        {
            Input.isKeyDown_left = true;		   
            break;
        }

        case KEY.RIGHT:
        {
            Input.isKeyDown_right = true;
            break;
        }

        case KEY.UP:
        {
            Input.isKeyDown_up = true;
            break;
        }

        case KEY.DOWN:
        {
            Input.isKeyDown_down = true;
            break;
        }

        case KEY.SPACE:
        {
            Input.isKeyDown_space = true;
            break;
        }
		
		case KEY.A:
        {
            Input.isKeyDown_a = true;
            break;
        }
		
		case KEY.D:
        {
            Input.isKeyDown_d = true;
            break;
        }
		
		case KEY.S:
        {
            Input.isKeyDown_s = true;
            break;
        }
		
		case KEY.W:
        {
            Input.isKeyDown_w = true;
            break;
        }

        case KEY.Z:
        {
            Input.isKeyDown_z = true;
            break;
        }
		
		

		
    }
    Application.currentLevel.onKeyDownAll(event);

};

document.onkeyup = function(event)
{
        
    var keyCode = (event === null ? window.event.keyCode : event.keyCode);

    switch (keyCode)
    {
        case KEY.LEFT:
        {
            Input.isKeyDown_left = false;		   
            break;
        }

        case KEY.RIGHT:
        {
            Input.isKeyDown_right = false;		   
            break;
        }

        case KEY.UP:
        {
            Input.isKeyDown_up = false;		   
            break;
        }

        case KEY.DOWN:
        {
            Input.isKeyDown_down = false;		   
            break;
        }

        case KEY.SPACE:
        {
            Input.isKeyDown_space = false;		   
            break;
        }
		
		case KEY.A:
        {
            Input.isKeyDown_a = false;
            break;
        }
		
		case KEY.D:
        {
            Input.isKeyDown_d = false;
            break;
        }
		
		case KEY.S:
        {
            Input.isKeyDown_s = false;
            break;
        }
		
		case KEY.W:
        {
            Input.isKeyDown_w = false;
            break;
        }

        case KEY.Z:
        {
            Input.isKeyDown_z = false;		   
            break;
        }
    }
    Application.currentLevel.onKeyUpAll(event);
};