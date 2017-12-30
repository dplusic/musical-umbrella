import Game from 'boardgame.io/game';

/**
 * @return {boolean}
 */
function IsVictory(cells) {
    const positions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pos of positions) {
        const symbol = cells[pos[0]];
        let winner = symbol;
        for (let i of pos) {
            if (cells[i] !== symbol) {
                winner = null;
                break;
            }
        }
        if (winner !== null) return true;
    }

    return false;
}

const TicTacToe = Game({
    setup: () => ({cells: new Array(9).fill(null)}),

    moves: {
        clickCell(G, ctx, id) {
            const cells = [...G.cells];

            // Ensure we can't overwrite cells.
            if (cells[id] === null) {
                cells[id] = ctx.currentPlayer;
            }

            return Object.assign({}, G, {cells});
        }
    },

    victory: (G, ctx) => {
        return IsVictory(G.cells) ? ctx.currentPlayer : null;
    }
});

export default TicTacToe;
