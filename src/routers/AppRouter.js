import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Homepage from '../components/Homepage'
import AddStorePage from '../components/stores/AddStorePage';
import UserDashboard from '../components/UserDashboard';
import StoreDashboard from '../components/stores/StoreDashboard';
import ProductsListPage from '../components/products/ProductsListPage';
import AddProductForm from '../components/products/AddProductForm';
import NotFoundPage from '../components/NotfoundPage'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path = '/' component = {Homepage} exact = {true}/>
                <Route path = '/UserDashboard' component = {UserDashboard} exact = {true} />
                <Route path = '/UserDashboard/AddStore' component = {AddStorePage} />
                <Route path = '/UserDashboard/stores/:id/products' component = {ProductsListPage} exact />
                <Route path = '/UserDashboard/stores/:id' component = {StoreDashboard} exact = {true} />
                <Route path = '/UserDashboard/stores/:id/products/add' component = {AddProductForm}  />
                <Route  component = {NotFoundPage}  />
                
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter