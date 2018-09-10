'use strict';

function radioQuestion() {

    //вызов конструктора родителя
    question.apply(this, arguments);

    var handleNext = function () {
    };
}


radioQuestion.prototype = Object.create(question.prototype);

radioQuestion.prototype.init = function () {
};

radioQuestion.prototype.constructor = question;