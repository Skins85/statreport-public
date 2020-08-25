import {Redirect, Route} from 'react-router-dom';

import React from 'react';
import auth from '../../config/auth';

// Returns a route with a rendered prop of the component passed in
export default function ProtectedRoute({component: Component, ...rest}) {
    return (
        <Route 
            {...rest} 
            render={
                (props) => {
                    if (auth.isAuthenticated) {
                        return <Component {...props} />
                    } else {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: {
                                        from: props.location
                                    }
                                }}
                            />  
                        )
                    }
                }
            }
        />
    )
}