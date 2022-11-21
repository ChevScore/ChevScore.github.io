// ~~~~~~~~~~~~SET-UP GREETING~~~~~~~~~~~~ //
var greeting = "Hi!<br>I am Muhammad"
var greetingSection = document.getElementById("greeting")
var greetingHeading = document.createElement("h1")
greetingHeading.className = "greeting-text"
greetingSection.append(greetingHeading)
var greetingStep = 0

const GREETING_LENGTH = greeting.length
const CURSOR = "<span class=\"cursor\">|<span>"
const CURSOR_SPEED = 500
const WRITING_SPEED = 150
const DELETION_SPEED = 100

var intervalID = setInterval(blinkCursor, CURSOR_SPEED)

function blinkCursor() {
    if (greetingStep > 3) {
        greetingStep = 0
        clearInterval(intervalID)
        intervalID = setInterval(writeGreeting, WRITING_SPEED)
        return
    } else if (greetingStep % 2 == 0) {
        greetingHeading.innerHTML = CURSOR
    } else {
        greetingHeading.innerHTML = "" 
    }
    greetingStep += 1
}

function writeGreeting() {
    if (greetingStep > GREETING_LENGTH) {
        clearInterval(intervalID)
        intervalID = setInterval(updateGreetingCursorEnd, CURSOR_SPEED)
        return
    }
    if (greeting.charAt(greetingStep) == "<") {
        greetingStep += 3
    }
    greetingHeading.innerHTML = greeting.slice(0, greetingStep) + CURSOR
    
    greetingStep += 1
}

function updateGreetingCursorEnd() {
    if (greetingStep > 30) {
        greetingStep = GREETING_LENGTH
        clearInterval(intervalID)
        intervalID = setInterval(clearGreeting, DELETION_SPEED)
        return
    } else if (greetingStep % 2 == 0) {
        greetingHeading.innerHTML = greeting + CURSOR
    } else {
        greetingHeading.innerHTML = greeting 
    }
    greetingStep += 1
}

function clearGreeting() {
    if (greetingStep < 0) {
        clearInterval(intervalID)
        intervalID = setInterval(blinkCursor, CURSOR_SPEED)
        return
    }
    if (greeting.charAt(greetingStep) == ">") {
        greetingStep -= 3
    }
    greetingHeading.innerHTML = greeting.slice(0, greetingStep) + CURSOR
    greetingStep -= 1
}

// ~~~~~~~~~~~~HOVER-LOGO EFFECT~~~~~~~~~~~~ //
function hoverLogo(element) {
    element.setAttribute("src", "/assets/logo-hover.png")
}

function unhoverLogo(element) {
    element.setAttribute("src", "/assets/logo.png")
}

// ~~~~~~~~~~~~ SCROLL-DOWN TEXT ~~~~~~~~~~~~ //
var scrolldownText = document.createElement("h3")
scrolldownText.innerHTML = "⮮ SCROLL DOWN ⮯"
scrolldownText.className = "scroll-down-text"
greetingSection.append(scrolldownText)