
game.Square = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, "init", [x, y, settings]);

        this.alwaysUpdate = true;

        this.body.setMaxVelocity(2.4, 2.4);
        this.body.setFriction(0.4, 0.4);

        this.selected = false;
        this.hover = false;

        this.grabOffset = new me.Vector2d(0,0);

        this.color = new me.Color(0, 255, 0);

        this.isColliding = false;
        
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,    "up");
        me.input.bindKey(me.input.KEY.DOWN,  "down");

        me.input.bindKey(me.input.KEY.A,     "left");
        me.input.bindKey(me.input.KEY.D,     "right");
        me.input.bindKey(me.input.KEY.W,     "up");
        me.input.bindKey(me.input.KEY.S,     "down");
    },

    update: function (dt) {
        if (me.input.isKeyPressed("left"))    {
            this.pos.x -= ((15 - this.body.friction.x) / this.body.maxVel.x);
        } else if (me.input.isKeyPressed("right")) {
            this.pos.x += ((15 - this.body.friction.x) / this.body.maxVel.x);
        }

        if (me.input.isKeyPressed("up")) {
            this.pos.y -= ((15 - this.body.friction.y) / this.body.maxVel.y);
        } else if (me.input.isKeyPressed("down")) {
            this.pos.y += ((15 - this.body.friction.y) / this.body.maxVel.y);
        }

        this.body.update(dt);

        me.collision.check(this);

        return false;
    },

    onCollision : function () {
        return true;
    },

    draw: function (renderer) {
        var lineWidth = 2;

        if (this.isColliding === true) {
            this.color.setColor(130, 82, 1);
        } else {
            this.color.setColor(182, 155, 76);
        }

        renderer.setGlobalAlpha(0.5);
        renderer.setColor(this.color);
        renderer.fillRect(0, 0, this.width, this.height);
        renderer.setGlobalAlpha(1.0);
        renderer.setLineWidth(lineWidth);
        renderer.strokeRect(
            lineWidth,
            lineWidth,
            this.width - lineWidth * 2,
            this.height - lineWidth * 2
        );

        this.isColliding = false;
    }
});
