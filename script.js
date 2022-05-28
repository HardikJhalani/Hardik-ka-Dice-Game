'use strict';

// *** Selecting elements ***

const diceEl = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const start = document.querySelector('.start');
const overlay = document.querySelector('.overlay');
const guide = document.querySelector('.guide');
const rules = document.querySelector('.rules');
let player1InputName = document.querySelector('#player1');
let player2InputName = document.querySelector('#player2');
let player1Name = document.querySelector('#name--0');
let player2Name = document.querySelector('#name--1');
const saveNames = document.querySelector('.save');

// *** Starting conditions ***

diceEl.classList.add('hidden');

// *** creating object for player #1 ***

const player0 = {
    section: document.querySelector('.player--0'),
    score0El: document.querySelector('#score--0'),
    score0: Number(document.querySelector('#score--0').textContent),
    current0El: document.querySelector('#current--0'),
    current0: Number(document.querySelector('#current--0').textContent),
}

// *** creating object for player #2 ***

const player1 = {
    section: document.querySelector('.player--1'),
    score1El: document.querySelector('#score--1'),
    score1: Number(document.querySelector('#score--1').textContent),
    current1El: document.querySelector('#current--1'),
    current1: Number(document.querySelector('#current--1').textContent),
}

player0.score0El.textContent = 0;
player1.score1El.textContent = 0;

buttonRoll.addEventListener('click', function () {
    {
        // *** generating a random dice roll ***

        const dice = Math.trunc(Math.random() * 6) + 1;

        // *** display the dice ***

        diceEl.classList.remove('hidden');
        diceEl.src = `./images/dice-${dice}.png`;

        // *** check the rolled 1: if true: switch to next player

        if (dice !== 1) {
            // **** add dice to the current score ****
            if (player0.section.classList.contains('player--active')) {
                player0.current0 += dice;
                player0.current0El.textContent = player0.current0;
            } else {
                player1.current1 += dice;
                player1.current1El.textContent = player1.current1;
            }
        } else {
            if (player0.section.classList.contains('player--active')) {
                player0.section.classList.remove('player--active');
                player0.current0El.textContent = 0;
                player0.current0 = 0;
                player1.section.classList.add('player--active');
            } else {
                player0.section.classList.add('player--active');
                player1.current1El.textContent = 0;
                player1.current1 = 0;
                player1.section.classList.remove('player--active');
            }
        }
    }
})


buttonHold.addEventListener('click', function () {
    if (player0.section.classList.contains('player--active')) {
        player0.score0 += player0.current0;
        player0.current0 = 0;
        if (player0.score0 >= 100) {
            player0.section.classList.add('player--winner');
            diceEl.classList.add('hidden');
            buttonRoll.classList.add('hidden');
            buttonHold.classList.add('hidden');
            buttonNew.textContent = '🆕 Play a New Game';
        }
        player0.score0El.textContent = player0.current0 + player0.score0;
        player0.current0El.textContent = 0;
        player0.section.classList.remove('player--active');
        player1.section.classList.add('player--active');
    } else {
        player1.score1 += player1.current1;
        player1.current1 = 0;
        if (player1.score1 >= 100) {
            player1.section.classList.add('player--winner');
            diceEl.classList.add('hidden');
            buttonRoll.classList.add('hidden');
            buttonHold.classList.add('hidden');
            buttonNew.textContent = '🆕 Play a New Game';
        }
        player1.score1El.textContent = player1.current1 + player1.score1;
        player1.current1El.textContent = 0;
        player1.section.classList.remove('player--active');
        player0.section.classList.add('player--active');
    }
})

start.addEventListener('click', function () {
    overlay.classList.add('hidden');
    guide.classList.add('hidden');
})

rules.addEventListener('click', function () {
    overlay.classList.remove('hidden');
    guide.classList.remove('hidden');
    start.textContent = '🎲Continue'
})

saveNames.addEventListener('click', function () {
    if (player1InputName.value.length !== 0 && player2InputName.value.length !== 0) {
        player1Name.textContent = player1InputName.value;
        player2Name.textContent = player2InputName.value;
        player1InputName.value = "";
        player2InputName.value = "";
    }
})

const reset = function () {
    player0.current0El.textContent = 0;
    player0.current0 = 0;
    player1.current1 = 0;
    player1.current1El.textContent = 0;
    player0.score0 = 0;
    player0.score0El.textContent = 0;
    player1.score1 = 0;
    player1.score1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0.section.classList.add('player--active');
    player1.section.classList.remove('player--active');
    player0.section.classList.remove('player--winner');
    player1.section.classList.remove('player--winner');
    buttonNew.textContent = '🔄 New game';
    buttonRoll.classList.remove('hidden');
    buttonHold.classList.remove('hidden');
    player1Name.textContent = "player 1";
    player2Name.textContent = "player 2";
    player1InputName.value = "";
    player2InputName.value = "";
}

buttonNew.addEventListener('click', reset)