﻿'use strict';

function question(text, options, answers) {
    var self = this;
    var _answers = Base64Util.DecodeData(answers);
    var _score = 0;
    var oneAnswerCount = 10 / (Array.isArray(_answers) ? _answers.length : 1);

    this.options = Base64Util.DecodeData(options);
    this.text = Base64Util.DecodeData(text);

    this.maxScore = (function () {
        return Array.isArray(_answers) ? _answers.length * oneAnswerCount : oneAnswerCount;
    })();

    this.getScore = function () {
        return _score;
    };

    this.handleNext = function (selectedAnswers, callback) {
        if (selectedAnswers && selectedAnswers.length > 0) {
            if (Array.isArray(_answers)) {
                for (var i = 0, N = selectedAnswers.length; i < N; i++) {
                    if (_answers.indexOf(selectedAnswers[i]) > -1) {
                        _score += oneAnswerCount;
                    }
                }
            }
            else {
                if (selectedAnswers.length == 1 && _answers.indexOf(selectedAnswers[0]) > -1) {
                    _score += oneAnswerCount;
                }
            }
        }
        callback(self);
    };
}