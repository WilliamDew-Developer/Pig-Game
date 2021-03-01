'use strict';

// reference variables for HTML elements
const player1Section = document.querySelector('.player--0');
const player2Section = document.querySelector('.player--1');
const player1TotalScore = document.querySelector('#score--0');
const player2TotalScore = document.querySelector('#score--1');
const player1CurrentScore = document.querySelector('#current--0');
const player2CurrentScore = document.querySelector('#current--1');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

// variables for keeping up with the scores
let currentScore, scores, activePlayer, playing;

// function to set (or reset) the starting conditions of the game
function init() {
  // starting conditions
  player1TotalScore.textContent = 0;
  player2TotalScore.textContent = 0;
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;

  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0; // 0 for player 1, 1 for player 2
  playing = true; // state variable for whether or not the game is over

  // hide the dice
  dice.classList.add('hidden');

  // reset the style for player 1 to be the active player
  player2Section.classList.remove('player--active');
  player1Section.classList.add('player--active');

  // remove the player--winner class from both player sections
  player1Section.classList.remove('player--winner');
  player2Section.classList.remove('player--winner');
}

// set the starting values for the game
init();

// event handlers for each button
btnRollDice.addEventListener('click', function () {
  if (playing) {
    // generate random number between 1 and 6
    const roll = Math.trunc(Math.random() * 6) + 1;

    // display dice roll
    dice.classList.remove('hidden');
    dice.src = `dice-${roll}.png`;

    if (roll !== 1) {
      currentScore += roll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      dice.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // change style for the winning player
      // disable the roll and hold buttons
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', init);

// function for switching players
function switchPlayer() {
  // switch the "player--active" class between the players
  activePlayer === 0 ? activePlayer++ : activePlayer--;
  player1Section.classList.toggle('player--active');
  player2Section.classList.toggle('player--active');
}
