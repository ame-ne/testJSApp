'use strict';

function checkboxQuestion() {
    var self = this;
    //вызов конструктора родителя
    question.apply(this, arguments);

    var handleNext = function (callbackQuestion, callbackController) {
        var questionAnswerVariantsArea = document.getElementById('questionAnswerVariants');
        var selectedAnswers = [];
        if (questionAnswerVariantsArea) {
            var checkboxElements = document.getElementsByName('answer');
            for (var i = 0; i < checkboxElements.length; i++) {
                if (checkboxElements[i].checked) {
                    selectedAnswers.push(checkboxElements[i].value);
                }
            }
        }
        callbackQuestion(selectedAnswers, callbackController);
    };

    this.init = function (callbackQuestion, callbackController) {
        var self = this;
        var questionTextArea = document.getElementById('questionText');
        if (questionTextArea) {
            questionTextArea.innerHTML = '<div>' + this.text + '</div>';
        }
        var questionAnswerVariantsArea = document.getElementById('questionAnswerVariants');
        if (questionAnswerVariantsArea) {
            for (var i = 0; i < this.options.length; i++) {
                questionAnswerVariantsArea.innerHTML = '<div class="checkbox"><label><input type="checkbox" name="answer" value=' + this.options[i] + ' /> ' + this.options[i] + '</label></div>';
            }
        }
        var buttonsArea = document.getElementById('questionNavigation');
        if (buttonsArea) {
            buttonsArea.innerHTML = '<a class="btn btn-outline-danger" id="nextBtn">Следующий</a>';
            document.getElementById('nextBtn').addEventListener('click', function () { handleNext(callbackQuestion, callbackController) });
        }
    };


}


checkboxQuestion.prototype = Object.create(question.prototype);
checkboxQuestion.prototype.constructor = question;

//checkboxQuestion.prototype.init = function (callbackNext) {
//    var self = this;
//    var questionTextArea = document.getElementById('questionText');
//    if (questionTextArea) {
//        questionTextArea.innerHTML += '<div>' + this.text + '</div>';
//    }
//    var questionAnswerVariantsArea = document.getElementById('questionAnswerVariants');
//    if (questionAnswerVariantsArea) {
//        for (var i = 0; i < this.options.length; i++) {
//            questionAnswerVariantsArea.innerHTML += '<div class="checkbox"><label><input type="checkbox" name="answer" value=' + this.options[i] + ' /> ' + this.options[i] + '</label></div>';
//        }
//    } 
//    var buttonsArea = document.getElementById('questionNavigation');
//    if (buttonsArea) {
//        buttonsArea.innerHTML = '<a class="btn btn-outline-danger" id="nextBtn">Следующий</a>';
//        document.getElementById('nextBtn').addEventListener('click', function () { callbackNext() });
//    }
//};



