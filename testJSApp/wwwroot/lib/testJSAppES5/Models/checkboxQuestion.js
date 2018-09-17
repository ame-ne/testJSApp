'use strict';

function checkboxQuestion() {
    var self = this;
    //вызов конструктора родителя
    question.apply(self, arguments);

    var handleNext = function (callbackQuestion, callbackController) {
        var questionAnswerVariantsArea = document.getElementById('questionAnswerVariants');
        var selectedAnswers = [];
        if (questionAnswerVariantsArea) {
            var checkboxElements = document.getElementsByName('answer');
            for (var i = 0, N = checkboxElements.length; i < N; i++) {
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
            for (var i = 0, N = self.options.length; i < N; i++) {
                questionAnswerVariantsArea.innerHTML += '<div class="checkbox"><label><input type="checkbox" name="answer" value=\'' + self.options[i] + '\' /> ' + self.options[i] + '</label></div>';
            }
        }
        HtmlUtil.PasteHtml('questionNavigation', '<a class="btn btn-outline-danger" id="nextBtn">Следующий</a>');
        document.getElementById('nextBtn').addEventListener('click', function () { handleNext(callbackQuestion, callbackController) });
    };
}

checkboxQuestion.prototype = Object.create(question.prototype);
checkboxQuestion.prototype.constructor = question;