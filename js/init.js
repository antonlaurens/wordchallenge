var Scattergories = window.Scattergories || {};
(function(S) {

    if (window.navigator.standalone) {
        $("meta[name='apple-mobile-web-app-status-bar-style']").remove();
        $('#timer').addClass('extra-margin');
    }

    if (S.Timer) {
        S.Timer.init({
            timer: $("#timer"),
            startButton: $("#start-button"),
            resetButton: $("#reset-button"),
            letterContainer: $("#letter")
        });
    }

    if (S.Lists) {
        S.Lists.init($("#list-select-placeholder"));
    }

    //prevent scrolling
    document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });

    window.addEventListener('load', function() {
        FastClick.attach(document.getElementsByClassName('buttons-container')[0]);
    }, false);

    function resizeScroller() {
        var scrollerHeight = window.innerHeight - $('.top').height();
        $('#wrapper').css({
            position: 'fixed',
            top: $('.top').height() + 10 + 'px',
            left: '0px',
            height: scrollerHeight - 10 + 'px',
            width: '100%'
        });
        window.myScroll.refresh();
    }

    function loaded() {
        window.myScroll = new iScroll('wrapper');
        resizeScroller();
    }

    window.addEventListener('resize', resizeScroller);
    document.addEventListener('DOMContentLoaded', loaded, false);

    window.requestAnimFrame = (function(){
        return window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

})(Scattergories);
