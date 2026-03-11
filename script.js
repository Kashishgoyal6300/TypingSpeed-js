const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector(".content button");

// values
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIdx = 0;
let mistake = 0;
let isTyping = false;

// Load paragraph
function loadParagraph() {

const paragraph = [
"Technology is changing the way people live, work, and communicate. From smartphones to artificial intelligence, modern tools help solve problems faster and make everyday tasks easier.",

"Nature has always inspired human creativity. The sound of flowing rivers, the calmness of forests, and the vastness of the sky remind us how connected we are to the planet.",

"Learning something new every day keeps the mind active and curious. Reading books, practicing skills, and exploring ideas help us grow over time.",

"Cities are full of energy and movement. People rushing to work, vendors selling food, and lights glowing at night create a unique rhythm."
];

const randomIndex = Math.floor(Math.random() * paragraph.length);

typingText.innerHTML = "";

// create spans
for (const char of paragraph[randomIndex]) {
typingText.innerHTML += `<span>${char}</span>`;
}

typingText.querySelectorAll("span")[0].classList.add("active");

// focus input
document.addEventListener("keydown", () => input.focus());
typingText.addEventListener("click", () => input.focus());
}

// Handle typing
function initTyping() {

const characters = typingText.querySelectorAll("span");
const typedChar = input.value.charAt(charIdx);

// backspace support
if (typedChar == null) {
charIdx--;

if (charIdx >= 0) {
if (characters[charIdx].classList.contains("incorrect")) {
mistake--;
}

characters[charIdx].classList.remove("correct", "incorrect");
}

} else {

if (charIdx < characters.length && timeLeft > 0) {

if (!isTyping) {
timer = setInterval(initTimer, 1000);
isTyping = true;
}

if (characters[charIdx].innerText === typedChar) {
characters[charIdx].classList.add("correct");
} else {
mistake++;
characters[charIdx].classList.add("incorrect");
}

charIdx++;
}

}

// remove all active
characters.forEach(span => span.classList.remove("active"));

// set new active
if (charIdx < characters.length) {
characters[charIdx].classList.add("active");
}

mistakes.innerText = mistake;
cpm.innerText = charIdx - mistake;

// stop test
if (charIdx === characters.length || timeLeft === 0) {
clearInterval(timer);
input.value = "";
}
}

// Timer
function initTimer() {

if (timeLeft > 0) {

timeLeft--;
time.innerText = timeLeft;

let wpmVal = Math.round(((charIdx - mistake) / 5 / (maxTime - timeLeft)) * 60);

if (wpmVal < 0 || !wpmVal || wpmVal === Infinity) {
wpmVal = 0;
}

wpm.innerText = wpmVal;

} else {
clearInterval(timer);
}
}

// Reset test
function reset() {

clearInterval(timer);

timeLeft = maxTime;
charIdx = 0;
mistake = 0;
isTyping = false;

input.value = "";

time.innerText = timeLeft;
wpm.innerText = 0;
cpm.innerText = 0;
mistakes.innerText = 0;

loadParagraph();
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);

loadParagraph();