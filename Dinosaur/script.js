let isJump = false;
let isDuck = false;
let spawnCount = 0;
let fail = false;
let timer = 0;

$("#start_btn").click(() => {
    $("#start_page").hide();
    $("#game_page").show();
    setTimeout(() => {
        let run = setInterval(() => {
            startObstacles();
        }, 1500);
        let checkInt = setInterval(() => {
            timer += 50;
            if (check()) {
                fail = true;
                clearInterval(run);
                clearInterval(checkInt);
                failed();
            }
        }, 50);
    }, 500);
});


document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case ' ':
            jump();
            break;
        case 'ArrowUp':
            jump();
            break;
        case 'ArrowDown':
            duck();
            break;
        default:
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowDown':
            stopduck();
            break;
        default:
            break;
    }
});

function jump() {
    if (isJump || isDuck) {
        return;
    }
    isJump = true;
    let height = 30;
    let jumpInt = setInterval(() => {
        height += 1;
        let heightStr = height + 'vh';
        $("#pepe").css({'bottom': heightStr});
    }, 30)
    setTimeout(() => {
        clearInterval(jumpInt)
        let fallInt = setInterval(() => {
            height -= 1;
            let heightStr = height + 'vh';
            $("#pepe").css({'bottom': heightStr});
        }, 50)
        setTimeout(() => {
            clearInterval(fallInt);
            isJump = false;
        }, 750);
    }, 450);

}

function duck() {
    if (isDuck || isJump) {
        return;
    }
    isDuck = true;
    $("#pepe").css({'height': '5vh','width': '10vh'});
}

function stopduck() {
    if (!isDuck) {
        return;
    }
    isDuck = false;
    $("#pepe").css({'height': '10vh','width': '10vh'});
}

function startObstacles() {
    if (fail) {
        return;
    }
    spawnCount ++;
    num = spawnCount;
    let rng = Math.floor(Math.random() * 10) % 2 === 1;
    if (rng) {
        topspawn(num);
    } else {
        bottomspawn(num);
    }
}

function topspawn(num) {
    if (fail) {
        return;
    }
    let timeIndex = Math.floor(timer/10000);
    let rng = (1 + Math.random()) * 6;
    let plane = '<img class="planes" src="plane.gif" id="t_' + num + '" style="height:6vh;width:' + rng + 'vh;position:absolute;right:0;bottom:36vh">';
    $("#game_page").append(plane);
    let r = 0;
    let interval = 30 * Math.pow(0.9, timeIndex);
    let move = setInterval(() => {
        if (fail) {
            clearInterval(move);
        }
        r += 1;
        $("#t_" + num).css('right', r + 'vw');
        if (($("#t_" + num).offset().left + $("#t_" + num).outerWidth(true)) < 0) {
            $("#t_" + num).remove();
            clearInterval(move);
        }
    }, interval);
}

function bottomspawn(num) {
    if (fail) {
        return;
    }
    let timeIndex = Math.floor(timer/10000);
    let rng = (1 + Math.random()) * 6;
    let shield = '<img class="shields" src="shield.png" id="b_' + num + '" style="height:6vh;width:' + rng + 'vh;position:absolute;right:0;bottom:30vh">';
    $("#game_page").append(shield);
    let r = 0;
    let interval = 30 * Math.pow(0.9, timeIndex);
    let move = setInterval(() => {
        if (fail) {
            clearInterval(move);
        }
        r += 1;
        $("#b_" + num).css('right', r + 'vw');
        if (($("#b_" + num).offset().left + $("#b_" + num).outerWidth(true)) < 0) {
            $("#b_" + num).remove();
            clearInterval(move);
        }
    }, interval);
}

function check() {
    let result = false;
    let a1 = $("#pepe").offset().left;
    let a2 = $("#pepe").offset().left + $("#pepe").outerWidth(true);
    let b1 = $("#pepe").offset().top;
    let b2 = $("#pepe").offset().top + $("#pepe").outerHeight(true);
    let planes = $('.planes');
    planes.each((i, plane) => {
        let x1 = $(plane).offset().left;
        let x2 = $(plane).offset().left + $(plane).outerWidth(true);
        let y1 = $(plane).offset().top;
        let y2 = $(plane).offset().top + $(plane).outerHeight(true);
        if ((a1 <= x1 && x1 <= a2) || (a1 <= x2 && x2 <= a2)) {
            if ((b1 <= y1 && y1 <= b2) || (b1 <= y2 && y2 <= b2) ) {
                result = true;
            }
        }
    })
    let shields = $('.shields');
    shields.each((i, shield) => {
        let x1 = $(shield).offset().left;
        let x2 = $(shield).offset().left + $(shield).outerWidth(true);
        let y1 = $(shield).offset().top;
        let y2 = $(shield).offset().top + $(shield).outerHeight(true);
        if ((a1 <= x1 && x1 <= a2) || (a1 <= x2 && x2 <= a2)) {
            if ((b1 <= y1 && y1 <= b2) || (b1 <= y2 && y2 <= b2) ) {
                result = true;
            }
        }
    })
    return result;
}

function failed() {
    $("#game_page").hide();
    $("#fail_page").show();
    $("#time_num").html(timer / 1000 + ' s')
}