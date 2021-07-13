import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Homepage from '../components/Homepage'
import AddStorePage from '../components/stores/AddStorePage';
import UserDashboard from '../components/UserDashboard';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path = '/' component = {Homepage} exact = {true}/>
                <Route path = '/UserDashboard' component = {UserDashboard} exact = {true} />
                <Route path = '/UserDashboard/AddStore' component = {AddStorePage} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter