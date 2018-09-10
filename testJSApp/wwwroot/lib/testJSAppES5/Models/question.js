'use strict';

function question(answers, options, score, text) {
    var _answers = answers;
    var _score = score;

    this.options = options;
    this.text = text;

    var getScore = function () {
        return _score;
    };

    var handleNext = function () {
    };
}

//question.prototype = Object.create(Object.prototype);
//question.prototype.constructor = question;

