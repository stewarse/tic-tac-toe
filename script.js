const Player = (name, playerMarker) => {
    const _getPlayerMarker = () => playerMarker;

    const getName = () => name;
    
    const makeMove = (index) => {
        Gameboard.addMoveToGameboard(index, _getPlayerMarker())
    }

    const checkForWinner = () => {
        return Gameboard.checkWinConditions(_getPlayerMarker())
    }

    return { makeMove, checkForWinner, getName }
}

const player_0 = Player('Player One', 'X')
const player_1 = Player('Player Two', 'O')

const Gameboard = (() => {

    const gameboard = ['', '', '', '', '', '', '', '', ''];

    const winConditions = [[0, 1, 2], [3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8], [6, 4, 2]];

    // const _cacheDOM =() => {
    //     this.cell =  document.getElementById(`${i}-${j}`)
    // }

    const _render = () => {
        gameboard.forEach((el, index) => {
            const cell = document.getElementById(`${index}`)
            if (cell) {
                cell.textContent = el
            }
        })
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
            return gameboard[index] === "" ? true : false;
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



    return {addMoveToGameboard, isValidMove, checkWinConditions}

    //Reset gameboard
})();




const Game = (() => {
    let turnCount = 0

    const board = document.getElementById("board")
 //update DOM based on gameboard? (needs access to gameboard?)
 //player clicks on gameboard

    const _playerTurn = (e) => {
        let index = +e.target.id
        let currentPlayer = eval(`player_${turnCount % 2}`)

        if (Gameboard.isValidMove(e, index) && turnCount < 9){
            currentPlayer.makeMove(index)

            if (currentPlayer.checkForWinner()) {
                _announceWinner(currentPlayer)
                return turnCount = 9
            } else if (!currentPlayer.checkForWinner() && turnCount === 8) {
                _itsADraw()
            }
            turnCount += 1
        }
    }

    const _announceWinner = (currentPlayer) => {
        console.log(`Winner Winner, Chicken Dinner. ${currentPlayer.getName()} has won the game!`)
    }

    const _itsADraw = () => {
        console.log('Nobody wins, it\'s a Draw')
    }

    board.addEventListener("click", _playerTurn) //Needs to call makeMove on the appropriate player object

    return { }

})(Gameboard);
