'use strict';

const checkBtn = document.querySelector('.check');
const number = document.querySelector('.number');
const message = document.querySelector('.message');
const scoreNumer = document.querySelector('.score');
const highScoreNum = document.querySelector('.highscore');
const againBtn = document.querySelector('.again');
const body = document.querySelector('body');
const guessInput = document.querySelector('.guess');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
const storeHighScore = localStorage.getItem('highScore');
let highScore = storeHighScore ? Number(storeHighScore) : 0 ;
highScoreNum.textContent = highScore;

const guessNumber = () => {
    const guess = Number(guessInput.value);

    // Where is no input
    if (!guess) message.textContent = '🚫 No number!';
    // Whene player is win
    else if (guess === secretNumber) {
        message.textContent = '🎉 Correct Number!';
        body.style.backgroundColor = '#60b347'
        number.style.width = "30rem";
        number.textContent = secretNumber;

        if (score > highScore) {
            highScore = score;
            highScoreNum.textContent = highScore;
            localStorage.setItem('highScore', highScore);
        }
    }
    // Whne guess is wrong
    else if (guess !== secretNumber) {
        if (score > 1) {
            message.textContent = guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
            score--;
            scoreNumer.textContent = score;
        } else {
            message.textContent = '💥 You lost the game!'
            scoreNumer.textContent = 0
        }
    }
}

checkBtn.addEventListener('click', guessNumber)

againBtn.addEventListener('click', () => {
    score = 20;
    scoreNumer.textContent = score;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    message.textContent = 'Start guessing...';
    number.textContent = '?';
    guessInput.value = '';
    number.style.width = "15rem";
    body.style.backgroundColor = '#222';
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && guessInput.value !== '') {
        guessNumber()
    }
})