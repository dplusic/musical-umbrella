import KoaStatic from 'koa-static';
import Server from 'boardgame.io/server';
import TicTacToe from './tic-tac-toe';

const app = Server({game: TicTacToe});
app.use(KoaStatic('build'));
app.listen(8000);
