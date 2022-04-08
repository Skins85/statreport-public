import '../main.scss';

import React, {Suspense, lazy, useEffect, useState} from 'react';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';

import App from './App';
import ReactDOM from 'react-dom';
import Spinner from './components/ui/spinner/spinner';

const About = lazy(() => import(/* webpackChunkName: 'about' */ './page-layouts/about/about'));
const AddResultForm = lazy(() => import(/* webpackChunkName: 'add-result' */ './page-layouts/forms/add-result/add-result'));
const AddResultsComplete = lazy(() => import(/* webpackChunkName: 'add-result-complete' */ './components/form/journey/add-result-complete'));
const Attendances = lazy(() => import(/* webpackChunkName: 'attendances' */ './components/attendances/attendances'));
const Bio = lazy(() => import(/* webpackChunkName: 'bio' */ './page-layouts/about/bio/bio'));
const ContentWrapper = lazy(() => import(/* webpackChunkName: 'component-wrapper' */ './components/hoc/component-wrapper/wrapper'));
const CookieNotice = lazy(() => import(/* webpackChunkName: 'cookie-notice' */ './components/cookies/cookie-notice/cookie-notice'));
const CookiePolicy = lazy(() => import(/* webpackChunkName: 'cookie-policy' */ './components/cookies/cookie-policy/cookie-policy'));
const Disclaimer = lazy(() => import(/* webpackChunkName: 'disclaimer' */ './page-layouts/disclaimer/disclaimer'));
const Goalscorers = lazy(() => import(/* webpackChunkName: 'scorer' */ './components/scorer/scorer'));
const Home = lazy(() => import(/* webpackChunkName: 'home' */ './page-layouts/home/home'));
const LeaguePositions = lazy(() => import(/* webpackChunkName: 'league-positions' */ './components/league-positions/league-positions'));
const Login = lazy(() => import(/* webpackChunkName: 'login' */ './components/login/login'));
const Matches = lazy(() => import(/* webpackChunkName: 'match' */ './components/match/match'));
const Players = lazy(() => import(/* webpackChunkName: 'players' */ './page-layouts/players/players'));
const Teams = lazy(() => import(/* webpackChunkName: 'teams' */ './components/teams/teams'));
const Season = lazy(() => import(/* webpackChunkName: 'season' */ './components/season/data/season'));


// import { createBrowserHistory } from 'history';

interface FullName {
    firstName: string;
    lastName: string;
}

function Person({firstName, lastName}:FullName){
    return <h1>Hello there, {firstName} {lastName}</h1>;
}

let block = (
    <>
        <h1>Hello, this is React and Typescript</h1>
        <Person firstName="Steve" lastName="Jones" />
    </>
)

const routing = (
    <Router>
        <Suspense fallback={<Spinner />}>
            <ContentWrapper>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                </Switch>
            </ContentWrapper>
        </Suspense>
    </Router>
)

ReactDOM.render(
    routing,
    document.getElementById("root")
);