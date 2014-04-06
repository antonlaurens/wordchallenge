var WordChallenge = window.WordChallenge || {};

(function(WC) {

    var strings = {

        en: {
            'button.start': 'Start',
            'button.continue': 'Continue',
            'button.reset': 'Reset',
            'button.stop': 'Stop',
            'alphabet': 'ABCDEFGHIJKLMNOPRSTW'
        },

        de: {
            'button.start': 'Starten',
            'button.continue': 'Weiter',
            'button.reset': 'Loeschen',
            'button.stop': 'Stoppen',
            'alphabet': 'ABCDEFGHIJKLMNOPRSTW'
        },

        af: {
            'button.start': 'Begin',
            'button.continue': 'Gaan voort',
            'button.reset': 'Herstel',
            'button.stop': 'Stop',
            'alphabet': 'ABDEFGHIJKLMNOPRSTW'
        }

    };

    var locale = null;

    var i18n = WC.I18n = {

        getString: function(key) {
            if (!locale) {
                var lang = window.navigator.language;
                var loc = lang.split('-')[0];
                locale = strings[loc] ? loc : 'en';
            }
            return strings[locale][key];
        }

    };

    i18n.KEYS = {
        BUTTON_START: 'button.start',
        BUTTON_RESET: 'button.reset',
        BUTTON_CONTINUE: 'button.continue',
        BUTTON_STOP: 'button.stop',
        ALPHABET: 'alphabet'
    };

})(WordChallenge);