import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({component: Component, authStatus ,...rest}) => {
  
  return (
    <Route  
      {...rest}
      render = { (props) => {
        // return <Component {...props} {...rest} />;
        if(authStatus === "LOGGED_IN") {
          return <Component {...props} {...rest} />;
        } else {
          return <Redirect to={
            {
              pathname: "/"
            }
          }/>
        }
        
      }}
    />
  );
};

