/*

Author: Olti Asllanaj
Date: 08/30/2017
Name: PIG GAME


                                GAME RULES

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result     get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's     the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to   his GLBAL score. 
  After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



//variable declaration
var score, roundScores, activePlayer, gamePlaying;

//function call
newInit();

//function call
choosePlayer();


//document.querySelector('.btn-hold').addEventListener('onclick',btn)
document.querySelector('.btn-roll').addEventListener("click", function() {

    if (gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;


        //2. Display the result
        //Change the png photo
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {

            //add score
            roundScore += dice;
            //we add the value for player 1
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else { //next Player
            //we make the score 0
            roundScore = 0;

            // calling the function
            nextPlayer();
        }
    }

});

//Event to click the hold button
document.querySelector('.btn-hold').addEventListener("click", function() {
    
    if (gamePlaying) {
        //Add current score to clobal score
        //Add the score to the array we created. score[0] for Player 1
        // and score[1] for player 2
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


        //Check if player won the game
        if (scores[activePlayer] >= 10) {

            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {

            //next player
            nextPlayer();

        }
    }

});


//function declaration
function nextPlayer() {
    
    if (activePlayer === 0) {
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        activePlayer = 1
        choosePlayer();

    } else {

        roundScore = 0;
        document.getElementById('current-1').textContent = '0';
        activePlayer = 0
        choosePlayer();

    }

    // if player 1 hits 1 than hide the dice so the player 2 starts fresh
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', newInit);

//function declaration
function newInit() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //We can use the querySelector to change the CSS
    document.querySelector('.dice').style.display = 'none';


    //turn all the values to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.remove('active');

    //Enter 0 or 1 to choose the player that you want to start
    activePlayer = prompt("With which player do you want to start?");
    choosePlayer();

}

//function declaration
function choosePlayer() {

    // if you enter different from 1 or 0 an alert will raise
    if (activePlayer != 0 && activePlayer != 1) {

        while (activePlayer != 0 && activePlayer != 1)

        {
            alert("ALERT: ENTER ONLY 0 OR 1!!!!");
            activePlayer = prompt("With which player do you want to start?");

        }

    }

    if (activePlayer != 0) {
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        document.querySelector('.player-0-panel').classList.remove('active');

    } else if (activePlayer != 1) {
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');

    }

}