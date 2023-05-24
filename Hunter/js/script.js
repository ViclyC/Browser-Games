const BUTTONFACTOR = 0.06;
const HITTINGTIME = 2000;
const IMGH = 200;
const IMGW = 200;
const POP = 100;
const POPDELAY = 100;
const GOODJOB = 3;
const CAP = 10;
const WONDERFUL = 5;
const HPFACTOR = 20;
const RANGE1 = 3;
const RANGE2 = 6;
const RANGE3 = 9;
const GAIN1 = 1;
const GAIN2 = 2;
const GAIN3 = 3;
const FULL = 80;

let height;
let width;
let centerY;
let endButton = document.querySelector("#end");
let centerX;
let scoreString = document.querySelector("#score").innerHTML;
let currentScore = 0;
let audio = document.querySelector("#hammer");
let bgm = document.querySelector("#bgm");
let input = prompt("Choose how many units (an integer between 1 and 10)", "1");
let num;
let testInput = false;
let pepeArr = new Array(num);
let isArr = new Array(num);
let timerArr = new Array(num);
let moveArr = new Array(num);
let hitArr = new Array(num);
let hp = 0;
let gifArr = new Array(num);
let rewardMsg1 = document.querySelector("#good");
let rewardMsg2 = document.querySelector("#wonder");
let cheer = document.querySelector("#cheer");
let miss = 0;
let gain = 0;
let startButton = document.querySelector("#start");
let start = false;
let timeReward;
let red = document.querySelector("#red");


cheer.src = "images/cheer.gif";
cheer.style.width = IMGW + "px";
cheer.style.height = IMGH + "px";
cheer.style.display = "none";


rewardMsg1.innerHTML = "GOOD JOB!";
rewardMsg2.innerHTML = "WONDERFUL!";
rewardMsg1.style.display = "none";
rewardMsg2.style.display = "none";

document.querySelector("#intro").innerHTML = "The game has n units moving around. <br><br> Not hitting a unit before it moves loses you 1 hp. <br>" +
    "<br> Missing a click counts as a misclick. <br><br> You lose if your hp goes to 0 or if you reach 10 misclick.<br>" +
    "<br> You gain some hp back if you score a hit when n is between 4 and 10. <br><br> If you hit 3 or more at once you get a congrats message!";
document.querySelector("#score").style.display = "none";
endButton.style.display = "none";
document.querySelector("#hp").style.display = "none";
document.querySelector("#miss").style.display = "none";

red.src = "images/red.png";
red.style.position = "absolute";
red.style.width = "3vw";
red.style.height = FULL + "vh";
red.style.right = "2vw";
red.style.bottom = "5vh";
red.style.display = "none";








for (let i = 1; i <= CAP; i++) {
    if (i == input) {
        testInput = true;
        num = parseInt(input);

        break
    }
}

while (!testInput) {
    input = prompt("That's not a valid input, try again", "1");

    for (let i = 1; i <= CAP; i++) {
        if (i == input) {
            testInput = true;
            num = parseInt(input);

        }
    }
}

if (num > RANGE1 && num <= RANGE2) {
    gain = GAIN1;
}
if (num > RANGE2 && num <= RANGE3) {
    gain = GAIN2;
}
if (num > RANGE3) {
    gain = GAIN3;
}

function startGame() {
    start = true;
    bgm.play();
    bgm.loop = true;
    red.style.display = "inline";
    document.querySelector("#intro").style.display = "none";
    document.querySelector("#score").style.display = "block";
    document.querySelector("#score").innerHTML = "SCORE: 0";
    endButton.style.display = "inline";
    document.querySelector("#hp").style.display = "block";
    document.querySelector("#miss").style.display = "block";
    document.querySelector("#miss").innerHTML = "MISCLICK: 0";
    startButton.style.display = "none";
    endButton.style.display = "inline";


}

function generate() {
    height = window.innerHeight - 1;
    width = window.innerWidth - 1;
    centerY = height / 2 - IMGH / 2;
    centerX = width / 2 - IMGW / 2;
    for (let i = 0; i < num; i++) {


        gifArr[i] = "images/cry" + i + ".gif";
        isArr[i] = false;
        hitArr[i] = 0;
        if (i == 0){
        moveArr[i] = 0;
        } else {
            moveArr[i] = -1;
        }

        
        pepeArr[i] = document.createElement("img");
        pepeArr[i].src = "images/pepe.png";
        pepeArr[i].width = IMGW;
        pepeArr[i].height = IMGH;
        pepeArr[i].style.position = "absolute";
        pepeArr[i].style.top = centerY + "px";
        pepeArr[i].style.left = centerX + "px";
        pepeArr[i].style.cursor = "url('images/aim.png'), pointer";
        document.getElementById("body").appendChild(pepeArr[i]);
        if (i != 0) {
            pepeArr[i].style.display = "none";
            setTimeout(function () {
                pepeArr[i].style.display = "inline"
            }, HITTINGTIME)
        }


    }

    hp = num * HPFACTOR;
    document.querySelector("#hp").innerHTML = "HP: " + hp;
}



