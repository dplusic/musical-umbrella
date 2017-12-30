import Client from 'boardgame.io/client';
import TicTacToe from "./tic-tac-toe";
import TicTacToeBoard from './TicTacToeBoard';

const App = Client({game: TicTacToe, board: TicTacToeBoard, multiplayer: true});

export default App;
