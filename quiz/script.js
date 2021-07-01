var questions;

fetch('questions.json').then(function(response){
    return response.json();
}).then(function(obj){
    questions = obj;
});

// Saving to localStorage
function saveResult(usr,pts){
    for(i=1;i<11;i++){
        if(localStorage.getItem("res"+i.toString())==null){
            localStorage.setItem("name"+i.toString(),usr);
            localStorage.setItem("res"+i.toString(), pts.toString());
            return 0;
        }
        else {
            if(parseInt(localStorage.getItem("res"+i.toString()))<pts){
                var helpU = localStorage["name"+i.toString()] ;
                var helpP = parseInt(localStorage.getItem("res"+i.toString()));
                console.log(helpU);
                console.log(helpP);
                localStorage.setItem("name"+i.toString(),usr);
                localStorage.setItem("res"+i.toString(), pts.toString());
                pts = helpP;
                usr = helpU;
            }
            else if(parseInt(localStorage.getItem("res"+i.toString()))==pts){
                if(localStorage.getItem("name"+i.toString()).toLowerCase()>usr.toLowerCase()){
                    var helpU = localStorage["name"+i.toString()] ;
                    var helpP = parseInt(localStorage.getItem("res"+i.toString()));
                    console.log(helpU);
                    console.log(helpP);
                    localStorage.setItem("name"+i.toString(),usr);
                    localStorage.setItem("res"+i.toString(), pts.toString());
                    pts = helpP;
                    usr = helpU;
                }
            }
        }
    }
    return 0
}
// #################

function showLeaderboard(){
    document.getElementById("toLeaderboard").style.display = "none";
    document.getElementById("startAgain").style.display = "";
    var f = document.getElementById("formName");
    f.style.display = "none";
    var q = document.getElementById("endScreen");
    q.style.display = "none";
    var l = document.getElementById("leaderboard")
    l.style.display = "block";
    for(var i=1 ; i<11 ; i++){
        if(localStorage["name"+i.toString()]!=undefined){
            var u = document.getElementById("u"+i.toString());
            u.innerText = localStorage["name"+i.toString()];
            var kkk = document.getElementById("result"+i.toString());
            kkk.innerHTML = localStorage["res"+i.toString()];
        }
    }
}

function endGame(){ //SCREEN AT THE END OF GAME
    document.getElementById("toLeaderboard").style.display = "";
    clearTimeout(timer);
    saveResult(username,points);
    var f = document.getElementById("formName");
    f.style.display = "none";
    var q = document.getElementById("questions");
    q.style.display = "none";
    var l = document.getElementById("endScreen")
    l.style.display = "block";
    if(points<4){
        document.getElementById("congrats").innerHTML = "Wel... ";
        document.getElementById("playerName").innerHTML = username + " you had "
        document.getElementById("numberOfPts").innerHTML = points;
        document.getElementById("numberOfPts").style.color = "red";
        if(points==1){
            document.getElementById("pts").innerHTML = " point..."
        }
        else{
            document.getElementById("pts").innerHTML = " points..."
        }

    }
    else if(points>3 && points<8){
        document.getElementById("congrats").innerHTML = "Congratulations ";
        document.getElementById("playerName").innerHTML = username + " you had "
        document.getElementById("numberOfPts").innerHTML = points;
        document.getElementById("numberOfPts").style.color = "blue";
        document.getElementById("pts").innerHTML = " points"

    }
    else if(points>7){
        document.getElementById("congrats").innerHTML = "WOW ";
        document.getElementById("playerName").innerHTML = username + " you had "
        document.getElementById("numberOfPts").innerHTML = points;
        document.getElementById("numberOfPts").style.color = "green";
        document.getElementById("pts").innerHTML = " points!"

    }
}

document.getElementById("name").focus(); //FOCUSING AT THE FORM AT THE BEGINING

var username;
var bgDark = "#353535";
var bgLight = "#ff8333";
var light = "#007bff";
var dark = "#0055b0";
var lightSelect = "#0061ff";
var darkSelect = "#004997";

var currentQuestion = 0;
var questionNumber = 0;
var points = 0;

var oldQuestions = [];
var alreadyAnswered = false;
var countQuestions = [0,0];

function askQuestion(){ //CHOOSING RANDOMLY ONE OF TEXT QUESTION OR QUESTION WITH ANSWERS (MAX 5 OF EACH)
    if(!mixed){
        questionNumber+=1;
    }
    mixed = false;
    document.getElementById("numOfQuestion").innerHTML = questionNumber;
    var q = Math.floor(Math.random() * 2);
    if(countQuestions[0]==5){
        q = 1;
    }
    if(countQuestions[1]==5){
        q = 0;
    }
    p = document.getElementById("timer");
    p.className = "timer elements";
    alreadyAnswered = false;
    if(q==0){
        countQuestions[0]+=1;
        setQuestion();
    }
    else{
        countQuestions[1]+=1;
        setQuestionText();
    }
}

