'use strict';

function radioQuestion() {

    //вызов конструктора родителя
    question.apply(this, arguments);

    var handleNext = function () {
        var score = 0;
        var questionAnswerVariantsArea = document.getElementById('questionAnswerVariants');
        if (questionAnswerVariantsArea) {
            var checkboxElements = document.getElementsByName('answer');
            for (var i = 0; i < checkboxElements.length; i++) {
                if (checkboxElements[i].checked && this.answers.indexOf(checkboxElements[i].nodeValue) > -1) {
                    score += 10;
                }
            }
        }
        question.prototype.handleNext();
    };
}


radioQuestion.prototype = Object.create(question.prototype);

radioQuestion.prototype.init = function () {
    var questionTextArea = document.getElementById('questionText');
    if (questionTextArea) {
        questionTextArea.innerHTML += '<div>' + this.text + '</div>';
    }
    var questionAnswerVariantsArea = document.getElementById('questionAnswerVariants');
    if (questionAnswerVariantsArea) {
        for (var i = 0; i < this.options.length; i++) {
            questionAnswerVariantsArea.innerHTML += '<div class="checkbox"><label><input type="radio" name="answer" id="answer" value=' + this.options[i] + ' /> ' + this.options[i] + '</label></div>';
        }
    }
    var buttonsArea = document.getElementById('questionNavigation');
    if (buttonsArea) {
        buttonsArea.innerHTML = '<a class="btn btn-outline-danger" id="nextBtn">Следующий</a>';
        document.getElementById('nextBtn').addEventListener('click', this.handleNext);
    }
};

radioQuestion.prototype.constructor = question;