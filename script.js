const Player = (name, playerMarker) => {
    const getPlayerMarker = () => playerMarker;
    const makeMove = (index) => {
        Gameboard.addMoveToGameboard(index, getPlayerMarker())
    }
    return {makeMove}

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
    const checkWinConditions = () => {
        winConditions.forEach((el) => {
            if(gameboard[el[0]] === gameboard[el[1]] && gameboard[el[0]] === gameboard[el[2]]) {
                console.log('Winner, Winner, Chicken Dinner!!')
                return true 
            } 
        })
        console.log("Draw! You're both losers!")
        return false
    }



    return {addMoveToGameboard, isValidMove, checkWinConditions}

    //Reset gameboard
})();




const Game = (() => {
    let turnCount = 1

    const board = document.getElementById("board")
 //update DOM based on gameboard? (needs access to gameboard?)
 //player clicks on gameboard

    const _playerTurn = (e) => {
        let index = +e.target.id

        if (Gameboard.isValidMove(e, index)){
            if(turnCount % 2 !== 0) {
                playerOne.makeMove(index)
            } else {
                playerTwo.makeMove(index)
            }
            _hasAnyoneWon()
            turnCount += 1
        }
    }

    const _hasAnyoneWon = () => {
        if(Gameboard.checkWinConditions()) {
            console.log("Winner, Winner. Chicken dinner!")
        } else if(!Gameboard.checkWinConditions() && turnCount === 9) {
            console.log("It's a draw!")
        }
    }

    board.addEventListener("click", _playerTurn) //Needs to call makeMove on the appropriate player object

    return { }

})(Gameboard);
