import React from 'react';
import {render} from 'react-dom';

import App from './components/app.jsx';

function renderApp(user) {
    render(<App user={user}/>, document.getElementById('app'));
}

export default renderApp;
