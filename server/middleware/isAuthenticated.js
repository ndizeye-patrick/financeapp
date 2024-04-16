// AuthMiddleware.js
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the js-cookie library

// Helper function to check if the token exists in the cookie
const isAuthenticated = () => {
  // Replace 'token' with the name of your cookie
  const token = Cookies.get('token');
  return !!token;
};

const AuthMiddleware = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default AuthMiddleware;