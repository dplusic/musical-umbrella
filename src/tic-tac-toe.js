import Game from 'boardgame.io/game';
import {size} from './constants';

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
    setup: numPlayers => {
        const cells = new Array(size.width).fill(null).map(x => new Array(size.height).fill(null));
        const playerPositions = {};
        const scores = {};

        for (let currentPlayer = 0; currentPlayer < numPlayers; currentPlayer++) {
            while (true) {
                const i = Math.floor((Math.random() * size.width));
                const j = Math.floor((Math.random() * size.height));
                if (cells[i][j] === null) {
                    cells[i][j] = '' + currentPlayer;
                    playerPositions[currentPlayer] = {i, j};
                    scores[currentPlayer] = 1;
                    break;
                }
            }
        }
        return {cells, playerPositions, scores};
    },

    moves: {
        clickCell(G, ctx, i, j) {
            const cells = [...G.cells];

            // Ensure we can't overwrite cells.
            if (cells[i][j] === null) {
                cells[i][j] = ctx.currentPlayer;
            }

            const playerPositions = Object.assign({}, G.playerPositions, {[ctx.currentPlayer]: {i, j}});
            const scores = Object.assign({}, G.scores, {[ctx.currentPlayer]: G.scores[ctx.currentPlayer] + 1});

            return {cells, playerPositions, scores, started: true};
        }
    },

    victory: (G, ctx) => {
        return IsVictory(G.cells) ? ctx.currentPlayer : null;
    }
});

export default TicTacToe;
