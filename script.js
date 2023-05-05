let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

function drawBackFrame() {
    windowWidth = windowWidth;
    windowHeight = windowHeight;

    frame = document.getElementById("back-frame");
    frame.width = windowWidth;
    frame.height = windowHeight;
    
    let ctx = frame.getContext("2d");
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.5;

    ctx.moveTo(50, 0.1 * windowWidth + 50);
    ctx.lineTo(50, windowHeight - 75);
    ctx.lineTo(75, windowHeight - 50);
    ctx.lineTo(windowWidth - 100, windowHeight - 50);
    ctx.lineTo(windowWidth - 50, windowHeight - 100);
    ctx.lineTo(windowWidth - 50, 50);
    ctx.lineTo(windowWidth * 0.9 - 50, 50);
    ctx.lineTo(windowWidth * 0.85 - 50, 50 + 0.05 * windowWidth);
    ctx.lineTo(windowWidth * 0.6 - 50, 50 + 0.05 * windowWidth);
    ctx.lineTo(windowWidth * 0.55 - 50, 50);
    ctx.lineTo(0.1 * windowWidth + 50, 50);
    ctx.closePath();
    ctx.stroke();
}

function updateWindowSize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
}

window.onload = () => {
    updateWindowSize();
    drawBackFrame();
}

window.onresize = () => {
    updateWindowSize();
    drawBackFrame();
}