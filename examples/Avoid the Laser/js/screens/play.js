game.PlayScreen = me.Stage.extend({
    onResetEvent: function() {
        var rectSize = 50;
        var lineSpeed = 0.025;
        var scoreThreshold = 10;

        me.sys.gravity = 0;

        me.game.world.addChild(new me.ColorLayer("background", "black"), 0);

        me.game.world.addChild(new game.Square(10, 10, {width: rectSize, height: rectSize}), 1);
        me.game.repaint();

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [0, 0, 10, 10]);
                this.font = new me.Font("Arial", 20, "#FFFFFF");
                this.font.textAlign = "center";
                this.fontHeight = this.font.measureText(me.video.renderer, "DUMMY").height;
            },
            update : function (dt) {
                return true;
            },
            draw: function(renderer) {
                this.font.draw (
                    renderer,
                    `Score: ${Math.floor(game.data.score)}`,
                    50,
                    me.game.viewport.height - this.fontHeight
                );
            }
        })), 10);

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [0, 0, 10, 10]);
                this.line = new me.Line(me.game.viewport.width / 2, me.game.viewport.height / 2, [
                    new me.Vector2d(0, 0),
                    new me.Vector2d(me.game.viewport.width / 2, me.game.viewport.height / 2)
                ]);

            },
            update : function (dt) {
                this.line.rotate(lineSpeed);
                var result = me.collision.rayCast(this.line);

                game.data.score += 0.05;
                
                if(game.data.score >= scoreThreshold && game.data.score < (scoreThreshold + 1)) {
                    lineSpeed += 0.005;
                    scoreThreshold += 10;
                }

                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        result[i].isColliding = true;
                        result[i].pos.x = 10;
                        result[i].pos.y = 10;
                        game.data.score = 0;
                        lineSpeed = 0.025;
                        scoreThreshold = 10;
                    }
                }

                return true;
            },
            draw: function(renderer) {
                renderer.setColor("red");
                renderer.stroke(this.line);
            }
        })), 10);
    }
});
