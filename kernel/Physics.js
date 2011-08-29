var     b2Vec2 = Box2D.Common.Math.b2Vec2,
b2AABB = Box2D.Collision.b2AABB,
b2BodyDef = Box2D.Dynamics.b2BodyDef,
b2Body = Box2D.Dynamics.b2Body,
b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
b2Fixture = Box2D.Dynamics.b2Fixture,
b2World = Box2D.Dynamics.b2World,
b2MassData = Box2D.Collision.Shapes.b2MassData,
b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

var Physics = {
    
    debug:false,    
         
    world : new b2World(
        new b2Vec2(0, 10)    //gravity
        ,  true                 //allow sleep
        ),
            
    startDebug:function(){
        this.debug=true;
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(Application.g);
        debugDraw.SetDrawScale(Settings.physicsScale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
        this.world.m_debugDraw.m_sprite.graphics.clear=function(){};
        
    },
    
    update:function(){
        
        var body = this.world.GetBodyList();
        
        while(body) {

            if(typeof(body.destroy)!='undefined'){
                console.log(Physics.world.IsLocked());
                _body=body.m_next;
                Physics.world.DestroyBody(body);
                body=_body;
                
                
            } else body=body.m_next;
        }
        this.world.Step(
            1 / Math.max(Application.FPS,10)   //frame-rate
            ,  10      //velocity iterations
            ,  10       //position iterations
            );
		 
        
        this.world.ClearForces();
        
    },
	render:function(){
		if(this.debug)this.world.DrawDebugData();
	}
};

Physics.Listener = function(){};
Physics.Listener.prototype = new Box2D.Dynamics.b2ContactListener();

// Define your listener functions 
Physics.Listener.prototype.Add = function( points ) {
    console.log( 
        'contact added',
        points.shape1.GetBody(),
        points.shape2.GetBody()
        );
};

Physics.Listener.prototype.Remove = function( points ) {
    console.log( 
        'contact removed',
        points.shape1.GetBody(),
        points.shape2.GetBody()
        );
};

Physics.Listener.prototype.BeginContact = function( points ) {
    
    if(typeof(points.m_fixtureA.GetBody().gameObject) != 'undefined' && points.m_fixtureA.GetBody().gameObject != null)
        points.m_fixtureA.GetBody().gameObject.onCollisionEnterAll(points.m_fixtureB.GetBody());
    
    if(typeof(points.m_fixtureB.GetBody().gameObject) != 'undefined' && points.m_fixtureB.GetBody().gameObject != null)
        points.m_fixtureB.GetBody().gameObject.onCollisionEnterAll(points.m_fixtureA.GetBody());
	
};


Physics.Listener.prototype.EndContact = function( points ) {
    if(typeof(points.m_fixtureA.GetBody().gameObject) != 'undefined' && points.m_fixtureA.GetBody().gameObject != null)
        points.m_fixtureA.GetBody().gameObject.onCollisionExitAll(points.m_fixtureB.GetBody());
    
    if(typeof(points.m_fixtureB.GetBody().gameObject) != 'undefined' && points.m_fixtureB.GetBody().gameObject != null)
        points.m_fixtureB.GetBody().gameObject.onCollisionExitAll(points.m_fixtureA.GetBody());

};


Physics.world.SetContactListener( new Physics.Listener() );


