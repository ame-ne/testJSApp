'use strict';

function radioQuestion() {
    var self = this;
    //вызов конструктора родителя
    question.apply(self, arguments);

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
        var questionTextArea = document.getElementById('questionText');
        if (questionTextArea) {
            questionTextArea.innerHTML = '<div>' + self.text + '</div>';
        }
        var questionAnswerVariantsArea = document.getElementById('questionAnswerVariants');
        if (questionAnswerVariantsArea) {
            questionAnswerVariantsArea.innerHTML = '';
            for (var i = 0; i < self.options.length; i++) {
                questionAnswerVariantsArea.innerHTML += '<div class="checkbox"><label><input type="radio" name="answer" id="answer" value="' + self.options[i] + '" /> ' + self.options[i] + '</label></div>';
            }
        }
        HtmlUtil.PasteHtml('questionNavigation', '<a class="btn btn-outline-danger" id="nextBtn">Следующий</a>');
        document.getElementById('nextBtn').addEventListener('click', function () { handleNext(callbackQuestion, callbackController) });

    };
}

radioQuestion.prototype = Object.create(question.prototype);
radioQuestion.prototype.constructor = question;