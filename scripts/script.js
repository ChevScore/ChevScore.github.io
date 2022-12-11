// ~~~~~~~~~~~~HAMBURGER ICON~~~~~~~~~~~~ //
var openedState = 0

function openMenu(element) {
    let menu = document.getElementById("hamburger")
    if (openedState == 0) {
        menu.classList.add("opened-burger")
        document.getElementById("hamburger-holder").style.right = "18rem"
        document.getElementById("links").style.right = "15rem"
        document.getElementById("header").style.marginRight = "15rem"
        document.getElementById("main").style.marginRight = "15rem"
        document.getElementById("footer").style.marginRight = "15rem"
        document.getElementById("side").style.width = "15rem"
        document.getElementById("nav").setAttribute("style", "right: 15rem;")
    } else {
        menu.classList.remove("opened-burger")
        document.getElementById("hamburger-holder").style.right = "3rem"
        document.getElementById("links").style.right = "0"
        document.getElementById("header").style.marginRight = "0"
        document.getElementById("main").style.marginRight = "0"
        document.getElementById("footer").style.marginRight = "0"
        document.getElementById("side").style.width = "0"
        document.getElementById("nav").setAttribute("style", "right: 0;")
    }
    openedState = 1 - openedState
}

function resizeWindow() {
    if (openedState == 1) {
        openMenu(document)
    }
}



window.onload = resizeWindow
window.onresize = resizeWindow


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

// ~~~~~~~~~~~~ SCROLL-DOWN TEXT ~~~~~~~~~~~~ //
var scrolldownText = document.createElement("h3")
scrolldownText.innerHTML = "SCROLL DOWN"
scrolldownText.className = "scroll-down-text"
greetingSection.append(scrolldownText)

// ~~~~~~~~~~~~ PORTFOLIO OBJECT LOAD ~~~~~~~~~~~~ //
var portfolioSection = document.getElementById("portfolio") 
let portfolioItemCollection = document.createElement("div")
portfolioItemCollection.className = "portfolio-item-section"
portfolioSection.append(portfolioItemCollection)

async function loadPortfolio(location) {
    let response = await fetch(location)
    let portfolioJSON = await response.json()

    portfolioJSON["items"].forEach(element => {
        createPortfolioItem(
            element["id"],
            element["image"],
            element["title"],
            element["content"]
        )
    });
}
loadPortfolio("/config/content.json")

function createPortfolioItem(id, imageURL, title, content) {
    let itemFrame = document.createElement("div")
    let itemImage = document.createElement("img")
    let itemTitle = document.createElement("h3")
    let itemContent = document.createElement("p")
    itemFrame.className = "item-frame"
    itemFrame.id = id
    itemImage.className = "item-image"
    itemTitle.className = "item-title"
    itemContent.className = "item-content"

    itemImage.setAttribute("src", imageURL)
    itemTitle.innerText = title
    itemContent.innerText = content

    itemFrame.append(itemImage)
    itemFrame.append(itemTitle)
    itemFrame.append(itemContent)

    portfolioItemCollection.append(itemFrame)
}

const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

function validateEmail(email) {
    let match = email.search(regex)
    return (match != -1)
}

function submitForm(form) {
    let name = document.getElementById("name")
    let email = document.getElementById("email")
    let subject = document.getElementById("subject")
    let message = document.getElementById("message")

    if (!validateEmail(email.value)) {
        if (email.classList.contains("invalid-email")) {
            email.className = "invalid-email2 field email"
        } else {
            email.className = "invalid-email field email"
        }
        return
    }
}