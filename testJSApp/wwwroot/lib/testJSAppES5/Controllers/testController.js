'use strict';

function testController() {
    var questionCount = 0;
    var questionIndex = -1;
    var serviceUrl = "/api/TestService";

    this.questionList = [];

    var addQuestionToList = function () { };
    var createNextQuestionObject = function () {
        if (questionIndex < questionCount) {
            loadQuestion();
        }
    };

    var loadQuestion = function () {
        
    };

    var questionFactory = function () { };
    var showResult = function () { };

    this.loadQuestions = function () {
        HttpUtil.SendData(serviceUrl, function (textdata) {
            var loadedQuestionsCount = JSON.parse(textdata);
            questionCount = loadedQuestionsCount;
            createNextQuestionObject();
        });
    };

}

testController.prototype.ajaxToService = function () { };
testController.prototype.init = function () {
    var buttonsArea = document.getElementById('questionNavigation');
    if (buttonsArea) {
        buttonsArea.innerHTML += "<a class=\"btn btn-outline-danger\" id=\"startBtn\">Начать<\/a>";
        document.getElementById('startBtn').addEventListener('click', this.loadQuestions);
    }
};

window.onload = function () {
    var controller = new testController();
    controller.init();
};