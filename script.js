const Gameboard = (() => {
    const gameboard = ['X', 'O', 'O', 'O', 'X', '', 'O', 'X', 'X'];

    // const _cacheDOM =() => {
    //     this.cell =  document.getElementById(`${i}-${j}`)
    // }

    const _render = () => {
        gameboard.forEach((el, index) => {
            const cell = getGameboardIndex(index)
            if (cell) {
                cell.textContent = el
            }
        })
    }

    const getGameboardIndex = (index) => {
        return document.getElementById(`${index}`)
    }

    const addMove = (index, player) => {
            //Check if move is valid
            if(isMoveValid(index)) {
            //Add move to gameboard
                marker = player === 0 ? "O" : "X"
                gameboard[index] = marker
            //Render board
                _render()
            }
    }

    const isMoveValid = (index) => {
        //Verify that the gameboard at index is === ""
        //Return True or False
        return gameboard[index] === "" ? true : false;
    }

    return {addMove, getGameboardIndex}


    //Reset gameboard
})();

const Game = (() => {
 //update DOM based on gameboard? (needs access to gameboard?)
 //player clicks on gameboard
Gameboard.addMove

})(Gameboard);

const Player = (name) => {

}

/*
Add Marks to spot on board
tie mark to the dom (players click on gamboard to place their marker)
check to see if move is valid

Gameboard
  
  
Player

Game

*/