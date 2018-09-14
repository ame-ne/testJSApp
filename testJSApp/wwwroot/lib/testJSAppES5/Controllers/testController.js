'use strict';
function testController() { };

testController.prototype = (function () {
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
            //testController.prototype.ajaxToService(serviceUrl, null, function (textdata) {
            //    var loadedQuestionsCount = JSON.parse(textdata);
            //    questionCount = loadedQuestionsCount;
            //    questionIndex = 0;
            //    loadQuestion();
            //});

            testController.prototype.ajaxToService(serviceUrl)
                .then(function (response) {
                    var loadedQuestionsCount = JSON.parse(response);
                    questionCount = loadedQuestionsCount;
                    questionIndex = 0;
                    loadQuestion();
                }, function (error) {
                    console.log(error);
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
        //testController.prototype.ajaxToService(serviceUrl, JSON.stringify(questionIndex), function (textdata) {
        //    var loadedQuestion = JSON.parse(textdata);
        //    questionIndex++;
        //    questionFactory(loadedQuestion);
        //});

        testController.prototype.ajaxToService(serviceUrl, JSON.stringify(questionIndex))
            .then(function (response) {
                var loadedQuestion = JSON.parse(response);
                questionIndex++;
                questionFactory(loadedQuestion);
            }, function (error) {
                console.log(error);
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
        var maxScore = 0;
        for (var i = 0; i < questionList.length; i++) {
            totalScore += questionList[i].getScore();
            maxScore += questionList[i].maxScore;
        }

        HtmlUtil.PasteHtml('questionText', '<div><p>Вы набрали ' + Math.round(totalScore) + ' баллов из ' + maxScore + '*</p><small>*относитесь к этому как хотите</small></div>');
        HtmlUtil.PasteHtml('questionAnswerVariants', '');
        HtmlUtil.PasteHtml('questionNavigation', '<a class="btn btn-outline-danger" id="restartBtn">Начать заново</a>');
        document.getElementById('restartBtn').onclick = function () { var testCtrl = new testController(); testCtrl.init(); createNextQuestionObject(); };
    };

    return {
        constructor: testController,
        ajaxToService: function (url, dataToSend) {
            return new Promise(function (resolve, reject) {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4) {
                        if (xhttp.status == 200) {
                            resolve(xhttp.responseText);
                        }
                        else {
                            reject(xhttp.statusText);
                        }
                    }
                };
                xhttp.onerror = function () {
                    reject(xhttp.statusText);
                };
                if (dataToSend) {
                    xhttp.open('POST', url, true);
                    xhttp.setRequestHeader("Content-type", "application/json;odata=verbose;charset=utf-8");
                    xhttp.send(dataToSend);
                }
                else {
                    xhttp.open('GET', url, true);
                    xhttp.send();
                }
            });

            //HttpUtil.SendData(serviceUrl, dataToSend, callback);



        },
        init: function () {
            questionCount = 0;
            questionIndex = -1;
            questionList = [];
            HtmlUtil.PasteHtml('questionText', '');
            HtmlUtil.PasteHtml('questionAnswerVariants', '');
            HtmlUtil.PasteHtml('questionNavigation', '<a class="btn btn-outline-danger" id="startBtn">Начать</a>');
            document.getElementById('startBtn').onclick = createNextQuestionObject;
        }
    }
})();

window.onload = function () {
    var testCtrl = new testController();
    testCtrl.init();
};