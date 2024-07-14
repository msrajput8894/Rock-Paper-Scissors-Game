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

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

    isAutoPlaying = true;

    // to change button text to stop playing
    document.querySelector(".js-autoplay-button").innerHTML = "Stop Playing";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".js-autoplay-button").innerHTML = "Auto Play";
  }
}

// event listener for autoplay button
document.querySelector(".js-autoplay-button").addEventListener("click", () => {
  autoPlay();
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

// to play game using keyboard

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    resetScore();
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

  // this converts the score into string to store it in local storage.
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

// reset score function
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

// event listener for reset button to reset the score.
document.querySelector(".js-reset-button").addEventListener("click", () => {
  //resetScore();
  showResetConfirmation();
});

function showResetConfirmation() {
  document.querySelector(
    ".js-reset-confirmation"
  ).innerHTML = `Are you sure you want to reset the score
    
    <button class="js-reset-confirmation-yes js-confirmation-button reset-confirm-button">
      Yes
    </button>
    <button class="js-reset-confirmation-no js-confirmation-button reset-confirm-button">
      No
    </button>
    `;

  document
    .querySelector(".js-reset-confirmation-yes")
    .addEventListener("click", () => {
      resetScore();
      hideResetConfirmation();
    });

  document
    .querySelector(".js-reset-confirmation-no")
    .addEventListener("click", () => {
      hideResetConfirmation();
    });

  function hideResetConfirmation() {
    document.querySelector(".js-reset-confirmation").innerHTML = "";
  }
}
