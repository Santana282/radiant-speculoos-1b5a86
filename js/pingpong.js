// js/pingpong.js - Pong Cósmico (Kevin vs Analy)
const pongCanvas = document.getElementById('pongCanvas');
if (pongCanvas) {
    const pCtx = pongCanvas.getContext('2d');
    let ball = { x: 150, y: 100, dx: 3, dy: 3, radius: 6 };
    let paddleKevin = { y: 70, height: 50, width: 8 };
    let paddleAnaly = { y: 70, height: 50, width: 8 };

    function loopPong() {
        pCtx.fillStyle = '#0a0a16';
        pCtx.fillRect(0, 0, pongCanvas.width, pongCanvas.height);

        // Pelota de luz
        pCtx.fillStyle = '#ffd32a';
        pCtx.beginPath();
        pCtx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        pCtx.fill();

        // Raquetas
        pCtx.fillStyle = '#70a1ff';
        pCtx.fillRect(10, paddleKevin.y, paddleKevin.width, paddleKevin.height);
        
        pCtx.fillStyle = '#ff77a9';
        pCtx.fillRect(pongCanvas.width - 18, paddleAnaly.y, paddleAnaly.width, paddleAnaly.height);

        // Física y rebotes
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.y <= 0 || ball.y >= pongCanvas.height) ball.dy *= -1;

        if (ball.x <= 18 && ball.y >= paddleKevin.y && ball.y <= paddleKevin.y + paddleKevin.height) ball.dx *= -1;
        if (ball.x >= pongCanvas.width - 26 && ball.y >= paddleAnaly.y && ball.y <= paddleAnaly.y + paddleAnaly.height) ball.dx *= -1;

        if (ball.x < 0 || ball.x > pongCanvas.width) {
            ball.x = pongCanvas.width / 2;
            ball.y = pongCanvas.height / 2;
        }

        // Seguimiento automático
        paddleKevin.y += (ball.y - (paddleKevin.y + 25)) * 0.08;
        paddleAnaly.y += (ball.y - (paddleAnaly.y + 25)) * 0.08;

        requestAnimationFrame(loopPong);
    }
    loopPong();
}
