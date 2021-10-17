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

    const addMove = () => {
            //Check if move is valid
            if(isMoveValid()) {
            //Add move to gameboard
            
            //Render board
            _render()
            }
    }

    const isMoveValid = (index) => {
        //Verify that the gameboard at index is === ""
        //Return True or False
        return gameboard[index] === "" ? true : false;
    }

    return {addMove}


    //Reset gameboard
})();

const Game = (() => {
 //update DOM based on gameboard? (needs access to gameboard)
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