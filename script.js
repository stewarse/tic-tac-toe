const Player = (name, playerMarker) => {
    const getPlayerMarker = () => playerMarker;
    const makeMove = (index) => {
        Gameboard.addMoveToGameboard(index, getPlayerMarker())
    }
    return {makeMove}

}

const playerOne = Player('Player One', 'X')
const playerTwo = Player('Player Two', 'O')

const Gameboard = (() => {

    const gameboard = ['', '', '', '', '', '', '', '', ''];

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

    return {addMoveToGameboard, isValidMove}

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
            turnCount += 1
        }
    }

    board.addEventListener("click", _playerTurn) //Needs to call makeMove on the appropriate player object

    return { }

})(Gameboard);







/*
define marker based on which player is playing (alternate players each move)

Gameboard
  
  
Player

Game

*/