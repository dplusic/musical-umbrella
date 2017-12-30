import Game from 'boardgame.io/game';
import {size, numPlayers} from './constants';

const TicTacToe = Game({
    setup: numPlayers => {
        const cells = new Array(size.width).fill(null).map(x => new Array(size.height).fill(null));
        const playerPositions = {};
        const scores = {};
        const dead = {};

        for (let currentPlayer = 0; currentPlayer < numPlayers; currentPlayer++) {
            while (true) {
                const i = Math.floor((Math.random() * size.width));
                const j = Math.floor((Math.random() * size.height));
                if (cells[i][j] === null) {
                    cells[i][j] = '' + currentPlayer;
                    playerPositions[currentPlayer] = {i, j};
                    scores[currentPlayer] = 1;
                    dead[currentPlayer] = false;
                    break;
                }
            }
        }
        return {cells, playerPositions, scores, dead};
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
            const dead = Object.assign({}, G.dead);

            return {cells, playerPositions, scores, dead, started: true};
        },

        die(G, ctx) {
            const playerPositions = Object.assign({}, G.playerPositions, {[ctx.currentPlayer]: {i: -1, j: -1}});
            const dead = Object.assign({}, G.dead, {[ctx.currentPlayer]: true});
            return Object.assign({}, G, {playerPositions, dead});
        },
    },

    victory: (G, ctx) => {
        if (Object.values(G.dead).every(x => x) === false) {
            return null;
        }

        return Object.entries(G.scores)
            .sort(([aKey, aValue], [bKey, bValue]) => bValue - aValue)
            .map(([key, value]) => key)
            .find(x => true);
    }
});

export default TicTacToe;
