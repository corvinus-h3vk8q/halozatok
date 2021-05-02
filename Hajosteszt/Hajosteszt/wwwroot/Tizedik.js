var hotlist = [];       //Az éppen gyakoroltatott kérdések listája
var questionsInHotList = 3      //Ez majd 7 lesz, teszteléshez jobb a 3.
var displayedQuestion;          //A hotlistből éppen ez a kérdés van kint.
var numberOfQuestions;          //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;           //A következő kérdés száma a teljes listában.

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        hotlist[i] = {
            question: {};
            goodAnswers : 0

        }
        
    }

}
