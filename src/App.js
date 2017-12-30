import Client from 'boardgame.io/client';
import TicTacToe from "./tic-tac-toe";
import TicTacToeBoard from './TicTacToeBoard';
import { numPlayers } from './constants';

const App = Client({game: TicTacToe, numPlayers, board: TicTacToeBoard, multiplayer: true, debug: false});

export default App;
