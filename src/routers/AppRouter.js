import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Homepage from '../components/Homepage'
import UserDashboard from '../components/UserDashboard';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path = '/' component = {Homepage} exact = {true}/>
                <Route path = '/UserDashboard' component = {UserDashboard} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter