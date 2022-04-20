let ctx = canvas.getContext ('2d');
let key = {};
let ball = {};
let radius = 5;
let circle = 75;
let gameEnded = false;
let playerOne = {
    x: 15,
    y: 200,
    width: 10,
    height: 80,
    points:  0
}

let playerTwo = {
    x: 695,
    y: 200,
    width: 10,
    height: 80,
    points:  0
}



function setNames() {
    let playerOneName = document.getElementById("player-one-name").value;
    let playerTwoName = document.getElementById("player-two-name").value;
    if (playerOneName && playerTwoName) {
        playerOne.name = playerOneName;
        playerTwo.name = playerTwoName;
        document.getElementById("start-screen").style.display = "none";
        init();
    } else {
        alert("Beide Spieler müssen benannt werden :P");
    }
}

function init() {//start game
    drawBall();
    setInterval(controlp1, 1000/60);
    setInterval(controlp2, 1000/60);
    setInterval(controlball, 1000/60);
    document.addEventListener('keydown', e => key[e.keyCode] = true); //keyCode
    document.addEventListener('keyup', e => key[e.keyCode] = false);
    draw();
}

function drawBall() {
    ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        speedX:   3,
        speedY:  1.5
    };
}

function controlp1 (){
    if (key[87]){
        playerOne.y -= 7;
    }
    if (key[83]){
        playerOne.y += 7;
    } 
    
}

function controlp2 (){
    if (key[38]){
        playerTwo.y -= 7;
    }
    if (key[40]){
        playerTwo.y += 7;
    } 
}



function controlball(){    
    if (gameEnded) { return };
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x < 25 || ball.x > (canvas.width -30)) {
        if (ball.y > playerOne.y && ball.y < playerOne.y + 80 && ball.speedX < 0) {
            ball.speedX = -ball.speedX; 
          }
        else if (ball.y > playerTwo.y && ball.y < playerTwo.y + 80 && ball.speedX > 0) {
            ball.speedX = -ball.speedX;        
          }
    }
  
    if (ball.y < 0 || ball.y > (canvas.height)) {
        ball.speedY = -ball.speedY;
    }
   
    if (ball.x > (canvas.width)) {
        playerOne.points = playerOne.points + 1;
        gameOver();
        setTimeout(playerOneGoal, 1000/120);
    }

    if (ball.x < 0){
        playerTwo.points = playerTwo.points  + 1;
        gameOver();
        setTimeout(playerTwoGoal, 1000/120);
    }
}

function playerTwoGoal(){
        ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        speedX:   5,
        speedY:  1.5
    };
}
 
function playerOneGoal(){
    ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speedX:   -5,
    speedY:  1.5
    };
}

function gameOver() { //check playerpoints > 5; set endscreen
    if(playerOne.points > 5) {
        document.getElementById("player-name-text").innerHTML = playerOne.name + ' hat gewonnen';
    }

    if (playerTwo.points > 5){
        document.getElementById("player-name-text").innerHTML = playerTwo.name + ' hat gewonnen';
    }
    if (playerOne.points > 5 || playerTwo.points > 5) {
        endGame();
    }
}

function endGame () {
    gameEnded = true;
    document.getElementById("end-screen").style.display ="flex";
    document.getElementById("game-container").style.display ="none";
}

function draw(){
    ctx.fillStyle = 'black';//canvas background
    ctx.fillRect (0,0,canvas.width, canvas.height); 
    ctx.fillStyle = 'grey';//middle  line position + Middle Circle + color
    ctx.fillRect (canvas.width / 2  - 2.5, 0 , 5 , 480); 
    ctx.beginPath();
    ctx.fillStyle = 'grey';
    ctx.arc(canvas.width / 2, canvas.height / 2, circle, 0, 2 * Math.PI, true);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "grey";
    ctx.stroke();
    ctx.fillStyle = 'hotpink';
    requestAnimationFrame(draw);
    ctx.fillRect (playerOne.x, playerOne.y , playerOne.width, playerOne.height); //player 1 (distance left, id, width, height)
    ctx.fillStyle = 'green';
    ctx.fillRect (playerTwo.x, playerTwo.y , playerTwo.width, playerTwo.height); //player 2
    ctx.fillStyle = 'yellow'; //ball color 
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, radius, 0, 2 * Math.PI, true);
    ctx.fill();
    document.getElementById("p1_points_container").innerHTML = playerOne.name + ': ' + playerOne.points;
    document.getElementById("p2_points_container").innerHTML = playerTwo.name + ': ' +  playerTwo.points;
}
