const Gameboard = (() => {
    const gameboard = ['x', 'o', 'o', 'o', 'x', 'o', 'o', 'x', 'x'];

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

    const addMove = () => {
            //Check if move is valid
            if(isMoveValid) {
            //Add move to gameboard
            //Render board

            _render()
            }
    }

    const isMoveValid = () => {
        //Verify that move is a valide move
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
check to see if move is valid is available available

Gameboard
  
  
Player

Game

*/