'use strict';
function testController() { };

testController.prototype = (function () {
    var self = this;
    var questionCount = 0;
    var questionIndex = -1;
    var serviceUrl = "/api/TestService";

    var questionList = [];

    var addQuestionToList = function (questionObj) {
        questionList.push(questionObj);
        createNextQuestionObject();
    };

    var createNextQuestionObject = function () {
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
        else {
            showResult();
        }
    };

    var loadQuestion = function () {

        HttpUtil.SendData(serviceUrl, JSON.stringify({ 'id': questionIndex }), function (textdata) {
            var loadedQuestion = JSON.parse(textdata);
            questionIndex++;
            questionFactory(loadedQuestion);
        });
    };
    
    var questionFactory = function (loadedQuestion) {
        var questionObj = new question(loadedQuestion.text, loadedQuestion.options, loadedQuestion.answers);
        if (loadedQuestion.answers.indexOf('#;') > -1) {
            var checkboxQuestionObj = new checkboxQuestion(loadedQuestion.text, loadedQuestion.options, loadedQuestion.answers);
            checkboxQuestionObj.init(questionObj.handleNext, addQuestionToList);
        }
        else {
            var radioQuestionObj = new radioQuestion(loadedQuestion.text, loadedQuestion.options, loadedQuestion.answers);
            radioQuestionObj.init(questionObj.handleNext, addQuestionToList);
        }
        

    };

    var showResult = function () {
        var totalScore = 0;
        for (var i = 0; i < questionList.length; i++) {
            totalScore += questionList[i].getScore();
        }
        var textArea = document.getElementById('questionText');
        if (textArea) {
            textArea.innerHTML = '<div><p>Вы набрали ' + totalScore + ' баллов*</p><small>*относитесь к этому как хотите</small></div>';
        }
        var buttonsArea = document.getElementById('questionNavigation');
        if (buttonsArea) {
            buttonsArea.innerHTML = '<a class="btn btn-outline-danger" id="restartBtn">Начать заново</a>';
            var testCtrl = new testController();
            document.getElementById('restartBtn').onclick = testCtrl.init;
        }
    };

    return {
        constructor: testController,
        ajaxToService: function () { },
        init: function () {
            var buttonsArea = document.getElementById('questionNavigation');
            if (buttonsArea) {
                buttonsArea.innerHTML = '<a class="btn btn-outline-danger" id="startBtn">Начать</a>';
                document.getElementById('startBtn').onclick = createNextQuestionObject;
            }
        }
    }
})();



//testController.prototype.ajaxToService = function () { };
//testController.prototype.init = function () {
//    var buttonsArea = document.getElementById('questionNavigation');
//    if (buttonsArea) {
//        buttonsArea.innerHTML = '<a class="btn btn-outline-danger" id="startBtn">Начать</a>';
//        document.getElementById('startBtn').addEventListener('click', this.createNextQuestionObject);
//    }
//};
//testController.prototype.constructor = testController;

window.onload = function () {
    var testCtrl = new testController();
    testCtrl.init();
};