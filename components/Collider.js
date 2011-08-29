Collider.prototype = new Script;
/*Todo: add fixedRotation option*/

function Collider(width,height){
    this.width = typeof(width) != 'undefined' ? width : Settings.tileWidth;
    this.height = typeof(height) != 'undefined' ? height: Settings.tileHeight;
    this.name="Collider";
    
    this.start=function(){
        
        fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.0;
        fixDef.restitution = 0.05;
    
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(
            this.width/(Settings.tileWidth*2) //half width
            ,  this.height/(Settings.tileHeight*2) //half height
            );
            

        bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
         
    
    
        bodyDef.position.x = this.parent.x/Settings.tileWidth+width/(Settings.tileWidth*2);
        bodyDef.position.y = this.parent.y/Settings.tileHeight+height/(Settings.tileWidth*2);
        this.body=Physics.world.CreateBody(bodyDef);
        this.fixture=this.body.CreateFixture(fixDef);
        this.body.gameObject=this.parent;
        this.body.collider=this;
        this.isTrigger=false;
        this.parent.collider=this;
        

    }
    
    this.setFixedRotation=function(flag){
        this.body.SetFixedRotation(flag);       
        
    }
    
    this.setStatic=function(){
        this.body.SetType(b2Body.b2_staticBody);        
        
    }
    
    this.setDynamic=function(){
        this.body.SetType(b2Body.b2_dynamicBody);
        
    }
    
    this.setIsTrigger=function(value){
        this.isTrigger=value;
        this.body.GetFixtureList().SetSensor(value);
    }
    
    this.setShape=function(width,height){
        this.width = width;
        this.height = height;
        
        fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.0;
        fixDef.restitution = 0.0;
    
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(
            this.width/(Settings.tileWidth*2) //half width
            ,  this.height/(Settings.tileHeight*2) //half height
            );
        /*
                fixDef.shape = new b2CircleShape(
                    0.5 //radius
                    );
        */
        this.body.DestroyFixture(this.body.GetFixtureList());
        this.body.CreateFixture(fixDef);
        console.log('vcc');
    }
    
    this.setPosition=function(px,py){
        position={
            x:px/Settings.tileWidth,
            y:py/Settings.tileHeight
        };
        this.body.SetPosition(position);
        this.parent.x=this.body.GetPosition().x*Settings.tileWidth-this.width/2;
        this.parent.y=this.body.GetPosition().y*Settings.tileHeight-this.height/2;
        
    }
	
    this.destroy=function(){
        
        this.body.destroy=true;   

    }

    this.update=function() {		 
        this.parent.x=this.body.GetPosition().x*Settings.tileWidth-this.width/2;
        this.parent.y=this.body.GetPosition().y*Settings.tileHeight-this.height/2;
    };

}




