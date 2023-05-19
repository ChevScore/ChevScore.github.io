/*===========================================================================*/
/* Global variables & constant                                             */
/*=======================================================================*/
let portfolioItems = null;
let currentFocus = 0;


/*===========================================================================*/
/* Loading                                                                 */
/*=======================================================================*/

function mainLoading() {
    let main = document.getElementsByTagName("main")[0];
    decodeSection(main, 500, true);
}

/*===========================================================================*/
/* Menu                                                                    */
/*=======================================================================*/

function toggleMenu() {
    let menuButton = document.getElementById("menu-button");
    let navLinks = document.getElementById("nav-links");

    menuLoading();
    menuButton.classList.toggle("open");
    navLinks.classList.toggle("open");
    toggleMenuArtifacts();
}

function toggleMenuArtifacts() {
    let menuFrame = document.getElementById("menu-frame");
    let overlay = document.getElementById("overlay");

    $(menuFrame).fadeToggle(250);
    $(overlay).fadeToggle(250);
}

createOverlay = () => {
    let overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);
}

function menuLoading() {
    let menu = document.getElementsByTagName("menu")[0];
    menu.classList.toggle("show");
    if (menu.classList.contains("show")) {
        decodeSection(menu, 100);
    }
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
    let trimming = 0.05 * windowWidth;
    
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
    let trimming = 0.05 * windowWidth;    

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
    ctx.lineTo(windowWidth - bridgeOffset - bridgeLength + trimming, offset + trimming);
    ctx.lineTo(windowWidth - bridgeOffset - bridgeLength, offset + 2 * trimming);
    ctx.closePath();
    ctx.fill();
}

/*===========================================================================*/
/* Decode Effect                                                           */
/*=======================================================================*/

// Decode effect which alters the text of the target element
function decode(target) {

    // If the target element is already being decoded, then return
    if (target.classList.contains("decoded") 
            || target.classList.contains("in-progress")) {
        return;
    }

    // Add the in-progress class to the target element
    target.classList.add("in-progress");

    // Sets up decoding effect
    let text = target.innerHTML;
    target.innerHTML = text.substring(0, 1);
    let maxCount = 3;
    let delay = 50;
    let speed = 1 / (2 * text.length);

    // Decodes the text
    for (let i = 1; i <= text.length; i++) {
        for (let count = 1; count <= maxCount; count++) {
            // The character delay is the delay of each character's decoding
            const characterDelay = delay + 200 * speed * count;
            setTimeout(() => {
                let addedChar = randomChar();
                if (i == text.length) {
                    addedChar = "";
                }
                target.innerHTML = text.substring(0, i) + addedChar;
            }, characterDelay);
        }
        // The delay is the delay between each character being added to the
        // target element
        delay += 200 * speed * maxCount;
    }

    // Removes the in-progress class from the target element after the decoding
    setTimeout(() => {
        target.classList.remove("in-progress");
    }, delay + 200 * speed * maxCount * text.length);
}

// Returns a random character
function randomChar() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!.,?";
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

/*===========================================================================*/
/* About                                                                   */
/*=======================================================================*/

function setupAboutImageEffect() {
    let imageEffect = document.getElementById("image-effect");

    const maxCharacters = 1000;
    let characters = "";

    for (let i = 0; i < maxCharacters; i++) {
        characters += randomChar();
    }

    imageEffect.innerHTML = characters;
    setInterval(() => {
        cycleText(imageEffect);
    }, 100);
}

function cycleText(target) {
    let text = target.innerHTML;
    let length = text.length;
    let newText = text.substring(1, length) + text.substring(0, 1);
    target.innerHTML = newText;
}

// Radial Circular Slider

async function drawRadialSliders() {
    let statsData = await parseJSON("files\\assets\\json\\stats.json");
    let stats = document.getElementById("stats");

    stats.innerHTML = "";

    statsData["items"].forEach((element) => {
        let name = element.name;
        let percentage = element.percentage;

        let data = document.createElement("div");
        let dataName = document.createElement("h2");

        data.classList.add("data");

        dataName.innerHTML = name;
        
        data.appendChild(createRadialSlider(percentage));
        data.appendChild(dataName);

        data.title = name + ": " + Math.round(percentage * 100) + "%";
        stats.appendChild(data);
    });
}

