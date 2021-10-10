const Gameboard = (() => {
    const gameboard = [
    ['x', 'o', 'o'],
    ['o', 'x', 'o'],
    ['o', 'x', 'x']
    ];

    const renderBoard = () => {
        for(let i = 0; i < gameboard.length; i++) {
            for(let j = 0; j < gameboard[i].length; j++) {
                const cell = document.getElementById(`${i}-${j}`)
                if (cell) {
                    cell.textContent = gameboard[i][j]
                }
            }
        }

    }
    return {renderBoard}
})();

const Game = (() => {

})();

const Player = (name) => {

}
