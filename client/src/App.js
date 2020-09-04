import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    <Router>
        <Route path = "/" exact component = {Join} />
        <Route path = "/chat" component = {Chat} />
    </Router>
);

export default App;
/*
User will be greeted with the join component when he first visits the page. 
Then he enters the username and password to log into his account.
After this user will meet the chat component.
*/
