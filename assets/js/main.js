//selectedMoves
let divSelectMoves = document.getElementById("divSelectMoves")
let spanSelectedMoves = document.getElementById("spanSelectedMoves")
let divTheGame = document.getElementById("theGame")

function selectedNumber(index){
    spanSelectedMoves.innerHTML = index.value
    divSelectMoves.classList.add("d-none")
    divTheGame.classList.remove("d-none")
}


// Game
let moves = document.getElementById("moves")
let movesInt = 0;
let playerScore = 0;
let computerScore = 0;
let gameResult = '';

const playerChoice = document.querySelector(".playerChoice")
const computerChoice = document.querySelector(".computerChoice")
const imgPlayerChoice = document.createElement("img")
const imgComputerChoice = document.createElement("img")
const p_result = document.createElement('small');
const c_result = document.createElement('small');
imgPlayerChoice.classList.add("w-100")
imgComputerChoice.classList.add("w-100")
const list = ['fw-bold', 'fs-3'];
p_result.classList.add(...list);
c_result.classList.add(...list);

const rockBtn = document.querySelector('.rock');
const paperBtn = document.querySelector('.paper');
const scissorBtn = document.querySelector('.scissors');
const playerOptions = [rockBtn,paperBtn,scissorBtn];
const computerOptions = ['rock','paper','scissors']

const playerScoreBoard = document.querySelector('.playerScore');
const computerScoreBoard = document.querySelector('.computerScore');

// Function to start game
playerOptions.forEach(option => {
    option.addEventListener('click',function(){

        //PlayerChoice
        imgPlayerChoice.src = `../img/${option.value}.png`
        playerChoice.appendChild(imgPlayerChoice)
        
        //Moves
        movesInt++;
        moves.innerText = `${movesInt}`;

        //ComputerChoice
        const choiceNumber = Math.floor(Math.random()*3);
        imgComputerChoice.src = `../img/${computerOptions[choiceNumber]}.png`
        computerChoice.appendChild(imgComputerChoice)

        // Function to check who wins
        winner(option.value,computerOptions[choiceNumber])

        // Calling gameOver function after selected moves
        if(moves.innerText == spanSelectedMoves.innerText){
            option.classList.add = "disabled"
            gameOver();
        }
    })
})


// Function to decide winner
const winner = (player,computer) => {
    player = player.toLowerCase();
    computer = computer.toLowerCase();
    computerScoreBoard.textContent = computerScore;
    playerScoreBoard.textContent = playerScore;

    if(player == computer){
        playerLoseWon('Tie');
    }
    else if(player == 'rock'){
        if(computer == 'paper'){
            playerLoseWon('Lose');
            computerScore++;
            computerScoreBoard.textContent = computerScore;

        }else{
            playerLoseWon('Won');
            playerScore++;
            playerScoreBoard.textContent = playerScore;
        }
    }
    else if(player == 'scissors'){
        if(computer == 'rock'){
            playerLoseWon('Lose');
            computerScore++;
            computerScoreBoard.textContent = computerScore;
        }else{
            playerLoseWon('Won');
            playerScore++;
            playerScoreBoard.textContent = playerScore;
        }
    }
    else if(player == 'paper'){
        if(computer == 'scissors'){
            playerLoseWon('Lose');
            computerScore++;
            computerScoreBoard.textContent = computerScore;
        }else{
            playerLoseWon('Won');
            playerScore++;
            playerScoreBoard.textContent = playerScore;
        }
    }
}

//Function to show result
const playerLoseWon = (result) =>{

    resultsDeleteClasslist()
    if (result == 'Lose') {
        c_result.textContent = 'Won';
        p_result.textContent = 'Lose';

        p_result.classList.add('text-danger')
        c_result.classList.add('text-success')
    }else if(result == 'Won'){
        c_result.textContent = 'Lose';
        p_result.textContent = 'Won';

        c_result.classList.add('text-danger')
        p_result.classList.add('text-success')
    }else{
        p_result.textContent = 'Tie'
        c_result.textContent = 'Tie'

        p_result.classList.add('text-warning')
        c_result.classList.add('text-warning')
    }

    playerChoice.appendChild(p_result)
    computerChoice.appendChild(c_result)
}

function resultsDeleteClasslist(){
    const delList = ['text-warning', 'text-success', 'text-danger'];
    p_result.classList.remove(...delList);
    c_result.classList.remove(...delList);
}
// Function to run when game is over
function gameOver() {
    if(playerScore > computerScore){
        gameResult = 'Won'
    }
    else if(playerScore < computerScore){
        gameResult = 'Lose';
    }
    else{
        gameResult = 'Tie';
    }

    setTimeout(() => openModal(gameResult), 500)
    
}

//Modal
function openModal(gameResult) {
    document.getElementById("backdrop").style.display = "block"
    document.getElementById("myModal").style.display = "block"
    document.getElementById("myModal").classList.add("show")
    let r_img = document.createElement('img')
    let r_text = document.querySelector('.gameResultText')
    let div_rImg = document.querySelector('.gameResultImg')

    if (gameResult == 'Won') {
        r_img.src = '../img/win.gif'
    }else if(gameResult == 'Lose'){
        r_img.src = '../img/lose.gif'
    }else{
        r_img.src = '../img/again.gif'
    }

    div_rImg.appendChild(r_img)
    r_text.innerHTML = `Player: ${playerScore} - Computer: ${computerScore}`
}
function closeModal() {
        
    document.getElementById("backdrop").style.display = "none"
    document.getElementById("myModal").style.display = "none"
    document.getElementById("myModal").classList.remove("show")
    window.location.reload();
}