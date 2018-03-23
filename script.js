const Assignment = document.getElementById('Assignment');
const myAnswer = document.getElementById('myAnswer');
const feedback = document.getElementById('feedback');
const livesLeft = document.getElementById('livesLeft');
const totalPoints = document.getElementById('totalPoints');
const volume = document.getElementById('volumeInfo');
const displayLives = document.getElementById('displayLives');
const totalTime = document.getElementById('totalTime');

var Som;
var lives = 3;
var points = 0;

var play = true;

var timeSec = 0;
var timeMin = 0;
var timeHr = 0;
var timeTotal = 0;
var timeAverage = 0;

var correctSound = new Audio();
correctSound.src = ('assets/music/correct.wav');

var wrongSound = new Audio();
wrongSound.src = ('assets/music/wrong.wav');

var music = new Audio();
music.src = ('assets/music/8bitLoop.mp3');
music.addEventListener('ended', function() {
    this.play();
}, false);
music.play();


function muziekUpdate(val) {
    volume.innerHTML = "Volume : " + (val * 100) + "%";
    music.volume = val;
    console.log('test');
}
function toggleMusic()
{
    if (play == false)
    {
        play = true
        music.play()
        console.log('play');
    }else if (play == true)
    {
        play = false
        music.pause()
        console.log('pause');
    }
}

function setup() {
    points = 0;
    lives = 3;
    livesLeft.innerHTML = "Lives : " + lives;
    totalPoints.innerHTML = "Points : " + points;
    feedback.src = ('assets/images/neutral.png');
    displayLives.innerHTML = "";
    makeSum();
}

function makeSum() {
    var getal1 = Math.floor(Math.random() * 9) + 1;
    var getal2 = Math.floor(Math.random() * 9) + 1;
    Som = getal1 * getal2;
    Assignment.innerHTML = getal1 + " X " + getal2;
    myAnswer.focus();
}

myAnswer.addEventListener("keydown", function (evt){
    if (evt.keyCode === 13){
            if (myAnswer.value == Som) {
                points++;
                console.log(points);
                correctSound.play();
                feedback.src = ('assets/images/goed.png');
            } else {
                lives--;
                console.log(lives);
                wrongSound.play();
                feedback.src = ('assets/images/fout.png');

                if (lives == 2)
                {
                    displayLives.innerHTML = "S";
                }
                if (lives == 1)
                {
                    displayLives.innerHTML = "SO";
                }
                if (lives <= 0)
                {
                    displayLives.innerHTML = "SOM"
                    setTimeout(function () {alert('Game Over');}, 100);
                    setTimeout(function () {setup();}, 100);
                }

            }
        totalPoints.innerHTML = "Points : " + points;
        livesLeft.innerHTML = "Lives : " + lives;
        window.setTimeout(waiting, 2000);
    }
});

function waiting() {
    feedback.src = ('assets/images/neutral.png');
    myAnswer.value = null;
    makeSum();
}

function  timer() {
    timeSec++;


    if (timeSec == 60)
    {
        timeSec -= 60;
        timeMin++;
    }

    if (timeMin == 60)
    {
        timeMin -= 60;
        timeHr++;
    }

    totalTime.innerHTML = timeHr + ":" + timeMin + ":" + timeSec;

    setTimeout("timer()", 1000)
}

setup();
timer();