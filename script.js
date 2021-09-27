const game = (() => {
    const gameBoard = [
    ['x', 'o', 'o'],
    ['o', 'x', 'o'],
    ['o', 'x', 'x']
    ];

    const renderBoard = () => {
        for(let i = 0; i < gameBoard.length; i++) {
            for(let j = 0; j < gameBoard[i].length; j++) {
                const cell = document.getElementById(`#${i}-${j}`)
                if (cell) {
                    cell.textContent = gameBoard[i][j]
                }
            }
        }

    }

    return {renderBoard}


})();

const displayController = (() => {

    const renderBoard = () => {

    }
    
    const clearBoard = () => {

    }

})();

const Player = (name) => {

}