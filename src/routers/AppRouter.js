import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Homepage from '../components/Homepage'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path = '/' component = {Homepage} exact = {true}/>
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter