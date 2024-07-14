//score object
// const score ={
//   wins:0,
//   losses:0,
//   ties:0
// };
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

/*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0,
    };
  }
*/

let isAutoPlaying = false;
let intervalId;

document.querySelector(".js-autoplay-button").addEventListener("click", () => {
  autoPlay();
});

function autoPlay() {
  const buttonElement = document.querySelector(".js-autoplay-button");
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    buttonElement.innerHTML = "Stop Playing";
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    buttonElement.innerHTML = "Auto Play";
  }
}

// to autoplay using key

document.body.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    autoPlay();
  }
});

// eventlister for rock button
document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("Rock");
});

// event listener for paper button
document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("Paper");
});

// event listener for scissors button
document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("Scissors");
});

// to play game using keys 'r' -> rock, 'p'-> paper and 's' -> scissors

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key) {
    playGame("Scissors");
  }
});

//Play game function
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  //when player picks scissors
  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You Lose";
    } else if (computerMove === "Paper") {
      result = "You Win!";
    } else {
      result = "Tied";
    }
  }

  //when player picks rock
  else if (playerMove === "Rock") {
    if (computerMove === "Paper") {
      result = "You Lose";
    } else if (computerMove === "Scissors") {
      result = "You Win!";
    } else {
      result = "Tied";
    }
  }

  //when player picks paper
  else if (playerMove === "Paper") {
    if (computerMove === "Scissors") {
      result = "You Lose";
    } else if (computerMove === "Rock") {
      result = "You Win!";
    } else {
      result = "Tied";
    }
  }

  //uupdates score in score object
  if (result === "You Win!") {
    score.wins += 1;
  } else if (result === "You Lose") {
    score.losses += 1;
  } else if (result === "Tied") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  // to update the score on the webpage
  updateScoreElement();

  // to update the result on the webpage
  document.querySelector(".js-results").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = ` You
      <img class="moves-icon" src="icons/${playerMove}-emoji.png" alt="emoji" />
      <img class="moves-icon" src="icons/${computerMove}-emoji.png" alt="emoji" />
      Computer`;
}

//function to update the score on webpage
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

//function to pick computer move
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissors";
  }

  return computerMove;
}
