const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
const victoryMessage = document.getElementById('victory-message');

// Game state
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Initialize game
function initializeGame() {
  gameBoard.innerHTML = '';
  victoryMessage.classList.add('hidden');
  matchedPairs = 0;

  const cards = [...cardValues, ...cardValues];
  const shuffledCards = shuffle(cards);

  shuffledCards.forEach((value) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.textContent = '?';

    card.addEventListener('click', () => handleCardClick(card));

    gameBoard.appendChild(card);
  });
}

function handleCardClick(card) {
  if (lockBoard || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.value;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched', 'disabled');
    secondCard.classList.add('matched', 'disabled');
    matchedPairs++;
    resetTurn();

    if (matchedPairs === cardValues.length) {
      displayVictory();
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '?';
      secondCard.textContent = '?';
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function displayVictory() {
  victoryMessage.classList.remove('hidden');
}

restartButton.addEventListener('click', initializeGame);

// Start the game on load
initializeGame();
