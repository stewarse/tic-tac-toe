const Player = (name = "Computer", playerMarker) => {
    const _getPlayerMarker = () => playerMarker;

    const getName = () => name;
    
    const makeMove = (index) => {
        Gameboard.addMoveToGameboard(index, _getPlayerMarker())
    }

    const makeComputerMove = () => {
        let availableMoves = Gameboard.availableComputerMoves()
        let randomNum = Math.floor(Math.random() * availableMoves.length)
        let compMoveIndex = availableMoves[randomNum]

        Gameboard.addMoveToGameboard(compMoveIndex,_getPlayerMarker())
    }

    const checkForWinner = () => {
        return Gameboard.checkWinConditions(_getPlayerMarker())
    }

    return { makeMove, checkForWinner, getName, makeComputerMove }
}

const Gameboard = (() => {

    const gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const winConditions = [[0, 1, 2], [3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8], [6, 4, 2]];

    const _render = () => {
        gameboard.forEach((el, index) => {
            const cell = document.getElementById(`${index}`)
            if (cell && (el === "X" || el === "O")) {
                cell.textContent = el
            } else {
                cell.textContent = ""
            }
        })
    }

    const availableComputerMoves = () => {
        return gameboard.filter( el => el !== "X" && el !== "O" )
    }

    const addMoveToGameboard = (index, playerMarker) => {
            //Add move to gameboard
            gameboard[index] = playerMarker
            //Render board
                _render()
    }

    const isValidMove = (e, index) => {
        //Verify that the click occurred on a valid cell
        if(_isBoardCellClicked(e)){
            //Verify that the gameboard at index is === ""
            //Return True or False
            return gameboard.indexOf(index) !== -1 ? true : false;
        }
        return false
    }

    const _isBoardCellClicked = (e) => {
        return e.target.nodeName === "TD" ? true : false;
    }

    const checkWinConditions = (playerMarker) => {
        let winner = false
        winConditions.forEach((el) => {
            if  (
                gameboard[el[0]] === playerMarker && 
                gameboard[el[1]] === playerMarker && 
                gameboard[el[2]] === playerMarker
                ) {
                return winner = true 
            } 
        })
        return winner
    }

    const resetGameboard = () => {
        //Reset Gameboard array
        // for (let i = 0; i < gameboard.length; i++){
        //     gameboard[i] = ""
        // }
        gameboard.forEach((el, index) => {
            gameboard[index] = index
        })
        console.log(gameboard)
        //Render Gameboard
        _render();
    }



    return {addMoveToGameboard, isValidMove, checkWinConditions, resetGameboard, availableComputerMoves}
})();




const Game = (() => {
    let turnCount = 0;
    let AI = false 
    let player_0;
    let player_1;

    const board = document.getElementById("board")
    const start = document.getElementById("start-btn")
    // const player1Label = document.getElementById("player-1-label")
    const player2Label = document.getElementById("player-2-label")
    const player1Name = document.getElementById("player-1-name")
    const player2Name = document.getElementById("player-2-name")
    const player1NameInput = document.getElementById("player-1-input")
    const player2NameInput = document.getElementById("player-2-input")
    const modal = document.getElementById("modal-background")
    const rematch = document.getElementById("rematch-btn")
    const winnerHeader = document.getElementById("winning-statement")
    const checkbox = document.getElementById("switch")

    // const _cacheDOM = () => {
    //     this.player1Label = document.getElementById("player-1-label")
    //     const player2Label = document.getElementById("player-2-label")
    // }

    const _playerTurn = (e) => {
        let index = +e.target.id
        let currentPlayer = eval(`player_${turnCount % 2}`)

        if (Gameboard.isValidMove(e, index) && turnCount < 9){
            if (AI === false){
                currentPlayer.makeMove(index)
            } else {
                player_0.makeMove(index)
                if(!_checkForWinner(player_0)) {
                    player_1.makeComputerMove()
                    _checkForWinner(player_1)
                    turnCount += 1
                }
            }
            turnCount += 1
            console.log(turnCount)
        }
    }

    const _checkForWinner = (currentPlayer) => {
        if (currentPlayer.checkForWinner()) {
            _announceWinner(currentPlayer.getName())
            _displayModal()
            return turnCount = 9
        } else if (!currentPlayer.checkForWinner() && turnCount === 8) {
            _itsADraw()
            _displayModal()
        }
    }

    const _announceWinner = (winningPlayer) => {
        winnerHeader.textContent = `${winningPlayer} has won the game!`
        console.log(`Winner Winner, Chicken Dinner. ${winningPlayer} has won the game!`)
    }

    const _itsADraw = () => {
        winnerHeader.textContent = 'Nobody wins, it\'s a draw!'
        console.log('Nobody wins, it\'s a Draw')
    }

    const _createPlayers = () => {
        player_0 = Player(player1NameInput.value, 'X')
        player_1 = Player(player2NameInput.value, 'O')
        _setPlayerNames()
        _disableAIToggle()
    }
    
    const _setPlayerNames = () => {
        player1Name.textContent = player_0.getName()
        player2Name.textContent = player_1.getName()
        _hidePlayerEntry()
        _displayPlayerNames()
    }

    const _disableAIToggle = () => {
        checkbox.setAttribute("disabled", "")
    }

    const _hidePlayerEntry= () => {
        player1NameInput.hidden = true
        player2NameInput.hidden = true
    }

    const _displayPlayerNames = () => {
        player1Name.hidden = false
        player2Name.hidden = false
    }

    const _setUpRematch = () => {
        _hideModal()
        Gameboard.resetGameboard()
        turnCount = 0;
    }

    const _hideModal = () => {
        modal.style.visibility = "hidden"
    }

    const _displayModal = () => {
        modal.style.visibility = "visible"
    }

    const _toggleAI = () => {
        if (checkbox.checked) {
            AI = true;
            _disablePlayer2();
        } else{
            AI = false;
            _enablePlayer2();
        }
        console.log(AI)
    }

    const _disablePlayer2 = () => {
        player2Label.style.color = "gray";
        player2NameInput.setAttribute("disabled", "")
        player2NameInput.value = "AI"
    }

    const _enablePlayer2 = () => {
        player2Label.style.color = "black";
        player2NameInput.removeAttribute("disabled")
        player2NameInput.value = ""
    }

    const _AIOpponent = () => {

    }

    board.addEventListener("click", _playerTurn) 
    start.addEventListener("click", _createPlayers)
    rematch.addEventListener("click", _setUpRematch)
    modal.addEventListener("click", _hideModal)
    checkbox.addEventListener("change", _toggleAI)

    return { }

})(Gameboard);


//[x] : Add Rematch Functionality to Modal
//[x] : Check for Winner
//[x] : Announce Winner
//[ ] : Functionality that hides / shows Player 2 values when AI toggled on / off
//[ ] : Computer AI functionality
//[ ] : Optional - Unbeatable AI


