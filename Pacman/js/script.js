let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext? canvas.getContext("2d") : undefined;
let time = 0;
let enemyArr = [];
let e1 = new Enemy(235, 235, 800, 450, 1);
e1.start();
let e2 = new Enemy(800, 235, 1365, 450, 2);
e2.start();
let e3 = new Enemy(800, 450, 1365, 665, 3);
e3.start();
let e4 = new Enemy(235, 450, 800, 665, 4);
e4.start();
let lost = false;
let won = false;
let fail = setInterval(() => {
    lose();
}, 30);
let winning = setInterval(() => {
    win();
}, 30);
let eatCandy;

let candies = [];
let counter = setInterval(count, 1000);

let animationE = [];
let animationRe = undefined;
enemyArr.push(e1);
enemyArr.push(e2);
enemyArr.push(e3);
enemyArr.push(e4);

$(document).ready(() => {
        generateCandies();
        eatCandy = setInterval(() => {
            checkCandy();
        }, 50);
        $("#pepe").offset({left: 775, top: 425});

        $(window).keydown(function (e) {
            e.preventDefault();
            move(e);
        }).mousedown(function (ev) {

            ev.preventDefault();


        }).contextmenu(function (e) {
            e.preventDefault();
        })



        drawScene();

        moveEnemy(1);
        moveEnemy(2);
        moveEnemy(3);
        moveEnemy(4);
        

})

function count() {
    time++;
    $("#time").html(time);
  }

function generateCandies() {
    let counter = 0;
    let newCandy = null;
    for (i = 210; i <= 1350; i+= 60) {
        newCandy = new Candy(counter, i, 210);
        candies.push(newCandy);
        counter++;
    }
    for (i = 210; i <= 1350; i+= 60) {
        newCandy = new Candy(counter, i, 425);
        candies.push(newCandy);
        counter++;
    }
    for (i = 210; i <= 1350; i+= 60) {
        newCandy = new Candy(counter, i, 640);
        candies.push(newCandy);
        counter++;
    }
    newCandy = new Candy(counter, 210, 280);
    candies.push(newCandy);
    counter++;
    newCandy = new Candy(counter, 210, 350);
    candies.push(newCandy);
    counter++;
    newCandy = new Candy(counter, 210, 495);
    candies.push(newCandy);
    counter++;
    newCandy = new Candy(counter, 210, 565);
    candies.push(newCandy);
    counter++;
    newCandy = new Candy(counter, 780, 280);
    candies.push(newCandy);
    counter++;
    newCandy = new Candy(counter, 780, 350);
    candies.push(newCandy);
    counter++;
    newCandy = new Candy(counter, 780, 495);
    candies.push(newCandy);
    counter++;
    newCandy = new Candy(counter, 780, 565);
    candies.push(newCandy);
    counter++;
    newCandy = new Candy(counter, 1345, 280);
    candies.push(newCandy);
    counter++;
    newCandy = new Candy(counter, 1345, 350);
    candies.push(newCandy);
    counter++;
    newCandy = new Candy(counter, 1345, 495);
    candies.push(newCandy);
    counter++;
    newCandy = new Candy(counter, 1345, 565);
    candies.push(newCandy);
}

function move(e) {
    let coor = $("#pepe").offset();
    let result;
    let pass;
    switch (e.which) {
        case 37:
            result = read(1)
            pass = judge(result)
            if (pass) {
                $("#pepe").offset({ left: coor.left - 10 })
            }
            break
        case 38:
            result = read(2)
            pass = judge(result)
            if (pass) {
                $("#pepe").offset({ top: coor.top - 10 })
            }
            break
        case 39:
            result = read(3)
            pass = judge(result)
            if (pass) {
                $("#pepe").offset({ left: coor.left + 10 })
            }
            break
        case 40:
            result = read(4)
            pass = judge(result)
            if (pass) {
                $("#pepe").offset({ top: coor.top + 10 })
            }
            break
    }
}

