let final_score = 0;
let w = [0, 0, 0, 0];
let w_0 = [];
let w_1 = [];
let w_2 = [];
let w_3 = [];
let w_all = [w_0, w_1, w_2, w_3];
let rngInterval;
const GOOD = 1;
const GREAT = 3;
const PERFECT = 5;
const MISS = -1;
const TIME = 250;
const WAIT = 5000;

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "ArrowLeft":
            score(0);
            break;
        case "ArrowDown":
            score(1);
            break;
        case "ArrowUp":
            score(2);
            break;
        case "ArrowRight":
            score(3);
            break;
        case "a":
            score(0);
            break;
        case "s":
            score(1);
            break;
        case "w":
            score(2);
            break;
        case "d":
            score(3);
            break;
        case "A":
            score(0);
            break;
        case "S":
            score(1);
            break;
        case "W":
            score(2);
            break;
        case "D":
            score(3);
            break;
        default:
            break;
    }
})

$('#start').click(() => {
    $("#start_btn").hide();
    $("#game_page").show();
    $('body').css('background-image','url("background.gif")');
    gameStart();
})

function gameStart() {
    let bgm = new Audio('bgm3.mp3');
    bgm.volume = 0.2;
    bgm.play();
    setTimeout(() => {
        endGame();
    }, TIME * 1000);
    setTimeout(() => {
        clearInterval(rngInterval);
    }, (TIME - 5) * 1000);
    setTimeout(() => {
        rngInterval = setInterval(() => rng(), 1000);
    }, WAIT);
}

function drop(key, single) {
    w[key] ++;
    let keyStr = (single? 'w_' : 'x_') + key;
    let idStr = keyStr + "_" + w[key];
    let newArrow = '<img src="' + keyStr + '.png" id="' + idStr + '" class="co' + key + '">';
    $("body").append(newArrow);
    let positionLeft = 12 + key * 22;
    let positionLeftStr = positionLeft + 'vw';
    $("#" + idStr).css({'position':'absolute','left':positionLeftStr,'top':'0vh'});
    let vh = 4;
    let interval = setInterval(() => {
        vh += 1;
        let vhStr = vh + 'vh';
        if ($("#" + idStr).offset()) {
            if (($("#" + idStr).offset().top + $("#" + idStr).outerHeight(true)) > $(document).height() * 0.95) {
                $("#" + idStr).remove();
                clearInterval(interval);
            }
            $("#" + idStr).css({'top':vhStr});
        }
    }, 50);
}

function score(key) {
    let classStr = 'co' + key;
    let idStr = 'w' + key;
    $('.' + classStr).each((i, arrow) => {
        if (Math.abs($(arrow).offset().top - $("#" + idStr).offset().top) < 20) {
            final_score += GREAT;
            $(arrow).remove();
        }
         else if (Math.abs($(arrow).offset().top - $("#" + idStr).offset().top) < 50) {
            final_score += GOOD;
            $(arrow).remove();
        }
        $("#score").html(final_score);
    })
}

function rng() {
    let flip = [0, 0, 0, 0];
    let single = Math.random() < 0.7? true : false;
    if (single) {
        let roll = Math.floor(4 * (Math.random()));
        flip[roll] = 1;
    } else {
        let roll = Math.floor(6 * (Math.random()));
        switch (roll) {
            case 0:
                flip = [1,1,0,0];
            case 1:
                flip = [1,0,1,0];
                break;
            case 2:
                flip = [1,0,0,1];
                break;
            case 3:
                flip = [0,1,1,0];
                break;
            case 4:
                flip = [0,1,0,1];
                break;
            case 5:
                flip = [0,0,1,1];
                break;
            default:
                break;
        }
    }
    spawn(flip,single);
}

function spawn(flip,single) {
    for (let i = 0; i < 4; i++) {
        if (flip[i] === 1) {
            drop(i,single);
        }
    }
}

function endGame() {
    $("#game_page").hide();
    $('body').css('background-image','url("background_0.png")');
    $('#final_score_num').html(final_score);
    $("#final_score").show();
}