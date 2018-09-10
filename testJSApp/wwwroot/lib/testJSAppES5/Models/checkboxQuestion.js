'use strict';

function checkboxQuestion() {

    //вызов конструктора родителя
    question.apply(this, arguments);

    var handleNext = function () {
    };

}


checkboxQuestion.prototype = Object.create(question.prototype);

checkboxQuestion.prototype.init = function () {
};

checkboxQuestion.prototype.constructor = question;
