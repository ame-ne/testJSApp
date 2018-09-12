'use strict';

function testController() {
    var questionCount = 0;
    var questionIndex = -1;
    var serviceUrl = "/api/TestService";

    this.questionList = [];

    var addQuestionToList = function () { };

    this.createNextQuestionObject = function () {
        if (questionCount == 0) {
            HttpUtil.SendData(serviceUrl, null, function (textdata) {
                var loadedQuestionsCount = JSON.parse(textdata);
                questionCount = loadedQuestionsCount;
                loadQuestion();
            });
        }
        else if (questionIndex < questionCount) {
            loadQuestion();
        }
    };

    var loadQuestion = function () {
        
        HttpUtil.SendData(serviceUrl, JSON.stringify({ 'id': questionIndex}),  function (textdata) {
            var loadedQuestion = JSON.parse(textdata);
            questionIndex++;
            questionFactory(loadedQuestion);
        });
    };

    var questionFactory = function (loadedQuestion) {
        var questionObj;
        if (loadedQuestion.answers.indexOf('#;') > -1) {
            questionObj = new checkboxQuestion(loadedQuestion.text, loadedQuestion.options, loadedQuestion.answers);
        }
        else {
            questionObj = new radioQuestion(loadedQuestion.text, loadedQuestion.options, loadedQuestion.answers);
        }
        questionObj.init();
    };

    var showResult = function () { };

}

testController.prototype.ajaxToService = function () { };
testController.prototype.init = function () {
    var buttonsArea = document.getElementById('questionNavigation');
    if (buttonsArea) {
        buttonsArea.innerHTML = '<a class="btn btn-outline-danger" id="startBtn">Начать</a>';
        document.getElementById('startBtn').addEventListener('click', this.createNextQuestionObject);
    }
};
testController.prototype.constructor = testController;
window.onload = function () {
    var testCtrl = new testController();
    testCtrl.init();
};