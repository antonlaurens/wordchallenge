var WordChallenge = window.WordChallenge || {};

(function(WC) {

  var listScroller = null;

  WC.Init = {

    init: function() {

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
      this.throttle = false;
      this.listenToTrippleClick();

    },

    listenToTrippleClick: function() {
      document.querySelector('#timer').addEventListener('click', function(evt) {
        if (!this.throttle && evt.detail === 3) {
          $('#easter-egg').addClass('element-animation');
          this.throttle = true;
          setTimeout(function() {
            $('#easter-egg').removeClass('element-animation');
            this.throttle = false;
          }.bind(this), 2000);
        }
      }.bind(this));

    },

    resizeScroller: function() {
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

  // event listeners
  window.addEventListener('resize', WC.Init.resizeScroller);
  document.addEventListener('DOMContentLoaded', WC.Init.init(), false);
  document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
  });

  window.requestAnimFrame = (function() {

    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||

      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };

  })();

})(WordChallenge);
