var canvas;
var canvasContext;
let ballX = 50;
let ballSpeedX = 10;
var lastDirection = "None";
var food;
var directions = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp",]
var snake = [
    { x: 150, y: 10, color: "red" },
    { x: 140, y: 10, color: "azure" },
    { x: 130, y: 10, color: "azure" },
    { x: 120, y: 10, color: "azure" },
]

window.onload = function () {
    canvas = document.querySelector("#gameCanvas");
    canvasContext = canvas.getContext("2d");
    // setInterval(callBoth,1000/30);
    food = generateFood(canvas.clientWidth, canvas.height);
    setInterval(function () {
        move(snake, lastDirection);
        eatFood();
    }, 1000 / 10);
};

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    updateLastDir(keyName);
})

// Handle when snake eat food
function eatFood() {
    lastBlock = snake[snake.length - 1];
    if (food.x == snake[0].x && food.y == snake[0].y) {
        snake.push({ x: lastBlock.x, y: lastBlock.y, color: "azure" })
        let food = generateFood(canvas.clientWidth, canvas.height);
    }
    showFood(food);
}

// Generate food coordinaetes
function generateFood(max_x, max_y) {
    max_x = Math.floor(max_x);
    max_y = Math.floor(max_y);
    food_x = 1;
    food_y = 1;
    while (food_x % 10 != 0 || food_y % 10 != 0) {
        food_x = Math.floor(Math.random() * (max_x - 0)) + 0;
        food_y = Math.floor(Math.random() * (max_y - 0)) + 0;
        food = {
            "x": food_x,
            "y": food_y
        }
    }
    return food;
}

//Show food on canvas
function showFood(foodPosition) {
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(foodPosition.x, foodPosition.y, 10, 10);
}

//Clear last snake position
function clearSnake(snake) {
    snake.forEach(block => {
        canvasContext.clearRect(block.x, block.y, 10, 10);
    });
}

// update the snake tail
function updateSnakeTail(){
    for (let i = snake.length - 1; i >= 1; i--) {
        // console.log(snake[i]);
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
}
//Update new coordinates of snake
function updateSnakeBlocks(snake, lastDir) {
    if (directions.includes(lastDir)) {
        if (lastDir === "ArrowRight") {
            updateSnakeTail()
            snake[0].x += 10;
        }

        if (lastDir === "ArrowDown") {
            updateSnakeTail()
            snake[0].y += 10;
        }

        if (lastDir === "ArrowUp") {
            updateSnakeTail()
            snake[0].y -= 10;
        }

        if (lastDir === "ArrowLeft") {
            updateSnakeTail()
            snake[0].x -= 10;
        }
    }
    else {

    }

}

// Handle the snake movement
function move(snake, lastDir) {
    drawBackground();
    updateSnakeBlocks(snake, lastDir)
    drawSnake(snake);
}

// Update the direction of the snake
function updateLastDir(keyEventName) {
    if (keyEventName != lastDirection) {
        if ((keyEventName === "ArrowUp" && lastDirection === "ArrowDown") ||
            (keyEventName === "ArrowDown" && lastDirection === "ArrowUp") ||
            (keyEventName === "ArrowLeft" && lastDirection === "ArrowRight") ||
            (keyEventName === "ArrowRight" && lastDirection === "ArrowLeft")) {

        }
        else {
            lastDirection = keyEventName;
        }
    }
}

// draw the snake based on its coordinates
function drawSnake(snakeBlocks) {
    snakeBlocks.forEach(block => {
        canvasContext.fillStyle = block.color;
        canvasContext.fillRect(block.x, block.y, 10, 10);
    });
}
//draw canvas background
function drawBackground() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.clientWidth, canvas.height);
}
