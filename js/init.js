var WordChallenge = window.WordChallenge || {};

(function (WC) {

    var listScroller = null;

    WC.Init = {

        init: function () {

            _.bindAll(this, 'onStartup_');

            listScroller = new iScroll('wrapper');

            WC.Timer.init({
                timer: $("#timer"),
                startButton: $("#start-button"),
                resetButton: $("#reset-button"),
                letterContainer: $("#letter")
            });

            WC.Lists.init($("#list-select-placeholder"));

            FastClick.attach(document.getElementsByClassName('buttons-container')[0]);

            this.resizeScroller();

            this.doStartup_();
        },

        doStartup_: function () {
            var uid = window.localStorage.getItem('uid');
            if (!uid) {
                uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
                    return v.toString(16);
                });
                window.localStorage.setItem('uid', uid);
            }
            $.post('/startup', { uid: uid }, this.onStartup_);
        },

        onStartup_: function (response) {
            console.log(response);
        },

        resizeScroller: function () {

            if (!listScroller) {
                return;
            }

            var topHeight = $('.top').height();
            var scrollerHeight = window.innerHeight - topHeight;

            $('#wrapper').css({
                position: 'fixed',
                top: topHeight + 10 + 'px',
                left: '0px',
                height: scrollerHeight - 10 + 'px',
                width: '100%'
            });

            listScroller.refresh();

        }

    };


    window.addEventListener('load', function () {

    }, false);

    // event listeners
    window.addEventListener('resize', WC.Init.resizeScroller);
    document.addEventListener('DOMContentLoaded', WC.Init.init(), false);
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault();
    });

    window.requestAnimFrame = (function () {

        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||

            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };

    })();

})(WordChallenge);
