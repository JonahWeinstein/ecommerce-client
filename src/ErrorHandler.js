import React from 'react';
import { useLocation } from 'react-router-dom';
import { get } from 'lodash';
import NotFoundPage from './components/NotfoundPage';
import LoginRedirect from './components/LoginRedirect'

// this wraps all routes in appRouter so that it can react to an error on any page
// (at any location)
const ErrorHandler = ({ children }) => {
 
  const location = useLocation();
  console.log("location status: ", get(location.state, 'errorStatusCode'))
  switch (get(location.state, 'errorStatusCode')) {
    case 404:
      return <NotFoundPage />;
    case 401:
      return <LoginRedirect />

    
      
    default:
      return children
  }
};
export default ErrorHandler