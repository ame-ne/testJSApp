'use strict';

function question(text, options, answers) {
    var _answers = Base64Util.DecodeData(answers);
    var _score = 0;

    this.options = Base64Util.DecodeData(options);
    this.text = Base64Util.DecodeData(text);

    var getScore = function () {
        return _score;
    };

    var setScore = function (score) {
        _score = score;
    }

    var handleNext = function () {
    };
}

//question.prototype = Object.create(Object.prototype);
//question.prototype.constructor = question;

