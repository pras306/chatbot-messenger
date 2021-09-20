import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './Routes.css';
import Home from '../Home/Home';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import ChatRooms from '../ChatRooms/ChatRooms';

const Routes = () => {
    return (
        <div className="routes">
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/rooms' exact component={ChatRooms} />
            </Switch>
        </div>
    )
}

export default Routes;
