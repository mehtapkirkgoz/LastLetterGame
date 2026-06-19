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
const counterLetter = document.querySelector(".counter-letter");

const starterWords = ["PENCIL", "SCHOOL", "TABLE", "ORANGE", "PINK", "WINDOW", "DOOR", "PEN", "CRINGE", "GREEN", "GRAY", "AGE", "HUMAN", "PERSON", "TEACHER"];
const usedWords = [];

let score = 0;
let counter = 10;
let timerInterval;
let gameStarted = false;
const MAX_LETTER =45;

lastWord.style.display = "none";
wordInput.disabled = true;
scoreText.textContent = "Score: 0";


function changeClassLAstLetter(word){
    const lastLetter = word[word.length - 1];
    const wordWithoutLastLetter = word.slice(0, -1);

    lastWord.innerHTML = `${wordWithoutLastLetter}<span class="last-letter">${lastLetter}</span>`;
}

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
  updateCounterLetter();
  wordInput.disabled = true;

  playBtn.textContent = "PLAY";
}

function getRandomStarterWord(){
  const randomIndex = Math.floor(Math.random() * starterWords.length);
  return starterWords[randomIndex];
}

function controlWord(word){
    word = word.trim().replaceAll(" ", "");

    if(!/^[a-zA-Z]+$/.test(word)){
        alert("Please use English letters only.");
        wordInput.value = "";
        updateCounterLetter();
        return null;
    }

    return word.toUpperCase();
}

function startTimer(){
  clearInterval(timerInterval);

  counter = 10;
  timer.textContent = counter;

  timerInterval = setInterval(() => {
    counter--;
    timer.textContent = counter;

    if(counter === 0){
      clearInterval(timerInterval);
      alert(`You lost! Your Score is ${score}`);

      gamePage.style.display = "none";
      startPage.style.display = "flex";
      nameInput.value = "";

      resetGame();
    }
  }, 1000);
}

function isFirstLetter(userWord){
    const previousWord = lastWord.textContent.toUpperCase();
    const lastLetter = previousWord[previousWord.length - 1];
    const firstLetter = userWord[0];

    return firstLetter === lastLetter;
}

function checkUserWord(){
  const userWord = controlWord(wordInput.value);

  if(userWord === null){
    return;
  }

  if(userWord === ""){
    alert("Please enter a word.");
    startTimer();
    return;
    }

  if(!isFirstLetter(userWord)){
    alert("The word must start with the last letter of previous word");
    wordInput.value = "";
    updateCounterLetter();
    return;
    }

  if(usedWords.includes(userWord)){
    alert("This word already exists.");
    wordInput.value = "";
    updateCounterLetter();
    return;
    }

  usedWords.push(userWord);

  score += 5;
  scoreText.textContent = `Score: ${score}`;

  changeClassLAstLetter(userWord);
  wordInput.value = "";
  updateCounterLetter();

  startTimer();
}

function updateCounterLetter(){
    const remaining = MAX_LETTER - wordInput.value.length;
    counterLetter.textContent = remaining;
}

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

playBtn.addEventListener("click", () => {
  if(gameStarted === false){
    const randomWord = getRandomStarterWord();

    changeClassLAstLetter(randomWord);
    lastWord.style.display = "block";

    wordInput.disabled = false;
    wordInput.focus();

    playBtn.textContent = "NEXT";
    gameStarted = true;
    startTimer();
    return;
  }
  checkUserWord();
});

wordInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && gameStarted === true){
        checkUserWord();
    }
})

wordInput.addEventListener("input", updateCounterLetter);
