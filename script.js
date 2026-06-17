const startPage = document.querySelector(".start-page");
const gamePage = document.querySelector(".game-page");
const nameInput = document.querySelector("#name");
const startBtn = document.querySelector(".start-btn");
const gamerName = document.querySelector(".gamer-name");
const timer = document.querySelector("#timer");
const lastWord = document.querySelector(".last-word");
const wordInput = document.querySelector("#word");
const scoreText = document.querySelector(".skor");
const playBtn = document.querySelector(".play-btn");

const starterWords = ["pencil", "school", "table", "orange", "pink", "window", "door", "pen", "cringe", "green", "gray", "age", "human", "person", "teacher"];
const usedWords = [];

let score = 0;
let counter = 10;
let timerInterval;
let gameStarted = false;

lastWord.style.display = "none";
wordInput.disabled = true;
score.textContent = "Score: 0";

startBtn.addEventListener("click", () => {
  const playerName = nameInput.value.trim().toUpperCase();

  if(playerName === ""){
    alert("Please enter your name.");
    return;
  }

  gamerName.textContent = playerName;

  startPage.style.display = "none";
  gamePage.style.display = "flex";

  resetGame();
});

function resetGame(){
  score = 0;
  counter = 10;
  gameStarted = false;

  usedWords.length = 0;

  timer.textContent = "10";
  scoreText.textContent = "Score: 0";

  lastWord.textContent = "";
  lastWord.style.display = "none";

  wordInput.value = "";
  wordInput.disabled = true;

  playBtn.textContent = "PLAY";
}