function read(d) {
    let coor = $("#pepe").offset()
    let pixelData;
    let pixelArr = [];
    if (canvas.getContext) {
        switch (d) {
            case 1:
                for (let i = 0; i <= 39; i++) {
                    pixelData = canvas.getContext('2d').getImageData(coor.left - 10, coor.top + i, 1, 1).data;
                    pixelArr.push(pixelData);
                }

                break
            case 2:
                for (let i = 0; i <= 39; i++) {
                    pixelData = canvas.getContext('2d').getImageData(coor.left + i, coor.top - 10, 1, 1).data;
                    pixelArr.push(pixelData);
                }


                break
            case 3:
                for (let i = 0; i <= 39; i++) {
                    pixelData = canvas.getContext('2d').getImageData(coor.left + 50, coor.top + i, 1, 1).data;
                    pixelArr.push(pixelData);
                }


                break
            case 4:
                for (let i = 0; i <=39; i++) {
                    pixelData = canvas.getContext('2d').getImageData(coor.left + i, coor.top + 50, 1, 1).data;
                    pixelArr.push(pixelData);
                }


                break
        }
        return pixelArr;

    }
}

function judge(result) {
    let returnValue = true;
    result.forEach((r) => {
        let red = r[0]
        let green = r[1]
        let blue = r[2]
        if ((red != 66) || (green != 129) || (blue != 164)) {
            returnValue = false;
        }
    })
    return returnValue;
}


function drawScene() {
    if (lost || won) cancelAnimationFrame(animationRe);
        ctx.beginPath();
        ctx.fillStyle = "#e4dfda";
        ctx.fillRect(0, 0, 1600, 900);
        ctx.fillStyle = "#4281a4";
        ctx.fillRect(200, 200, 1200, 500);

        ctx.lineWidth = 10;
        ctx.strokeStyle = "yellow";
        ctx.fillStyle = "yellow";

        ctx.moveTo(200, 205);
        ctx.lineTo(1395, 205);
        ctx.lineTo(1395, 695);
        ctx.lineTo(205, 695);
        ctx.lineTo(205, 205);

        ctx.moveTo(260, 265);
        ctx.lineTo(770, 265);
        ctx.lineTo(770, 420);
        ctx.lineTo(265, 420);
        ctx.lineTo(265, 265);

        
        ctx.moveTo(825, 265);
        ctx.lineTo(1335, 265);
        ctx.lineTo(1335, 420);
        ctx.lineTo(830, 420);
        ctx.lineTo(830, 265);

        ctx.moveTo(825, 480);
        ctx.lineTo(1335, 480);
        ctx.lineTo(1335, 635);
        ctx.lineTo(830, 635);
        ctx.lineTo(830, 480);

        ctx.moveTo(260, 480);
        ctx.lineTo(770, 480);
        ctx.lineTo(770, 635);
        ctx.lineTo(265, 635);
        ctx.lineTo(265, 480);

        ctx.stroke();
        ctx.closePath();

        animationRe = (!lost && !won) ? requestAnimationFrame(() => {
            drawScene();
        }) : null;
}



