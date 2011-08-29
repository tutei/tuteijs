
function Particle() {

    //particle position
    this.x = 0;
    this.y = 0;

    //particle velocity
    this.vx = 0;
    this.vy = 0;

    this.time = 0;
    this.life = 0;
    this.color = "#000000";
    //vx,vy in pixels/seconds, life in seconds
    this.setValues = function(x, y, vx, vy,life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        //console.log(this.vx);
        this.time = 0;
        //this.life = Math.floor(Math.random() * 50);
        this.life=(typeof life == "undefined")?10:life;
    }

    this.setColor = function(color) {
        this.color = color;
    }

    this.render = function(ctx) {
        if (this.time < this.life){
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        }
    }

}

function ParticleSystem(partycleType) {

    //origin rectangle of the this.particles
    this.x0;
    this.y0;
    this.x1;
    this.y1;
    this.oneShot=false;
	
    this.life={
        min:0,
        max:100
    };
    this.vx={
        min:0,
        max:100
    };
    this.vy={
        min:0,
        max:100
    };

    this.n = 0;
    this.particles = [];
    this.gravity = 1;
	
    partycleType=(typeof partycleType == "undefined")?Particle:partycleType;

    this.init = function(n, x0, y0, x1, y1) {
        this.n = n;
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.gravity = 1;
        for (var i = 0; i < n; i++)
            this.particles.push(new partycleType());
    // fountain 	this.particles[i].setValues(Math.floor(Math.random() * this.x1) + this.x0, Math.floor(Math.random() * this.y1) + this.y0, Utils.rangedRandom(-10,10), -10);
    // launcher this.particles[i].setValues(Math.floor(Math.random() * this.x1) + this.x0, Math.floor(Math.random() * this.y1) + this.y0, 10, -10);
    // sparksthis.particles[i].setValues(Math.floor(Math.random() * this.x1) + this.x0, Math.floor(Math.random() * this.y1) + this.y0, Utils.rangedRandom(-10,10), Utils.rangedRandom(-10,10),Math.floor(Math.random() * 10));

    //this.particles[i].setValues(Math.floor(Math.random() * this.x1) + this.x0, Math.floor(Math.random() * this.y1) + this.y0, Utils.rangedRandom(-10,10), Utils.rangedRandom(-10,10),Math.floor(Math.random() * 10));
		
    }
	
    this.setPos=function(x0, y0, x1, y1){
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;	
    }

    this.setParticlesColor = function(color) {
        for (var i = 0; i < this.particles.length; i++) this.particles[i].setColor(color);
    }
	
    this.setParticlesValues = function(vxMin, vxMax, vyMin, vyMax, lifeMin,lifeMax) {
	
        this.vx.min=vxMin;
        this.vx.max=vxMax;
		
        this.vy.min=vyMin;
        this.vy.max=vyMax;
		
        this.life.min=lifeMin;
        this.life.max=lifeMax;
		
        for (var i = 0; i < this.particles.length; i++) this.setParticle(i);
    }
	
    this.setParticle=function(i){
        this.particles[i].setValues(Math.floor(Math.random() * this.x1) + this.x0+this.parent.x, Math.floor(Math.random() * this.y1) + this.y0+this.parent.y,Utils.rangedRandom(this.vx.min,this.vx.max),Utils.rangedRandom(this.vy.min,this.vy.max),Utils.rangedRandom(this.life.min,this.life.max));
    }

    this.update = function() {
        for (var i = 0; i < this.particles.length; i++) {
            if (this.particles[i].time < this.particles[i].life) {
                this.particles[i].vy = this.particles[i].vy + this.gravity*Time.deltaTime;
                this.particles[i].x = this.particles[i].x + this.particles[i].vx*Time.deltaTime;
                this.particles[i].y = this.particles[i].y + this.particles[i].vy*Time.deltaTime;
                this.particles[i].time += Time.deltaTime;
            }
            else {
                if(!this.oneShot)this.setParticle(i);
            }
        }
    }

    this.render = function(g) {
        for (var i = 0; i < this.particles.length; i++) this.particles[i].render(g);
    }

};

ParticleSystem.prototype = new Script;

function RainParticle() {
	
    this.render = function(ctx) {
        if (this.time < this.life){
            var m = 0.4;
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(0 * m, 5 * m, 0 * m, 10 * m, 5 * m, 15 * m);
            ctx.bezierCurveTo(10 * m, 20 * m, 12 * m, 26 * m, 10 * m, 30 * m);
            ctx.bezierCurveTo(6 * m, 40 * m, -6 * m, 40 * m, -10 * m, 30 * m);
            ctx.bezierCurveTo(-12 * m, 26 * m, -10 * m, 20 * m, -5 * m, 15 * m);
            ctx.bezierCurveTo(0 * m, 10 * m, 0 * m, 5 * m, 0 * m, 0 * m);
            ctx.fill();
            ctx.restore();
        }
    }
	

}
RainParticle.prototype = new Particle; //inherit from Particle