function createRadialSlider(percentage) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    
    let windowWidth = getWindowWidth();
    let windowHeight = getWindowHeight();

    let width = 0.15 * windowWidth;
    let height = 0.15 * windowHeight;

    let thickness = Math.min(0.1 * width, 0.1 * height);
    let radius = Math.min(0.5 * width, 0.5 * height) - thickness;

    canvas.width = width;
    canvas.height = height;

    let x = 0.5 * width;
    let y = 0.5 * height;

    ctx.lineWidth = thickness + 10;
    ctx.strokeStyle = "#11111155";

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = thickness;
    ctx.strokeStyle = "#ccf";

    ctx.beginPath();
    ctx.arc(x, y, radius, 1.5 * Math.PI, 2 * Math.PI * percentage - 0.5 * Math.PI);
    ctx.stroke();

    return canvas;
}

// Toggle Buttons

function toggleButton(button) {
    if (!button.classList.contains("active")) {
        $("#bio-button").toggleClass("active");
        $("#stats-button").toggleClass("active");
        toggleView();
    }
}

function toggleView() {
    $("#bio").toggle();
    $("#stats").toggle();
}

/*===========================================================================*/
/* Portfolio                                                               */
/*=======================================================================*/

async function setupPortfolio() {
    let parsedPortfolioItems = await parseJSON("files\\assets\\json\\portfolio-items.json");
    portfolioItems = [];
    parsedPortfolioItems["items"].forEach(item => {
        portfolioItems.push(new PortfolioItem(item));
    });
}

async function displayPortfolio() {
    if (portfolioItems == null) {
        await setupPortfolio();
    }

    let portfolioList = document.getElementById("portfolio-list");

    let items = getPortfolioDisplayItems();

    for (let i = 0; i < items.length; i++) {
        button = createPortfolioButton(items[i]);
        portfolioList.appendChild(button);
    }
    recalibrateOnClickEvents();
    updateFocusItemDisplay();
}

function createPortfolioButton(item) {
    let button = document.createElement("button");
    button.classList.add("portfolio-item");
    button.classList.add("clear-default");
    let h2 = document.createElement("h2");
    h2.innerText = item.name;
    button.appendChild(h2);
    return button;
}

function getPortfolioDisplayItems() {
    let twoPreviousItem = portfolioItems[(portfolioItems.length - currentFocus - 2) % portfolioItems.length];
    let previousItem = portfolioItems[(portfolioItems.length - currentFocus - 1) % portfolioItems.length];
    let focusedItem = portfolioItems[currentFocus];
    let nextItem = portfolioItems[(currentFocus + 1) % portfolioItems.length];
    let twoNextItem = portfolioItems[(currentFocus + 2) % portfolioItems.length];

    return [twoPreviousItem, previousItem, focusedItem, nextItem, twoNextItem];
}

function cycleNext() {
    let portfolioList = document.getElementById("portfolio-list");

    currentFocus = (currentFocus + 1) % portfolioItems.length;
    let newNext = portfolioItems[(currentFocus + 2) % portfolioItems.length];

    let button = createPortfolioButton(newNext);
    let firstChild = portfolioList.firstChild;

    firstChild.remove();
    portfolioList.appendChild(button);
    recalibrateOnClickEvents();
    updateFocusItemDisplay();
    decode(portfolioList.children[2].firstChild);
}

function cyclePrevious() {
    let portfolioList = document.getElementById("portfolio-list");
    
    currentFocus = (portfolioItems.length + currentFocus - 1) % portfolioItems.length;
    let newPrevious = portfolioItems[(portfolioItems.length + currentFocus - 2) % portfolioItems.length];
    
    let button = createPortfolioButton(newPrevious);
    let lastChild = portfolioList.lastChild;

    lastChild.remove();
    portfolioList.insertBefore(button, portfolioList.firstChild);
    recalibrateOnClickEvents();
    updateFocusItemDisplay();
    decode(portfolioList.children[2].firstChild);
}

