import React from 'react';
import { useLocation } from 'react-router-dom';
import { get } from 'lodash';
import NotFoundPage from './components/NotfoundPage';
import LoginRedirect from './components/LoginRedirect'

// this wraps all routes in appRouter so that it can react to an error on any page
// (at any location)
const ErrorHandler = ({ children }) => {
 
  const location = useLocation();
  switch (get(location.state, 'errorStatusCode')) {
    case 404:
      return <NotFoundPage />;
    case 401:
      return <LoginRedirect />

    
      
    default:
      return children
  }
};
// used in actions
export const setError = (response, history) => {

  if (!response.ok && response.status < 400) {
    throw new Error()
  } else {
    history.replace(history.location.pathname, { 
      errorStatusCode: response.status 
    });
  }
} 
export default ErrorHandler