function showPoints(){ //PRINTING POINTS
    document.getElementById("points").innerHTML = points;
}

function textAnswer(){ //ASKING A QUESTION WHITOUT GIVEN ANSWER
    if(alreadyAnswered){
        return null;
    }
    else{
        p = document.getElementById("timer");
        p.className = "timer elements";
        clearTimeout(timer);
        alreadyAnswered = true;
        a = document.getElementById("textAnswer");
        a.style.backgroundColor = "#c4c10e";
        b = document.getElementById("answerInput");
        b.disabled = true;
        setTimeout(function(){
            if(rightAnswer()){
                b.disabled = "true";
                a.style.backgroundColor = "green";
                points += 1;
                showPoints();
            }
            else{
                b.disabled = "true";
                b.value = questions[currentQuestion].answers[0];
                a.style.backgroundColor = "red";
                findAnswer();
                }
            setTimeout(nextQuestion,2000)

        },1000);
    }
}

function rightAnswer(){ //CHECKING IF THE TYPED IN ANSWER IS CORRECT
    ans = document.forms["FormAns"]["answerInput"].value;
    if(questions[currentQuestion].answers[0].toLowerCase()==ans.trim().toLowerCase()){
        return true;
    }
    if(questions[currentQuestion].answers[1].toLowerCase()==ans.trim().toLowerCase()){
        return true;
    }
    if(questions[currentQuestion].answers[2].toLowerCase()==ans.trim().toLowerCase()){
        return true;
    }
    return false;
}

function answered(a){ //CHECKING IF THE CLICKED GIVEN ANSWER IS CORRECT
    if(alreadyAnswered){
        return null;
    }
    else{
        p = document.getElementById("timer");
        p.className = "timer elements";
        clearTimeout(timer);
        alreadyAnswered = true;
        a.style.backgroundColor = "#c4c10e";
        setTimeout(function(){
            if(questions[currentQuestion].answers[0]==a.innerHTML){
                a.style.backgroundColor = "green";
                points += 1;
                showPoints();
            }
            else{
                a.style.backgroundColor = "red";
                findAnswer();
                }
            setTimeout(nextQuestion,2000)

        },1000);
    }
}

function findAnswer(){ //GREENLIGHTING THE CORRECT ANSWER
    if(document.getElementById("answer1").innerHTML == questions[currentQuestion].answers[0]){
        document.getElementById("answer1").style.backgroundColor = "green";
    }
    if(document.getElementById("answer2").innerHTML == questions[currentQuestion].answers[0]){
        document.getElementById("answer2").style.backgroundColor = "green";
    }
    if(document.getElementById("answer3").innerHTML == questions[currentQuestion].answers[0]){
        document.getElementById("answer3").style.backgroundColor = "green";
    }
    if(document.getElementById("answer4").innerHTML == questions[currentQuestion].answers[0]){
        document.getElementById("answer4").style.backgroundColor = "green";
    }
}

function nextQuestion(){ //CHECKING IF IT'S THE LAST QUESTION AND GOING TO END SCREEN AND IF NOT ASKING NEXT QUESTION
    if(questionNumber==10){
        endGame();
    }
    else{
        enterDarkMode();
        enterDarkMode();
        askQuestion();
    }
}

function setQuestionText(){ //DISPLAYING QUESTION WITH TYPE IN ANSWER
    var ans = document.getElementById("textAnswer");
    ans.style.display = "block";
    document.getElementById("formAnswer").reset()
    hideAnswers();
    b = document.getElementById("answerInput");
    b.disabled = false;
    document.getElementById("answerInput").focus();
    currentQuestion = getRandomQuestionText();
    var q = document.getElementById("question");
    q.innerHTML = questions[currentQuestion].question;
    startTimer(20);
}

function hideAnswers(){ //HIDING THE GIVEN ANSWERS
    var ans1 = document.getElementById("answers12");
    ans1.style.display = "none";
    var ans2 = document.getElementById("answers34");
    ans2.style.display = "none";
}

function showAnswers(){ //SHOWING THE GIVEN ANSWERS
    var ans1 = document.getElementById("answers12");
    ans1.style.display = "";
    var ans2 = document.getElementById("answers34");
    ans2.style.display = "";
}

function getRandomQuestionText(){ //GETTING A RANDOM QUESTION WITH TYPE IN ANSWER
    var q = Math.floor(Math.random() * 20) + 20;
    if(oldQuestions.includes(q)){
        return getRandomQuestionText();
    }
    else {
        oldQuestions.push(q);
        return q;
    }
}

