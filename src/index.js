import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const params = window.location.search.substring(1)
    .split('&')
    .map(x => x.split('='))
    .reduce((acc, cur) => {
        acc[cur[0]] = cur[1];
        return acc;
    }, {});

ReactDOM.render(<App gameID={params.gameID} playerID={params.playerID}/>, document.getElementById('root'));
registerServiceWorker();
