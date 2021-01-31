let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //context = renderiza o desenho que está dentro do canvas
let box = 32;
let snake = [];

snake[0]={
    x: 8*box,
    y: 8*box
}

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1)*box,
    y: Math.floor(Math.random() * 15 + 1)*box
}

function criarBG(){
    context.fillStyle = "lightgreen"; //fillStyle = tabalha com o estilo do canvas
    context.fillRect(0, 0, 16*box, 16*box); //fillRect desenha o retangulo do canva (x, y, altura, largura)
}

function criarCobrinha(){
    for(var i=0; i<snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x,snake[i].y, box, box);
    }
}
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update); //escuta o keydown e chama a função update

function update(event){ //chama a função update e passa o event como argumento
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";

}
function iniciarJogo(){

    for(var i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("GAME OVER :( !!!");
        }
    }

    //para não ultrapassar os limites e sumir do canva
    if(snake[0].x > 15*box && direction =="right") snake[0].x = 0;
    if(snake[0].x < 0 && direction =="left") snake[0].x = 16*box;
    if(snake[0].y > 15*box && direction =="down") snake[0].y = 0;
    if(snake[0].y < 0 && direction =="up") snake[0].y = 16*box;
    //

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box; //se a condição for true, vai adicionar um quadradinho a mais
    if(direction == "left") snakeX -= box; //se a condição for true, vai diminuir um quadradinho para ter a ilusão de estar indo para a esquerda
    if(direction == "up") snakeY -= box; //se a condição for true, vai addiminuir um quadradinho para ter a ilusão de estar indo pra cima
    if(direction == "down") snakeY += box; //se a condição for true, vai adicionar um quadradinho a mais para ter a ilusão de ir para baixo

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); // o .pop() remove o último elemento do array
    } else {
        food.x = Math.floor(Math.random() * 15 + 1)*box;
        food.y = Math.floor(Math.random() * 15 + 1)*box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //insere algo no início do array

}

let jogo = setInterval(iniciarJogo, 100);