var WordChallenge = window.WordChallenge || {};
(function (WC) {

    var TIME_IN_MIL_SECONDS = 2 * 60 * 1000; // 2 minutes

    var alpha = WC.I18n.getString(WC.I18n.KEYS.ALPHABET);

    var timeUpSound = new Audio('audio/timeup.mp3');

    WC.Timer = {

        element_: null,

        lastTime_: null,

        currentTime_: null,

        interval_: null,

        letterInterval_: null,

        startButton_: null,

        resetButton_: null,

        letterContainer_: null,

        currentLetter_: 0,

        init: function (el) {
            _.bindAll(this,
                'onLetterTick_',
                'onStartButtonClick_',
                'clearClasses_',
                'start',
                'pause',
                'reset',
                'onTick_',
                'populateTimer_',
                'populateCurrentLetter_');

            this.element_ = el.timer;
            this.startButton_ = el.startButton;
            this.resetButton_ = el.resetButton;
            this.letterContainer_ = el.letterContainer;
            this.currentTime_ = TIME_IN_MIL_SECONDS;

            this.startButton_.on('click', this.onStartButtonClick_);
            this.resetButton_.on('click', this.reset);

            this.startButton_.html(WC.I18n.getString(WC.I18n.KEYS.BUTTON_START));
            this.resetButton_.html(WC.I18n.getString(WC.I18n.KEYS.BUTTON_RESET));

            this.populateTimer_();
            this.populateCurrentLetter_();

        },

        onLetterTick_: function () {
            this.currentLetter_ = Math.floor(Math.random() * alpha.length);
            window.requestAnimationFrame(this.populateCurrentLetter_);
        },

        onStartButtonClick_: function () {

            if (this.startButton_.hasClass('green')) {

                if (this.currentTime_ === TIME_IN_MIL_SECONDS) {

                    this.clearClasses_(this.startButton_).addClass('grey').html(WC.I18n.getString(WC.I18n.KEYS.BUTTON_STOP));
                    this.clearClasses_(this.resetButton_).addClass('grey');

                    this.letterInterval_ = setInterval(_.bind(this.onLetterTick_, this), 50);
                    setTimeout(this.start, 1500);
                }
                else {
                    this.start();
                }

            }
            else if (this.startButton_.hasClass('red')) {
                this.pause();
            }

        },

        start: function () {
            this.clearClasses_(this.startButton_).html(WC.I18n.getString(WC.I18n.KEYS.BUTTON_STOP)).addClass('red');

            this.resetButton_.removeClass('black').addClass('grey');

            if (this.interval_) {
                clearInterval(this.interval_);
            }
            if (this.letterInterval_) {
                this.letterContainer_.addClass('popInAnimation');

                clearInterval(this.letterInterval_);
            }
            this.lastTime_ = new Date().getTime();
            this.interval_ = setInterval(this.onTick_, 10);
        },

        pause: function () {
            this.startButton_.html(WC.I18n.getString(WC.I18n.KEYS.BUTTON_CONTINUE)).removeClass('red').addClass('green');
            this.clearClasses_(this.resetButton_).addClass('black');
            clearInterval(this.interval_);
        },

        reset: function () {
            this.currentTime_ = TIME_IN_MIL_SECONDS;

            this.clearClasses_(this.resetButton_).addClass('grey');
            this.clearClasses_(this.startButton_).addClass('green').html(WC.I18n.getString(WC.I18n.KEYS.BUTTON_START));

            this.currentLetter_ = 0;
            this.letterContainer_.removeClass('popInAnimation');
            this.populateTimer_();
            this.populateCurrentLetter_();
        },

        clearClasses_: function(el) {
            el.removeClass('red green black grey');
            return el;
        },

        onTick_: function () {

            var timeNow = new Date().getTime();
            var timeDiff = timeNow - this.lastTime_;
            this.lastTime_ = timeNow;

            this.currentTime_ -= timeDiff;
            window.requestAnimationFrame(this.populateTimer_);
            if (this.currentTime_ <= 0) {
                clearInterval(this.interval_);
                this.clearClasses_(this.startButton_).addClass('grey');
                this.clearClasses_(this.resetButton_).addClass('black');
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

        populateTimer_: function () {
            var minutes = Math.floor(this.currentTime_ / 1000 / 60);
            var seconds = Math.floor((this.currentTime_ - (minutes * 60 * 1000)) / 1000);
            var mils = Math.floor((this.currentTime_ - (minutes * 60 * 1000) - (seconds * 1000)) / 10);
            this.element_.text(WC.Utils.padNumber(minutes, 2) + ':' + WC.Utils.padNumber(seconds, 2) + ':' + WC.Utils.padNumber(mils, 2));
        },

        populateCurrentLetter_: function () {
            this.letterContainer_.text(alpha[this.currentLetter_]);
        }

    };

})(WordChallenge);