function setQuestion(){ //DISPLAYING REGULAR QUESTION
    showAnswers();
    var ans = document.getElementById("textAnswer");
    ans.style.display = "none";
    currentQuestion = getRandomQuestion();
    var q = document.getElementById("question");
    q.innerHTML = questions[currentQuestion].question;
    setAnswers(currentQuestion);
    startTimer(20);
}

function getRandomQuestion(){ //GETTING RANDOM REGULAR QUESTION
    var q = Math.floor(Math.random() * 20);
    if(oldQuestions.includes(q)){
        return getRandomQuestion();
    }
    else {
        oldQuestions.push(q);
        return q;
    }
}

function setAnswers(q){ //DISPLAYING GIVEN ANSWERS AT RANDOM
    n = getRandomAnswers();
    var a = document.getElementById("answer1");
    a.innerHTML = questions[q].answers[n[0]];
    a = document.getElementById("answer2");
    a.innerHTML = questions[q].answers[n[1]];
    a = document.getElementById("answer3");
    a.innerHTML = questions[q].answers[n[2]];
    a = document.getElementById("answer4");
    a.innerHTML = questions[q].answers[n[3]];
}

function getRandomAnswers(){ //RANDOMIZING GIVEN ANSWERS
    let ans = [0, 1, 2, 3];
    ans = ans.sort(() => Math.random() - 0.5);
    return ans;
}

var darkMode = false;

function enterDarkMode(){ //ENTERING/EXITING DARK MODE
    if(darkMode){
        darkMode = false;
        var x = document.getElementsByClassName("elements");
        for(var i=0 ; i<x.length ; i++){
            x[i].style.borderColor = bgLight;
            x[i].style.backgroundColor = light;
        }
        document.getElementsByTagName("BODY")[0].style.backgroundColor = bgLight;
    }
    else{
        darkMode = true;
        var x = document.getElementsByClassName("elements");
        for(var i=0 ; i<x.length ; i++){
            x[i].style.borderColor = bgDark;
            x[i].style.backgroundColor = dark;
        }
        document.getElementsByTagName("BODY")[0].style.backgroundColor = bgDark;
    }
}

function submited(){ //SUBMITING THE PLAYER NAME
    username = document.forms["myForm"]["name"].value
    if(username.trim()==""){
        return 0;
    }
    else{
        
        var r = document.getElementById("rules");
        var x = document.getElementById("start");
        var n = document.getElementById("formName");
        r.style.display = "block";
        n.style.display = "none";
        x.style.display = "block";
    }
}

function start(){ //STARTING THE ACTUAL QUIZ
    var btn = document.getElementById("start");
    var q = document.getElementById("questions");
    var r = document.getElementById("rules");
    r.style.display = "none";
    btn.style.display = "none";
    q.style.display = "block";
    askQuestion();
}

var timer;

function startTimer(timerLength){ //STARTING THE NEW TIMER AND CLEARING THE PREVIOUS ONE
    clearTimeout(timer);
    p = document.getElementById("timer");
    p.className = "timer elements";
	var count = parseInt(new Date().getTime()/1000);
	var end = parseInt(new Date().getTime()/1000) + timerLength;
	timer = setInterval(function(){
        document.getElementById('timer').innerHTML=end-count;
        if(parseInt(new Date().getTime()/1000) == count+1)
            count++;
        if(end-count<6){
            p = document.getElementById("timer");
            p.className="timer1 elements"
        }
        if (count === end){
        clearInterval(timer);
        document.getElementById('timer').innerHTML='0';
        p = document.getElementById("timer");
        p.className = "timer2 elements";
        findAnswer();
        alreadyAnswered = true;
        setTimeout(function(){
            p = document.getElementById("timer");
            p.className="timer elements"
            nextQuestion();
        },2000);

        }
    }, 100);
}


function darkenAnswer(x){  //DARKENING THE ANSWER WHEN HOVERED
    if(alreadyAnswered){
        return null;
    }
    else{
        if(darkMode){
            x.style.backgroundColor = darkSelect;
        }
        else{
            x.style.backgroundColor = lightSelect;
        }
    }
}

function backAnswer(x){ //REVERSING THE ANSWER BACK
    if(alreadyAnswered){
        return null;
    }
    else{
        if(darkMode){
            x.style.backgroundColor = dark;
        }
        else{
            x.style.backgroundColor = light;
        }
    }
}

var mixed = false; //IF THE HELP HAS BEEN USED

function mixQuestion(){ //USING THE HELP TO SWITCH THE QUESTION
    if(alreadyAnswered){
        return null;
    }
    else{
        d = document.getElementById("hlp");
        if(d.className=="help1"){
            return 0;
        }
        else{
            mixed = true;
            askQuestion();
            d.className = "help1"
        }
    }
}