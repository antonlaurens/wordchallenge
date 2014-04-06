var WordChallenge = window.WordChallenge || {};

(function(WC) {

    WC.Utils = {

        padNumber: function(number, digits) {
            if (!_.isNumber(number)) {
                return;
            }

            var stringValue = number.toString();
            var startLength = stringValue.length;

            for (var i=0; i < (digits - startLength); i++) {
                stringValue = '0' + stringValue;
            }

            return stringValue;
        }

    }

})(WordChallenge);