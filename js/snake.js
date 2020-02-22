var canvas;
var canvasContext;
let ballX = 50;
let ballSpeedX = 10;
var lastDirection = "None";

var snake = [
    { x: 150, y: 10,color:"red" },
    { x: 140, y: 10,color:"azure" },
    { x: 130, y: 10,color:"azure" },
    { x: 120, y: 10,color:"azure" },
  ]

function generateFood(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    food_x = 1;
    food_y = 1;
    while (food_x % 10 != 0 || food_y % 10 != 0) {
        food_x = Math.floor(Math.random() * (max - min)) + min;
        food_y = Math.floor(Math.random() * (max - min)) + min;
        console.log(food_x);
        food={
            "x" : food_x,
            "y" : food_y
        }  
      }
    
    
    return food;
}

function showFood(min, max){

    let food = generateFood(min, max)
}
console.log(generateFood(790,590));

function move(lastDir){
    console.log(lastDir);
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0,canvas.clientWidth,canvas.height);

    if (lastDir === "ArrowRight"){
        snake[3].x = snake[2].x;
        snake[2].x = snake[1].x;
        snake[1].x = snake[0].x;
        snake[0].x += 10;

        snake[3].y = snake[2].y;
        snake[2].y = snake[1].y;
        snake[1].y = snake[0].y;
        
        snake.forEach(block=>{
            canvasContext.fillStyle = block.color;
            canvasContext.fillRect(block.x,block.y,10,10);
        });
    }
    if (lastDir === "ArrowDown"){
        snake[3].x = snake[2].x;
        snake[2].x = snake[1].x;
        snake[1].x = snake[0].x;
        // snake[0].x += 10;

        snake[3].y = snake[2].y;
        snake[2].y = snake[1].y;
        snake[1].y = snake[0].y;
        snake[0].y += 10;
        
        snake.forEach(block=>{
            canvasContext.fillStyle = block.color;
            canvasContext.fillRect(block.x,block.y,10,10);
        });
    }

    if (lastDir === "ArrowUp"){
        snake[3].x = snake[2].x;
        snake[2].x = snake[1].x;
        snake[1].x = snake[0].x;
        // snake[0].x += 10;

        snake[3].y = snake[2].y;
        snake[2].y = snake[1].y;
        snake[1].y = snake[0].y;
        snake[0].y -= 10;
        
        snake.forEach(block=>{
            canvasContext.fillStyle = block.color;
            canvasContext.fillRect(block.x,block.y,10,10);
        });
    }

    if (lastDir === "ArrowLeft"){
        snake[3].x = snake[2].x;
        snake[2].x = snake[1].x;
        snake[1].x = snake[0].x;
        snake[0].x -= 10;

        snake[3].y = snake[2].y;
        snake[2].y = snake[1].y;
        snake[1].y = snake[0].y;
        
        snake.forEach(block=>{
            canvasContext.fillStyle = block.color;
            canvasContext.fillRect(block.x,block.y,10,10);
        });
    }

    else if(lastDir===undefined){

    }
    else{

    }
}

window.onload = function () {
    canvas = document.querySelector("#gameCanvas");
    canvasContext = canvas.getContext("2d");
    // setInterval(callBoth,1000/30);
    drawSnake(snake);
    // console.log(lastDirection);
    setInterval(function(){move(lastDirection);},1000);
};


function updateLastDir(keyEventName){
    lastDirection = keyEventName;
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    console.log(keyName);
    updateLastDir(keyName);
})

function drawSnake(snakeBlocks){
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0,canvas.clientWidth,canvas.height);

    snakeBlocks.forEach(block=>{
        canvasContext.fillStyle = block.color;
        canvasContext.fillRect(block.x,block.y,10,10);
    });
} 


// function callBoth(){
//     moveEverything();
//     drawEverything();
// }

// function callBoth(){
//     moveEverything();
//     drawEverything();
// }

// function moveEverything(){
//     ballX = ballX+ballSpeedX;
// }

// function drawEverything(){
//     canvasContext.fillStyle = "black";
//     canvasContext.fillRect(0,0,canvas.clientWidth,canvas.height);
//     canvasContext.fillStyle = "blue";
//     canvasContext.fillRect(200,ballX,50,50);
// }

// snake begins with 4 blocks
// moving horizontally to the right

// click down arrow
// first block (the head) goes down

// three remaining blocks on the left


//   moveRight();
  
//   // snake head is equal to snake[0];
  
//   function moveRight() {
//     snake[0].x += 10;
//     snake[1].x += 10;
//     snake[2].x += 10;
//     snake[3].x += 10;  
//   }
  
//   function moveDown() {
//     // move snake head downwards
    
//     // loop through each snake body part starting at the second piece
//     // move each piece to where the parent piece was
//   }