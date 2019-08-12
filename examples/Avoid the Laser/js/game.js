
var game = {
    data: {
        score: 0
    },
    onload: function() {
        if (!me.video.init(800, 600, {wrapper : "screen", scale : "auto", renderer : me.video.CANVAS})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        me.state.set(me.state.PLAY, new game.PlayScreen());

        me.event.subscribe(me.event.KEYDOWN, function (action, keyCode /*, edge */) {
            if (keyCode === me.input.KEY.F) {
                if (!me.device.isFullscreen) {
                    me.device.requestFullscreen();
                } else {
                    me.device.exitFullscreen();
                }
            }
        });

        me.debug.renderHitBox = true;

        me.state.change(me.state.PLAY);
    }
};
