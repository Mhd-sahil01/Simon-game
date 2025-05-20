let gameSeq = [];
let userSeq = [];
let randColors = ["color1", "color2", "color3", "color4"]

let gameStart = false;
let level = 0;
let highscore = 0;

let h3 = document.querySelector("h3");
let highScoreText = document.querySelector(".high-score");
let startBtn = document.querySelector(".start-btn");

startBtn.addEventListener("click", function () {
    if (gameStart == false) {
        gameStart = true;

        levelup();
        startBtn.innerText = "";
    }
});

function gameFlash(btn) {
    btn.classList.add("white");
    setTimeout(() => {
        btn.classList.remove("white");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("green");
    setTimeout(() => {
        btn.classList.remove("green");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h3.innerText = `  Level ${level}`;
    let randIndx = Math.floor(Math.random() * 3);
    let randColor = randColors[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
    localStorage.setItem('s', highscore);
}

function checkAns(indx) {
    if (userSeq[indx] === gameSeq[indx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000);
        }
        if (level > highscore) {
            highscore = level;
        }
    } else {

        let s = localStorage.getItem('s') || 0;
        h3.innerHTML = `<b>Game Over! your score was ${level} </b> `;
        startBtn.innerHTML = `restart <br>`;
        highScoreText.innerHTML = `High score : ${s}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200)
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor); localStorage.setItem('s', highscore);


    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameStart = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}