const startPage = document.querySelector(".start-page");
const gamePage = document.querySelector(".game-page");
const nameInput = document.querySelector("#name");
const startBtn = document.querySelector(".start-btn");
const gamerName = document.querySelector(".gamer-name");

startBtn.addEventListener("click", () => {
  const playerName = nameInput.value.trim().toUpperCase();

  if(playerName === ""){
    alert("Please enter your name.");
    return;
  }

  gamerName.textContent = playerName;

  startPage.style.display = "none";
  gamePage.style.display = "flex";
});
