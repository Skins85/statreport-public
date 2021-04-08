import {Link, Route, Switch, withRouter} from 'react-router-dom';
import React, { Component, Suspense, lazy } from 'react';
// const Home = lazy(() => import(/* webpackChunkName: 'home' */ './page-layouts/home/home'));

export default function App() {
    
    return (
        <React.Fragment>
            <div>
                <h1>Webpack + React setup</h1>
                <Link to='./test'>Test</Link>
            </div>
        </React.Fragment>
    )
}