function move(i) {


    moveArr[i]++;
    let newHeight = window.innerHeight - 1;
    let newWidth = window.innerWidth - 1;
    // limit the y-coordinate so the pepe doesn't touch the top text or bottom button.
    let newY = Math.random() * (newHeight - IMGH - 6 * newHeight * BUTTONFACTOR) + 3 * newHeight * BUTTONFACTOR;
    let newX = Math.random() * (newWidth - IMGW);
    pepeArr[i].src = "images/pepe.png";
    pepeArr[i].style.top = newY + "px";
    pepeArr[i].style.left = newX + "px";
    if (moveArr[i] - hitArr[i] == 1) {
        hp--;
        red.style.height = FULL * (hp / (HPFACTOR * num)) + "vh";
        if (hp < 0) {
            hp = 0;
        }
        document.querySelector("#hp").innerHTML = "HP: " + hp;
        moveArr[i] = 0;
        hitArr[i] = 0;
    }

    



}
function startMove() {
    for (let i = 0; i < num; i++) {
        timerArr[i] = setInterval(function () { move(i); }, HITTINGTIME);
    }
}



function handler(i) {
    if (isArr[i]) {
        return
    }
    isArr[i] = true;
    hit(i);
    clearInterval(timerArr[i]);
    timerArr[i] = setInterval(function () { move(i); }, HITTINGTIME);
    setTimeout(function () {

        isArr[i] = false;

    }, HITTINGTIME);
    




}

function hit(i) {
    hp = hp + gain;
    if (hp >= HPFACTOR * num) { 
    hp = HPFACTOR * num;
}

red.style.height = FULL * (hp / (HPFACTOR * num)) + "vh";
document.querySelector("#hp").innerHTML = "HP: " + hp;
hitArr[i]++
pepeArr[i].src = gifArr[i];

currentScore++;
document.querySelector("#score").innerHTML = "SCORE: " + currentScore;

audio.pause();
audio.currentTime = 0;
audio.play();





}
function startHandler() {
    for (let i = 0; i < num; i++) {
        pepeArr[i].onclick = function () { handler(i); };
    }
}

function reward() {

    let testTrue = isArr.filter(Boolean).length;

    if (testTrue >= GOODJOB && testTrue < WONDERFUL) {

        rewardMsg1.style.display = "block";
        cheer.style.display = "inline";

        setTimeout(function () {
            rewardMsg1.style.display = "none";
            cheer.style.display = "none";

        }, POPDELAY);


    }
    if (testTrue >= WONDERFUL) {

        
        cheer.src = "images/poggie.gif";
        cheer.style.display = "inline";
        rewardMsg2.style.display = "block";

        setTimeout(function () {
            rewardMsg2.style.display = "none";
            cheer.src = "images/cheer.gif";
            cheer.style.display = "none";

        }, POPDELAY);





    }

    if (hp <= 0) {
        lose();

    }
    

}

function check(event) {


    if ((event.target.tagName == "IMG" && event.target.id != "cheer" && event.target.id != "red") || event.target.tagName == "BUTTON" || !start) {
        return;
    }




    miss++;


    document.querySelector("#miss").innerHTML = "MISCLICK: " + miss;

    if (miss >= CAP) {
        lose();

    }




}

function startReward() {
    timeReward = setInterval(reward, POP);
}

startButton.addEventListener("click", generate);
startButton.addEventListener("click", startMove);
startButton.addEventListener("click", startHandler);
startButton.addEventListener("click", startReward);
startButton.addEventListener("click", startGame);
document.body.addEventListener("click", check);



function lose() {
    document.querySelector("html").style.backgroundImage = "url('images/defeat.png')";
    for (let i = 0; i < num; i++) {
        pepeArr[i].style.display = "none";
    }
    cheer.style.display = "none";
    rewardMsg1.style.display = "none";
    rewardMsg2.style.display = "none";
    red.style.display = "none";

    document.querySelector("#miss").style.display = "none";
    document.querySelector("#hp").style.display = "none";
    document.querySelector("#score").innerHTML = "YOU LOST ! <br> <br> Total Score: " + currentScore;

    clearInterval(timeReward);
    for (let i = 0; i < num; i++) {
        clearInterval(timerArr[i]);
    }

}





function press() {

    location.reload();


}

endButton.onclick = press;