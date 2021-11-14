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

    // const getGameboardIndex = (index) => {
    //     console.log(document.getElementById(`${index}`))
    //     return document.getElementById(`${index}`)
    // }

    const addMove = (e, player) => {
            //Check if move is valid
            let index = +e.target.id
            if(isMoveValid(e, index)) {
            //Add move to gameboard
                marker = player === 0 ? "O" : "X"
                gameboard[index] = marker
            //Render board
                _render()
            }
    }

    const isMoveValid = (e, index) => {
        //Verify that the click occurred on a valid cell
        if(isBoardCellClicked(e)){
            //Verify that the gameboard at index is === ""
            //Return True or False
            return gameboard[index] === "" ? true : false;
        }
        return false
    }

    const isBoardCellClicked = (e) => {
        return e.target.nodeName === "TD" ? true : false;
    }

    return {addMove}

    //Reset gameboard
})();

const Game = (() => {
    const board = document.getElementById("board")
 //update DOM based on gameboard? (needs access to gameboard?)
 //player clicks on gameboard
    board.addEventListener("click", Gameboard.addMove)


    return { }

})(Gameboard);

const Player = (name) => {

}

/*
define marker based on which player is playing (alternate players each move)

Gameboard
  
  
Player

Game

*/