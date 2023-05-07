/*===========================================================================*/
/* Menu                                                                    */
/*=======================================================================*/

function toggleMenu() {
    let menuButton = document.getElementById("menu-button");
    let navLinks = document.getElementById("nav-links");
    let menuFrame = document.getElementById("menu-frame");
    let overlay = document.getElementById("overlay");

    menuButton.classList.toggle("open");
    navLinks.classList.toggle("open");
    menuFrame.classList.toggle("open");
    overlay.classList.toggle("open");
}

createOverlay = () => {
    let overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);
}


/*===========================================================================*/
/* Main Frame                                                              */
/*=======================================================================*/

function drawBackFrame() {
    let windowHeight = getWindowHeight();
    let windowWidth = getWindowWidth();

    // Setting the width and height of the canvas to the width and height of the
    // window
    frame = document.getElementById("back-frame");
    frame.width = windowWidth;
    frame.height = windowHeight;
    
    // The offset is the distance between the edge of the frame and the edge of 
    // the canvas
    let offset = 25;

    // The trimming is the vertical and horizontal lengths of the edge 
    // trimming of the frame
    let trimming = 40;
    
    // The bridgeOffset is the horizontal length from the top right corner of
    // the frame to the start of the bridge
    let bridgeOffset = 0.15 * windowWidth + offset;

    // The bridgeLength is the horizontal length of the dip in the top of the
    // frame
    let bridgeLength = 0.3 * windowWidth;

    let ctx = frame.getContext("2d");
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.5;

    // Outlining the back frame through drawing lines
    ctx.moveTo(offset, offset + trimming);
    ctx.lineTo(offset, windowHeight - offset - trimming);
    ctx.lineTo(offset + trimming, windowHeight - offset);
    ctx.lineTo(windowWidth - offset - trimming, windowHeight - offset);
    ctx.lineTo(windowWidth - offset, windowHeight - offset - trimming);
    ctx.lineTo(windowWidth - offset, offset);
    ctx.lineTo(windowWidth - bridgeOffset, offset);
    ctx.lineTo(windowWidth - bridgeOffset - trimming, offset + trimming);
    ctx.lineTo(windowWidth - bridgeOffset - bridgeLength, offset + trimming);
    ctx.lineTo(windowWidth - bridgeOffset - bridgeLength - trimming, offset);
    ctx.lineTo(offset + trimming, offset);
    ctx.closePath();
    ctx.stroke();
}

/*===========================================================================*/
/* Menu Frame                                                              */
/*=======================================================================*/

function drawMenuFrame() {
    let windowHeight = getWindowHeight();
    let windowWidth = getWindowWidth();

    // Setting the width and height of the canvas to the width and height of the
    // window
    frame = document.getElementById("menu-frame");
    frame.width = windowWidth;
    frame.height = windowHeight;
    
    // The offset is the distance between the edge of the frame and the edge of 
    // the canvas
    let offset = 25;

    // The trimming is the vertical and horizontal lengths of the edge 
    // trimming of the frame
    let trimming = 40;
    
    // The bridgeOffset is the horizontal length from the top right corner of
    // the frame to the start of the bridge
    let bridgeOffset = 0.15 * windowWidth + offset;

    // The bridgeLength is the horizontal length of the dip in the top of the
    // frame
    let bridgeLength = 0.3 * windowWidth;

    let ctx = frame.getContext("2d");
    ctx.fillStyle = "#151515";

    // Outlining the back frame through drawing lines
    ctx.moveTo(windowWidth - bridgeOffset - bridgeLength, windowHeight - offset);
    ctx.lineTo(windowWidth - offset - trimming, windowHeight - offset);
    ctx.lineTo(windowWidth - offset, windowHeight - offset - trimming);
    ctx.lineTo(windowWidth - offset, offset);
    ctx.lineTo(windowWidth - bridgeOffset, offset);
    ctx.lineTo(windowWidth - bridgeOffset - trimming, offset + trimming);
    ctx.lineTo(windowWidth - bridgeOffset - bridgeLength, offset + trimming);
    ctx.closePath();
    ctx.fill();
}

/*===========================================================================*/
/* Decode Effect                                                           */
/*=======================================================================*/

function decode(target) {
    console.log("Decoding");

    if (target.classList.contains("in-progress")) {
        return;
    }

    target.classList.add("in-progress");

    let text = target.innerHTML;
    let maxCount = 3;
    let delay = 100;
    let speed = 1 / text.length;

    for (let i = 1; i <= text.length; i++) {
        for (let count = 1; count <= maxCount; count++) {
            const characterDelay = delay + 200 * speed * count;
            console.log(characterDelay, i, count);
            setTimeout(() => {
                let addedChar = randomChar();
                if (i == text.length) {
                    addedChar = "";
                    target.classList.remove("in-progress");
                }
                target.innerHTML = text.substring(0, i) + addedChar;
            }, characterDelay);
        }
        delay += 200 * speed * maxCount;
    }
}

function randomChar() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!.,?";
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

/*===========================================================================*/
/* General Functions                                                       */
/*=======================================================================*/

// Returns the width of the window
function getWindowWidth() {
    return window.innerWidth;
}

// Returns the height of the window
function getWindowHeight() {
    return window.innerHeight;
}

function stringDifference(string1, string2){ 
    let difference = "";

    string2.split('').forEach(function(value, i) {
        if (value != string1.charAt(i))
            difference += value;         
        }
    );
    return difference;
}


/*===========================================================================*/
/* Event Listeners                                                         */
/*=======================================================================*/

function handleOnHoverAnimations(event) {
    if (event.target.classList.contains("decode")) {
        decode(event.target);
    }
}

// Draws the back frame when the window loads and when the window is resized
window.onload = () => {
    drawBackFrame();
    drawMenuFrame();
    createOverlay();
}

window.onresize = () => {
    drawBackFrame();
    drawMenuFrame();
}

document.addEventListener("mouseover", handleOnHoverAnimations);