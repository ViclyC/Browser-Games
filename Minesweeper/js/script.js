let input = prompt("choose a board size", "1");
let size;
const CAP = 50;
let testInput = false;

// Check if input is allowed board size
for (let i = 1; i<= CAP; i++){
    if (i == input){
        testInput = true;
        size = parseInt(input);
    }
}

while (!testInput){
    input = prompt("That's not a valid input, try again", "1");
    
    for (let i = 1; i<= CAP; i++){
        if (i == input){
            testInput = true;
            size = parseInt(input);
        }
    }
}



let buttonArr = new Array(size * size);
let bombArr = [];
let displayArr = new Array((size + 2)*(size + 2)).fill(0);
let isClick = new Array(size * size).fill(false);
let revealArr = new Array((size + 2)*(size + 2)).fill(true);
let restart = document.querySelector("#restart");
restart.style.position = "absolute";
restart.style.top = "10px";

// Create the board
for (let i = 0; i <= (size - 1); i++){
    for (let j = 0; j <= (size - 1); j++){
        let k = i * size + j;
        let l = (i + 1) * (size + 2) + j + 1 ;
        
        buttonArr[k] = document.createElement("img");
        buttonArr[k].setAttribute("id", l);

        buttonArr[k].src = "images/button.png";
        buttonArr[k].style.position = "absolute";
        buttonArr[k].style.width = "50px";
        buttonArr[k].style.height = "50px";
        buttonArr[k].style.left = 50*j + "px";
        buttonArr[k].style.top = 50 + 50*i + "px";
        document.getElementById("body").appendChild(buttonArr[k]);
        revealArr[l] = false;
        buttonArr[k].onclick = function(){check(k)};
        buttonArr[k].oncontextmenu = function(){flag(k)};


    }
}

// Randomly pick some cells to be bombs

while (bombArr.length < size){
    let ran = Math.floor(Math.random()*size * size);
    if (bombArr.indexOf(ran) == -1){
        bombArr.push(ran);
        
    }
}


for (let i = 0; i< size; i++){
    let bombID = buttonArr[bombArr[i]].id;
    console.log(bombID);
    displayArr[bombID] = -1;
    let bombY = bombID % (size + 2);
    let bombX = (bombID - bombY) / (size + 2);
    for (let j = (bombX - 1); j <= (bombX + 1); j++){
        for (let k = (bombY - 1); k <= (bombY + 1); k++){
            
            let displayNum = j * (size + 2) + k;

            if (displayArr[displayNum] == -1){
                continue;
            }
            displayArr[displayNum] ++
            
        }
    }
}

// Check the clicked cell.
// Already revealed = do nothing
// Bomb = reveal every bomb and lose game
// Not bomb = reveal this cell, then check if more cells
// Are to be revealed in expand(buttonID)
function check(i){

    let buttonID = buttonArr[i].id;

    if (revealArr[buttonID]){
        return;
    }
    revealArr[buttonID] = true;
    isClick[i] = true;
    if (bombArr.includes(i)){
        buttonArr[i].src = "images/bomb.jpg";
        for (let i = 0; i <= (size - 1); i++){
            buttonArr[bombArr[i]].src = "images/bomb.jpg";
        }
        for (let i = 0; i <= size * size - 1; i++){
            buttonArr[i].onclick = null;
            buttonArr[i].oncontextmenu = function(){
                event.preventDefault();
            }
        }
    } else {
        
        let buttonID = buttonArr[i].id;
        //console.log(buttonID);
        let picNum = displayArr[buttonID];
        //console.log(picNum);
        buttonArr[i].src = "images/" + picNum + ".PNG";
        revealArr[buttonID] = true;
        console.log(revealArr);
        
            expand(buttonID);
        
    }
    console.log(displayArr);
}


// Check which neighboring cells are to be revealed
// Recursively calls the function until all cells that should be revealed are revealed
function expand(buttonID){
    
    let picNum = displayArr[buttonID];
    if (picNum != 0){
        return;
    }
    let clickY = buttonID % (size + 2);
            let clickX = (buttonID - clickY) / (size + 2);
            
            for (let j = (clickX - 1); j <= (clickX + 1); j++){
                for (let k = (clickY - 1); k <= (clickY + 1); k++){
                    if (j == clickX && k == clickY){
                        continue;
                    }
                    
                    let checkID = j * (size + 2) + k;
                    // Only reveal if cell isn't a bomb and has not been checked yet IMPORTANT
                    if (displayArr[checkID] != -1 && !revealArr[checkID]){
                        if (j > size || j < 1 || k > size || k < 1){
                            continue;
                        }
                        document.getElementById(checkID).src = "images/" + displayArr[checkID] + ".PNG";
                        revealArr[checkID] = true;
                        
                        expand(checkID);
                        
                        
                        
                    }

                    
                    
                }
            }
        
}



// Right click flags an unrevealed cell
function flag(i){
    let buttonID = buttonArr[i].id;
    event.preventDefault();
    if (revealArr[buttonID]){
        return;
    }
    
    buttonArr[i].src = "images/flag.PNG";
}

// Wins the game if every non-bomb cell has been revealed
function win(){
    
    
    for (let i = 0; i <= (size + 2)*(size + 2) - 1; i++){
        if (displayArr[i] != -1 && !revealArr[i]){
            return;
        }
        
    }
    console.log("win!");
    document.querySelector("h2").style.position = "absolute";
    document.querySelector("h2").style.bottom = "10px";
    document.querySelector("h2").innerHTML = "WIN!";

    for (let i = 0; i < size*size; i++){
        buttonArr[i].onclick = null;
        buttonArr[i].oncontextmenu = function(){
            event.preventDefault();
        }

    }
    clearInterval((checkWin));
}

restart.onclick = function(){
    location.reload();
}





let checkWin = setInterval(win, 500);