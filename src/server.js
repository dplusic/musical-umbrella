import KoaStatic from 'koa-static';
import Server from 'boardgame.io/server';
import TicTacToe from './tic-tac-toe';
import { numPlayers } from './constants';

const app = Server({game: TicTacToe, numPlayers});
app.use(KoaStatic('build'));
app.listen(8000);