function moveEnemy(num) {
    if (lost || won) {
        cancelAnimationFrame(animationE[num-1]);
    }
    ctx.lineWidth = 5;
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(enemyArr[num-1].x, enemyArr[num-1].y, enemyArr[num-1].r , 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        animationE[num-1] = (!lost && !won) ? requestAnimationFrame(() => {
            moveEnemy(num);
        }) : null;



}

function lose(){
    let coor = $("#pepe").offset();
    let pixelData;
    for (let i = 0; i <= 39; i++) {
        for (let j = 0; j <= 39; j++) {
            pixelData = ctx.getImageData(coor.left + i, coor.top + i, 1, 1).data;
            if (pixelData[0] == 0 && pixelData[1] == 0 && pixelData[2] == 255) {
                lost = true;
                clearInterval(fail);
                clearInterval(eatCandy);
                clearInterval(counter);
                clearInterval(winning);
                $(window).unbind("keydown");
                enemyArr.forEach((e) => {
                    clearInterval(e.check);
                    clearInterval(e.step1);
                    clearInterval(e.step2);
                    clearInterval(e.step3);
                    clearInterval(e.step4);
                })
                $("#finaltimeL").html(time);
                $("#loseM").show();
                return;
            }
        }
    }
}

function win() {
    let complete = candies.every(checkWin);
    if (complete) {
        won = true;
        clearInterval(fail);
        clearInterval(eatCandy);
        clearInterval(counter);
        clearInterval(winning);
        $(window).unbind("keydown");
        enemyArr.forEach((e) => {
            clearInterval(e.check);
            clearInterval(e.step1);
            clearInterval(e.step2);
            clearInterval(e.step3);
            clearInterval(e.step4);
        })
        $("#finaltimeW").html(time);
        $("#winM").show();
    }
}

function checkWin(element) {
    return (element.obtained);
}

function checkCandy() {
    candies.forEach((c) => {
        if (c.obtained == false) {
            if ((Math.abs(c.x - $("#pepe").offset().left) < 20) && (Math.abs(c.y - $("#pepe").offset().top) < 20)) {
                c.obtained = true;
                c.remove();
            }
        }
    })
}

function Enemy(x1, y1, x2, y2, a) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.a = a;
    this.x = 0;
    this.y = 0;
    switch (this.a) {
        case 1:
            this.x = x1;
            this.y = y1;
            break;
        case 2:
            this.x = x2;
            this.y = y1;
            break;
        case 3:
            this.x = x2;
            this.y = y2;
            break;
        case 4:
            this.x = x1;
            this.y = y2;
            break;
        default:
            this.x = x1;
            this.y = y1;
            break;
    }

    this.move = (dir) => {
        switch (dir) {
            case 1:
                this.x += 5;
                break;
            case 2:
                this.y += 5;
                break;
            case 3:
                this.x -= 5;
                break;
            case 4:
                this.y -= 5;
                break;
        }
    }
    this.check = null;
    this.r = 20;
    this.step1 = null;
    this.step2 = null;
    this.step3 = null;
    this.step4 = null;
    this.start1 = () => {
        this.step1 = setInterval(() => {
            this.move(1);
        }, 50);
        this.check = setInterval(() => {
            if (this.x >= this.x2) {
                clearInterval(this.step1);
                clearInterval(this.check);
                this.start2();
            }
        }, 25)
    }
    this.start2 = () => {
        this.step2 = setInterval(() => {
            this.move(2);
        }, 50);
        this.check = setInterval(() => {
            if (this.y >= this.y2) {
                clearInterval(this.step2);
                clearInterval(this.check);
                this.start3();
            }
        }, 25)
    }
    this.start3 = () => {
        this.step3 = setInterval(() => {
            this.move(3);
        }, 50);
        this.check = setInterval(() => {
            if (this.x <= this.x1) {
                clearInterval(this.step3);
                clearInterval(this.check);
                this.start4();
            }
        }, 25)
    }
    this.start4 = () => {
        this.step4 = setInterval(() => {
            this.move(4);
        }, 50);
        this.check = setInterval(() => {
            if (this.y <= this.y1) {
                clearInterval(this.step4);
                clearInterval(this.check);
                this.start1();
            }
        }, 25)
    }
    this.start = () => {
        switch (this.a) {
            case 1:
                this.start1();
                break;
            case 2:
                this.start2();
                break;
            case 3:
                this.start3();
                break;
            case 4:
                this.start4();
                break;
        }
    }
}

function Candy(n, x, y) {
    this.n = n;
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 40;
    this.obtained = false;
    this.img = document.createElement("img");
    this.img.src = "img/candy.png";
    this.img.width = 40;
    this.img.height = 40;
    this.img.style.position = "absolute";
    this.img.style.top = this.y + 'px';
    this.img.style.left = this.x + 'px';
    document.body.appendChild(this.img);
    this.remove = () => this.img.remove();
}