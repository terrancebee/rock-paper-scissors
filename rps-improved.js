const playerScore = document.querySelector(".js-player").querySelector(".js-number");
const cpuScore = document.querySelector(".js-cpu").querySelector(".js-number");
const buttons = document.querySelector(".js-buttons");
const winner = document.querySelector(".js-winner");
const resetButton = document.querySelector(".js-reset");

function game(totalWins) {
    let playerWins = 0;
    let computerWins = 0;
    
    // reset
    playerScore.textContent = 0;
    cpuScore.textContent = 0;
    winner.classList.remove("win");
    winner.classList.remove("lose");
    winner.textContent = '';
    
    function testWord(word) {
        return function (str) {
            const regex = new RegExp("^\\s\*" + word + "\\s\*$", "gi");
            return regex.test(str);
        }
    }

    function computerPlay() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomNum = Math.floor(Math.random()*3);

        return choices[randomNum];
    }

    function addWin(wins, target) {
        wins++;
        target.textContent = wins;
        return wins;
    }

    const testRock = testWord("rock");
    const testPaper = testWord("paper");
    const testScissors = testWord("scissors");

    function playRound(playerSelection, computerSelection) {

        if (testWord(computerSelection)(playerSelection)) return 'draw';

        if (testRock(playerSelection)) {
            if (testPaper(computerSelection)) {
                computerWins = addWin(computerWins, cpuScore);
                return 'You lose! Paper beats rock.';
            }
            if (testScissors(computerSelection)) {
                playerWins = addWin(playerWins, playerScore);
                return 'You win! Rock beats scissors';
            }
        }
        
        if (testPaper(playerSelection)) {
            if (testScissors(computerSelection)) {
                computerWins = addWin(computerWins, cpuScore);
                return 'You lose! Scissors beat paper.';
            }
            if (testRock(computerSelection)) {
                playerWins = addWin(playerWins, playerScore);
                return 'You win! Paper beats rock.';
            }
        }

        if (testScissors(playerSelection)) {
            if (testRock(computerSelection)) {
                computerWins = addWin(computerWins, cpuScore);
                return 'You lose! Rock beats scissors.';
            }
            if (testPaper(computerSelection)) {
                playerWins = addWin(playerWins, playerScore);
                return 'You win! Scissors beat paper.';
            }
        }

        return playRound(playerSelection, computerSelection);
    }

    buttons.addEventListener("click", function buttonHandler(evt) {
        if (evt.target.classList.contains("js-button")) {
            const playerSelection = evt.target.id;
            const computerSelection = computerPlay();
            playRound(playerSelection, computerSelection);

            if (playerWins >= totalWins) {
                winner.classList.add("win");
                winner.textContent = "You win the game!";
                buttons.removeEventListener("click", buttonHandler);
            }
            else if (computerWins >= totalWins) {
                winner.classList.add("lose");
                winner.textContent = "You lose the game, good try though";
                buttons.removeEventListener("click", buttonHandler);
            }
        }
    });

}

game(5);

resetButton.addEventListener("click", function (evt) {
    game(5);
});
