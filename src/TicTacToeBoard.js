import React from 'react';
import {size, playerNames, turnTimeout} from './constants';

const playerColors = {
    '0': {r: 100, g: 100, b: 100},
    '1': {r: 200, g: 100, b: 100},
    '2': {r: 100, g: 200, b: 100},
    '3': {r: 100, g: 100, b: 200},
    '4': {r: 200, g: 100, b: 200},
    '5': {r: 100, g: 200, b: 200},
};

class TicTacToeBoard extends React.Component {
    onClick(i, j) {
        if (this.isActive(i, j)) {
            this.props.moves.clickCell(i, j);
            this.props.endTurn();

            clearTimeout(this.timer);
        }
    }

    componentDidUpdate() {
        if (this.props.isActive !== true || this.props.G.started !== true) {
            return;
        }

        this.timer = setTimeout(() => {
            this.props.endTurn();
        }, turnTimeout);
    }

    isActive(i, j) {
        if (this.props.isActive !== true) return false;
        if (this.props.ctx.winner !== null) return false;
        if (this.props.G.cells[i][j] !== null) return false;

        const playerPosition = this.props.G.playerPositions[this.props.ctx.currentPlayer];
        if (Math.abs(playerPosition.i - i) + Math.abs(playerPosition.j - j) !== 1) return false;

        return true;
    }

    render() {
        let winner = '';
        if (this.props.ctx.winner !== null) {
            winner = <div>Winner: {this.props.ctx.winner}</div>;
        }

        const cellStyle = {
            border: '1px solid #555',
            width: '50px',
            height: '50px',
            lineHeight: '50px',
            textAlign: 'center',
        };

        let tbody = [];
        for (let i = 0; i < size.width; i++) {
            let cells = [];
            for (let j = 0; j < size.height; j++) {

                let playerName = '';
                let style = cellStyle;

                const cellPlayer = this.props.G.cells[i][j];
                if (cellPlayer) {
                    playerName = playerNames[cellPlayer];
                    const playerColor = playerColors[cellPlayer];
                    const playerPosition = this.props.G.playerPositions[cellPlayer];
                    const alpha = i === playerPosition.i && j === playerPosition.j ?
                        (this.props.ctx.currentPlayer === cellPlayer ? 0.8 : 0.4) : 0.2;

                    style = Object.assign({
                        'backgroundColor': `rgba(${playerColor.r}, ${playerColor.g}, ${playerColor.b}, ${alpha})`
                    }, cellStyle);
                }

                cells.push(
                    <td style={style}
                        key={i * size.width + j}
                        onClick={() => this.onClick(i, j)}
                    >
                        {playerName}
                    </td>
                );
            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }

        return (
            <div>
                <div>
                    {Object.entries(this.props.G.scores).map(([key, value]) => {
                        const playerColor = playerColors[key];
                        return (
                            <span
                                key={key}
                                style={({
                                    margin: '10px',
                                    backgroundColor: `rgba(${playerColor.r}, ${playerColor.g}, ${playerColor.b}, 0.5`,
                                })}
                            >
                                {playerNames[key]} {value}
                            </span>
                        )
                    })}
                </div>
                <table id="board">
                    <tbody>{tbody}</tbody>
                </table>
                {winner}
            </div>
        );
    }
}

export default TicTacToeBoard;
