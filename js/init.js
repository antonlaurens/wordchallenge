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
