import React, {Component} from 'react';

import SessionCounter from './components/sessionCounter/SessionCounter';

class App extends Component {
    render() {
        return (
            <div id="app">
                <SessionCounter />
            </div>
        )
    }
}

export default App;
