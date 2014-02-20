var Scattergories = window.Scattergories || {};
(function(S) {

	var TIME_IN_MIL_SECONDS = 7000;//3 * 60 * 1000; // 2 minutes

    var alpha = 'ABCDEFGHIJKLMNOPRSTUVWY';

    var startSound = new Audio('audio/start.mp3');
    var resetSound = new Audio('audio/reset.mp3');
    var timeUpSound = new Audio('audio/timeup.mp3');
	
    S.Timer = {
	
		element_: null,

		startTime_: null,		
		
		currentTime_: null,

		interval_: null,

        letterInterval_: null,

        startButton_: null,

        resetButton_: null,

        letterContainer_: null,

        currentLetter_: 0, // Start with A
	
		/**
		* @el {Zepto Object} The element in which to render the countdown timer
		*/
		init: function(el) {
			_.bindAll(this, 'onTick_');
			this.element_ = el.timer;
            this.startButton_ = el.startButton;
            this.resetButton_ = el.resetButton;
            this.letterContainer_ = el.letterContainer;

            this.startButton_.on('click',  _.bind(function() {
                _.defer(_.bind(this.onStartButtonClick_, this));
            }, this));

            this.resetButton_.on('click',  _.bind(function() {
                _.defer(_.bind(this.reset, this));
            }, this));

			this.currentTime_ = TIME_IN_MIL_SECONDS;
            this.populateTimer_();
            this.populateCurrentLetter_();

		},

        onLetterTick_: function() {
            this.currentLetter_ = Math.floor(Math.random() * alpha.length);
            window.requestAnimationFrame(_.bind(this.populateCurrentLetter_,this));
        },

        onStartButtonClick_: function(e) {
            resetSound.pause();
            startSound.play();
            if (this.startButton_.hasClass('green')) {

                // This is the initial start, delay by three secs
                if (this.currentTime_===TIME_IN_MIL_SECONDS) {
                    this.startButton_.removeClass('green black red').addClass('grey').html('Stop');
                    this.resetButton_.removeClass('green black red').addClass('grey');
                    this.letterInterval_ = setInterval(_.bind(this.onLetterTick_, this), 50);
                    setTimeout(_.bind(this.start, this), 1500);
                }
                else {
                    this.start();
                }

            }
            else if (this.startButton_.hasClass('red')) {
                this.pause();
            }
        },

		start: function() {
            this.startButton_.html('Stop').removeClass('green black grey').addClass('red');
            this.resetButton_.removeClass('black').addClass('grey');
			if (this.interval_) {
				clearInterval(this.interval_);
			}
            if (this.letterInterval_) {
                this.letterContainer_.addClass('popInAnimation');

                clearInterval(this.letterInterval_);
            }
			this.interval_ = setInterval(this.onTick_, 10);
		},

        pause: function() {
            this.startButton_.html('Start').removeClass('red').addClass('green');
            this.resetButton_.removeClass('grey').addClass('black');
            clearInterval(this.interval_);
        },

        reset: function() {
            startSound.pause();
            resetSound.play();
            this.currentTime_ = TIME_IN_MIL_SECONDS;
            this.resetButton_.removeClass('red green black').addClass('grey');
            this.startButton_.addClass('green').removeClass('red grey black').html('Start');
            this.currentLetter_ = 0;
            this.letterContainer_.removeClass('popInAnimation');
            this.populateTimer_();
            this.populateCurrentLetter_();
        },

		onTick_: function() {
			this.currentTime_ -= 10;
            window.requestAnimationFrame(_.bind(this.populateTimer_, this));
			if (this.currentTime_ <= 0) {
                clearInterval(this.interval_);
                this.startButton_.removeClass('red').addClass('grey');
                this.resetButton_.removeClass('grey').addClass('black');
			}
            if (this.currentTime_ === 5000
                || this.currentTime_ === 4000
                || this.currentTime_ === 3000
                || this.currentTime_ === 2000
                || this.currentTime_ === 1000
                || this.currentTime_ === 0) {
                timeUpSound.play();
            }
		},

        populateTimer_: function() {
            var minutes = Math.floor(this.currentTime_ / 1000 / 60 );
            var seconds = Math.floor((this.currentTime_ - (minutes * 60 * 1000)) / 1000);
            var mils = (this.currentTime_ - (minutes * 60 * 1000) - (seconds * 1000)) / 10;
            this.element_.text(this.pad_(minutes.toString()) +':' + this.pad_(seconds.toString()) + ':' + this.pad_(mils));
        },

        populateCurrentLetter_: function() {
            this.letterContainer_.text(alpha[this.currentLetter_]);
        },

        pad_: function(toPad) {
            if (toPad >= 10) {
                return toPad.toString();
            }
            return '0' + toPad.toString();
        }

	};

})(Scattergories);


