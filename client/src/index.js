/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Materials from './listOfMaterials';
import * as serviceWorker from './serviceWorker';
import Register from './register';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './login';
import Owners from './owners';
import Resources from './resources'
import Account from './account'
const routes = ( 
    <BrowserRouter>
        <switch>
            <Route path ="/dashboard/stores" component={Resources}/> 
            <Route path ="/dashboard/materials" component={Materials}/> 
            <Route path ="/register" component={Register}/> 
            <Route path="/login" component={Login}/>
            <Route path="/dashboard/owners" component={Owners}/>
            <Route path="/profile" component={Account}/>
        </switch>
    </BrowserRouter>
    );

//ReactDOM.render(Register,document.getElementById('root'));

ReactDOM.render(routes,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


serviceWorker.unregister();
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();