function recalibrateOnClickEvents() {
    let portfolioList = document.getElementById("portfolio-list");
    let portfolioItems = portfolioList.children;

    for (let i = 0; i < portfolioItems.length; i++) {
        portfolioItems[i].onclick = function() {
            if (i < 2) {
                cyclePrevious();
            } else if (i == 2) {
                openPortfolioItem();
            } else if (i >= 3) {
                cycleNext();
            }
        }
    }
}

function updateFocusItemDisplay() {
    let backgroundImageHolder = document.getElementById("background-image-holder");

    console.log(portfolioItems[currentFocus].displayImage);

    let image = document.createElement("img");
    image.classList.add("portfolio-display-image");
    image.src = portfolioItems[currentFocus].displayImage;
    image.alt = portfolioItems[currentFocus].displayImageAlt;

    image.onload = function() {
        backgroundImageHolder.innerHTML = "";
        backgroundImageHolder.appendChild(image);
        setTimeout( () => {
            image.style.opacity = "1";
        }, 150);
    }
}

class PortfolioItem {
    constructor(item) {
        this.name = item["name"];
        this.displayImage = item["display-image"];
        this.displayImageAlt = item["display-image-alt"];
        this.bannerImage = item["banner-image"];
        this.bannerImageAlt = item["banner-image-alt"];
        this.description = item["description"];
    }
}

// Pop-up

function openPortfolioItem() {
    let portfolioItem = portfolioItems[currentFocus];

    let popUp = document.getElementById("portfolio-item-display");
    let banner = document.getElementById("banner");
    let name = document.getElementById("name");
    let description = document.getElementById("description");
    
    let image = document.createElement("img");
    image.src = portfolioItem.bannerImage;
    image.alt = portfolioItem.bannerImageAlt;

    banner.innerHTML = "";
    banner.appendChild(image);

    name.innerText = portfolioItem.name;
    description.innerHTML = portfolioItem.description;

    $(popUp).fadeIn(500);
}

function closePortfolioItem() {
    console.log("close");
    let popUp = document.getElementById("portfolio-item-display");
    $(popUp).fadeOut(500);
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

async function parseJSON(location) {
    let response = await fetch(location);
    let data = await response.json();

    return data;
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

function decodeSection(section, delay, stop = false) {
    let decodingElements = Array.from(section.getElementsByClassName("decode"));

    decodingElements.forEach(element => {
        element.classList.add("hidden");
    });

    for (let i = 0; i < decodingElements.length; i++) {
        let element = decodingElements[i];
        setTimeout(() => {
            element.classList.remove("hidden");
            decode(element);
            if (stop) {
                element.classList.add("decoded");
            }
        }, delay * i);
    }
}

/*===========================================================================*/
/* Event Listeners                                                         */
/*=======================================================================*/

function handleOnHoverAnimations(event) {
    if (event.target.classList.contains("decode")) {
        decode(event.target);
    }
}

let page;

// Draws the back frame when the window loads and when the window is resized
window.onload = async () => {
    page = document.body.classList[0];
    switch (page) {
        case "home":
            mainLoading();
            break;
        case "about":
            setupAboutImageEffect();
            await drawRadialSliders();
            break;
        case "portfolio":
            await displayPortfolio();
            break;
    }
    drawBackFrame();
    drawMenuFrame();
    createOverlay();
}

window.onresize = () => {
    switch (page) {
        case "about":
            drawRadialSliders();
            break;
    }
    drawBackFrame();
    drawMenuFrame();
}

document.addEventListener("mouseover", handleOnHoverAnimations);

switch (document.body.classList[0]) {
    case "portfolio":
        document.onkeydown = function(event) {
            console.log(event.key);
            switch (event.key) {
                case "ArrowUp":
                    cyclePrevious();
                    break;
                case "ArrowDown":
                    cycleNext();
                    break;
            }
        }
        break;
}

