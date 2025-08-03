let squares;
let sponge_pos;
let hole_pos;
let next_pos_color;

function deleteStartMessage() {
    const start_message = document.getElementById("start_message");
    start_message.remove();
}

function toggleSquarebox() {
    var squarebox = document.getElementById("squares");
    squarebox.style.display = "grid";
}

document.addEventListener("DOMContentLoaded", (event) => {
    document.addEventListener("keydown", (event) => {
        if(event.key === "Enter") {
            deleteStartMessage();
            toggleSquarebox();
            startGame();
        }
    });
});

function setSponge(squares) {
    sponge_pos = 0;
    squares[sponge_pos].style.backgroundColor = "rgb(113, 126, 40)";
}

function setHoles(squares) {
    for(let i = 0; i < 25; i++) {
        hole_pos = Math.floor(Math.random() * squares.length);
        if(squares[hole_pos].style.backgroundColor != "rgb(113, 126, 40)" &&
            (holeAllowed(hole_pos + 10) || holeAllowed(hole_pos + 1) || holeAllowed(hole_pos - 1) || holeAllowed(hole_pos - 10))
        ) {
            squares[hole_pos].style.backgroundColor = "#1f1f1f";
        }
        else {
            i--;
        }
    }
}

function holeAllowed(position) {
    const target_color = squares[position].style.backgroundColor;
    return target_color !== "rgb(31, 31, 31)";
}

function startGame() {
    squares = Array.from(document.querySelectorAll(".squarebox div"));
    setSponge(squares);
    setHoles(squares);
}



// ----- in dev

document.addEventListener("keydown", (event) => {
    switch(event.key) {
        case "ArrowUp":
            if(sponge_pos > 9 && movementAllowed(sponge_pos - 10)) {
                sponge_pos = updateSquare(sponge_pos, -10);
            }
            break;
        case "ArrowLeft":
            if(sponge_pos % 10 != 0 && movementAllowed(sponge_pos - 1)) {
                sponge_pos = updateSquare(sponge_pos, -1);
            }
            break;
        case "ArrowRight":
            if(sponge_pos % 10 != 9 && movementAllowed(sponge_pos + 1)) {
                sponge_pos = updateSquare(sponge_pos, 1);
            }
            break;
        case "ArrowDown":
            if(sponge_pos < 90 && movementAllowed(sponge_pos + 10)) {
                sponge_pos = updateSquare(sponge_pos, 10);
            }
            break;
    }
});

function movementAllowed(position) {
    const target_color = squares[position].style.backgroundColor;
    return target_color != "rgb(31, 31, 31)" && target_color != "rgb(113, 126, 40)";
}

function updateSquare(sponge_pos, distance) {
    sponge_pos += distance;
    squares[sponge_pos].style.backgroundColor = "rgba(113, 126, 40, 1)";
    return sponge_pos;
}