function game() {
    const totalRounds = 5;
    let round = 1;
    let playerWins = 0;
    let computerWins = 0;

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

    const testRock = testWord("rock");
    const testPaper = testWord("paper");
    const testScissors = testWord("scissors");

    function playRound(playerSelection, computerSelection) {

        if (testWord(computerSelection)(playerSelection)) return 'draw';

        if (testRock(playerSelection)) {
            if (testPaper(computerSelection)) {
                computerWins++;
                return 'You lose! Paper beats rock.';
            }
            if (testScissors(computerSelection)) {
                playerWins++;
                return 'You win! Rock beats scissors';
            }
        }
        
        if (testPaper(playerSelection)) {
            if (testScissors(computerSelection)) {
                computerWins++;
                return 'You lose! Scissors beat paper.';
            }
            if (testRock(computerSelection)) {
                playerWins++;
                return 'You win! Paper beats rock.';
            }
        }

        if (testScissors(playerSelection)) {
            if (testRock(computerSelection)) {
                computerWins++;
                return 'You lose! Rock beats scissors.';
            }
            if (testPaper(computerSelection)) {
                playerWins++;
                return 'You win! Scissors beat paper.';
            }
        }

        playerSelection = prompt("Oops! You didn't choose rock, paper or scissors! Try again");
        return playRound(playerSelection, computerSelection);
    }

    while(round <= totalRounds) {
        const playerSelection = prompt('Rock, paper or scissors?');
        const computerSelection = computerPlay();
        console.log(playRound(playerSelection, computerSelection));
        round++;
    }

    if (playerWins > computerWins) console.log('You win the game!')
    else if (playerWins < computerWins) console.log('You lose the game, good try though')
    else console.log('It is a draw! Wow!')
}

game();
