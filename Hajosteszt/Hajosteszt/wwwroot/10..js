 var hotList = []; //Az éppen gyakoroltatott kérdések listája
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3
var displayedQuestion; //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions; //Kérdések száma a teljes adatbázisban
var nextQuestion = 1; //A következő kérdés száma a teljes listában
var timeoutHandler;


//Oldal betöltésénél meghívjuk a függvényeket
window.onload = init();

//Másik megoldás (az init helyett simán {} között be lehetne írni annak a tartalmát is)
//document.addEventListener(""DOMContentLoaded", init);



//Az éppen gyakoroltatott kérdések letöltése
function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let data = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = data;
    }

    //Kérdések száma
    fetch("questions/count").then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    //Mentett állapot olvasása
    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }
    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }
    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }

    //Első kérdések letöltése
    if (nextQuestion === 1) {
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
        kérdésMegjelenítés();
    }
    else {
        kérdésMegjelenítés();
    }
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }

        }
        )
        .then(data => {
            hotList[destination].question = data;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
            if (displayedQuestion == undefined && destination == 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        }
        );
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    if (kérdés.image) {
        document.getElementById("kép").src = kérdés.image;
        document.getElementById("kép").style.display = "block";
    }
    else {
        document.getElementById("kép").style.display = "none";
    }
    helyesVálasz = kérdés.correctAnswer;

    //Színezés leszedése
    for (var i = 1; i <= 3; i++) {
        document.getElementById("válasz" + i).classList.remove("jó", "rossz");
    }

    document.getElementById("válaszok").style.pointerEvents = "auto";
}

//Előre-Hátra gombok
function vissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) {
        displayedQuestion = questionsInHotList - 1;
    }
    kérdésMegjelenítés();
}

function előre() {
    clearTimeout(timeoutHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) {
        displayedQuestion = 0;
    }
    kérdésMegjelenítés();
}

//Másik megoldás
//document.getElementById("előre_gomb").addEventListener("click", előre);
/*function előre() {
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
    }
}*/
//document.getElementById("vissza_gomb").addEventListener("click", vissza);
/*function vissza() {
    displayedQuestion--;
    if (displayedQuestion < questionsInHotList) displayedQuestion = questionsInHotList - 1;
    kérdésMegjelenítés();
    }
}*/

//Válaszok megjelölése
function választás(n) {
    let kérdés = hotList[displayedQuestion].question;
    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
            //ToDO: kérdéslista vége ellenőrzés
        }
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz");
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó");
        hotList[displayedQuestion].goodAnswers = 0;
    }

    document.getElementById("válaszok").style.pointerEvents = "none";
    timeoutHandler = setTimeout(előre, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}

//Másik megoldás
/*function Válasz1() {
    document.getElementById("válasz1").style.backgroundColor = "red";
    document.getElementById(`válasz${helyesVálasz}`).style.backgroundColor = "green";
    if (document.getElementById("válasz1").style.backgroundColor == "green") {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
    KattintásLetiltás();
    timeoutHandler = setTimeout(Előre, 3000);
}
function Válasz2() {
    document.getElementById("válasz2").style.backgroundColor = "red";
    document.getElementById(`válasz${helyesVálasz}`).style.backgroundColor = "green";
    if (document.getElementById("válasz2").style.backgroundColor == "green") {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
    KattintásLetiltás();
    timeoutHandler = setTimeout(Előre, 3000);
}
function Válasz3() {
    document.getElementById("válasz3").style.backgroundColor = "red";
    document.getElementById(`válasz${helyesVálasz}`).style.backgroundColor = "green";
    if (document.getElementById("válasz3").style.backgroundColor == "green") {
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers == 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
    KattintásLetiltás();
    timeoutHandler = setTimeout(Előre, 3000);
}*/

//Másik megoldás színezésre
/*
function színezésOff() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`válasz${i}`).style.backgroundColor = "antiquewhite";
    }
}*/

//Másik megoldás kattintás letiltásra és feloldásra
/*function KattintásLetiltás() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`válasz${i}`).style.pointerEvents = "none";
    }
}
function KattintásFeloldás() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById(`válasz${i}`).style.pointerEvents = "auto";
    }
}*/