const Score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoplay() {
    if (isAutoPlaying) {
        clearInterval(intervalId);
        isAutoPlaying = false;
        return;
    }
    intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('Scissors');
});

document.querySelector('.js-reset-btn').addEventListener('click', () => {
    Score.wins = 0;
    Score.losses = 0;
    Score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
});

document.querySelector('.js-autoplay-button').addEventListener('click', () => {
    autoplay();
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'You lose.';
        } else if (computerMove === 'Paper') {
            result = 'You win.';
        } else {
            result = 'Tie.';
        }
    }
    else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'You win.';
        } else if (computerMove === 'Paper') {
            result = 'Tie.';
        } else {
            result = 'You Lose.';
        }
    }
    else if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'Tie.';
        } else if (computerMove === 'Paper') {
            result = 'You lose.';
        } else {
            result = 'You win.';
        }
    }

    if (result === 'You win.') {
        Score.wins += 1;
    } else if (result === 'You lose.') {
        Score.losses += 1;
    } else {
        Score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(Score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You
            <img src="images/${playerMove.toLowerCase()}-emoji.png" class="move-img" alt="${playerMove}"> vs
            <img src="images/${computerMove.toLowerCase()}-emoji.png" class="move-img" alt="${computerMove}"> Computer`;

}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${Score.wins}, Losses: ${Score.losses}, Ties: ${Score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber < 0.34) {
        computerMove = 'Rock';
    } else if (randomNumber <= 0.67) {
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissors';
    }

    return computerMove;
}