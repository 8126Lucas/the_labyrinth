let squares;
let sponge_pos;
let hole_pos;
let next_pos_color;
let move_counter;

function deleteStartMessage() {
    const start_message = document.getElementById("start_message");
    start_message.remove();
}

function toggleSquarebox(mode) {
    var squarebox = document.getElementById("squares");
    squarebox.style.display = mode;
}

function setSponge(squares) {
    sponge_pos = 0;
    squares[sponge_pos].style.backgroundColor = "rgb(113, 126, 40)";
}

function setHoles(squares) {
    for(let i = 0; i < 124; i++) {
        hole_pos = Math.floor(Math.random() * squares.length);
        if(squares[hole_pos].style.backgroundColor != "rgb(113, 126, 40)" && 
            hole_pos != 399 && hole_pos != 1 && hole_pos != 20 && hole_pos != 21 && hole_pos != 398 && hole_pos != 379 && hole_pos != 378 ) {
            squares[hole_pos].style.backgroundColor = "#1f1f1f";
        }
        else {
            i--;
        }
    }
}

function startGame() {
    squares = Array.from(document.querySelectorAll(".squarebox div"));
    move_counter = 0;
    setSponge(squares);
    setHoles(squares);
}

document.addEventListener("DOMContentLoaded", (event) => {
    document.addEventListener("keydown", (event) => {
        if(event.key === "Enter") {
            deleteStartMessage();
            toggleSquarebox("grid");
            startGame();
        }
    });
});

function movementAllowed(position) {
    const target_color = squares[position].style.backgroundColor;
    return target_color != "rgb(31, 31, 31)" && target_color != "rgb(113, 126, 40)";
}

function updateSquare(sponge_pos, distance) {
    sponge_pos += distance;
    squares[sponge_pos].style.backgroundColor = "rgba(113, 126, 40, 1)";
    move_counter++;
    return sponge_pos;
}

function checkWin(sponge_pos) {
    return sponge_pos === 399;
}
function winner() {
    toggleSquarebox("none");
    var win_message = document.getElementById("win");
    win_message.style.display = "flex";
    document.getElementById("win").innerHTML = "Congratulations!<br>You won after " + move_counter + " moves!";
}

document.addEventListener("keydown", (event) => {
    switch(event.key) {
        case "ArrowUp":
            if(sponge_pos > 19 && movementAllowed(sponge_pos - 20)) {
                sponge_pos = updateSquare(sponge_pos, -20);
            }
            break;
        case "ArrowLeft":
            if(sponge_pos % 20 != 0 && movementAllowed(sponge_pos - 1)) {
                sponge_pos = updateSquare(sponge_pos, -1);
            }
            break;
        case "ArrowRight":
            if(sponge_pos % 20 != 19 && movementAllowed(sponge_pos + 1)) {
                sponge_pos = updateSquare(sponge_pos, 1);
            }
            break;
        case "ArrowDown":
            if(sponge_pos < 380 && movementAllowed(sponge_pos + 20)) {
                sponge_pos = updateSquare(sponge_pos, 20);
            }
            break;
    }
    if(checkWin(sponge_pos)) {
        winner();
    }
});
