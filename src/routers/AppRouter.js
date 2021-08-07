import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Homepage from '../components/Homepage'
import AddStoreForm from '../components/stores/AddStoreForm';
import UserDashboard from '../components/UserDashboard';
import StoreDashboard from '../components/stores/StoreDashboard';
import ProductsListPage from '../components/products/ProductsListPage';
import EditProductPage from '../components/products/EditProductPage';
import AddProductPage from '../components/products/AddProductPage';
import NotFoundPage from '../components/NotfoundPage'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path = '/' component = {Homepage} exact = {true}/>
                <Route path = '/UserDashboard' component = {UserDashboard} exact = {true} />
                <Route path = '/UserDashboard/AddStore' component = {AddStoreForm} />
                <Route path = '/UserDashboard/stores/:id/products' component = {ProductsListPage} exact />
                <Route path = '/UserDashboard/stores/:id' component = {StoreDashboard} exact = {true} />
                <Route path = '/UserDashboard/stores/:id/products/add' component = {AddProductPage}  />
                <Route path = '/UserDashboard/stores/:id/products/:productId' component = {EditProductPage}  />
                <Route  component = {NotFoundPage}  />
                
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter