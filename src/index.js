import '../main.scss';

import React, {Suspense, lazy, useEffect, useState} from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import configureStore, { history } from '../configureStore';

import App from './App';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Spinner from './components/ui/spinner/spinner';

const rootEl = document.getElementById('root');
// const store = configureStore({});
const { store, persistor } = configureStore();


const About = lazy(() => import(/* webpackChunkName: 'about' */ './page-layouts/about/about'));
const AddResultForm = lazy(() => import(/* webpackChunkName: 'add-result' */ './page-layouts/forms/add-result/add-result'));
const AddResultsComplete = lazy(() => import(/* webpackChunkName: 'add-result-complete' */ './components/form/journey/add-result-complete'));
const Attendances = lazy(() => import(/* webpackChunkName: 'attendances' */ './components/attendances/attendances'));
const Bio = lazy(() => import(/* webpackChunkName: 'bio' */ './page-layouts/about/bio/bio'));
const ContentWrapper = lazy(() => import(/* webpackChunkName: 'component-wrapper' */ './components/hoc/component-wrapper/wrapper'));
const CookiePolicy = lazy(() => import(/* webpackChunkName: 'cookie-policy' */ './components/cookies/cookie-policy/cookie-policy'));
const Disclaimer = lazy(() => import(/* webpackChunkName: 'disclaimer' */ './page-layouts/disclaimer/disclaimer'));
const Goalscorers = lazy(() => import(/* webpackChunkName: 'scorer' */ './components/scorer/scorer'));
const Home = lazy(() => import(/* webpackChunkName: 'home' */ './page-layouts/home/home'));
const LeaguePositions = lazy(() => import(/* webpackChunkName: 'league-positions' */ './components/league-positions/league-positions'));
const Matches = lazy(() => import(/* webpackChunkName: 'match' */ './components/match/match'));
const Players = lazy(() => import(/* webpackChunkName: 'players' */ './page-layouts/players/players'));
const Teams = lazy(() => import(/* webpackChunkName: 'teams' */ './components/teams/teams'));
const Season = lazy(() => import(/* webpackChunkName: 'season' */ './components/season/data/season'));

const routing = (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ConnectedRouter history={history}>
                <Router>
                    <Suspense fallback={<Spinner />}>
                        <ContentWrapper>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/about" component={About} />
                                <Route exact path="/about/bio" component={Bio} />
                                <Route exact path="/cookies" component={CookiePolicy} />
                                <Route path="/disclaimer" component={Disclaimer} />
                                <Route path="/matches/attendances" component={Attendances} />
                                <Route path="/matches/league-positions" component={LeaguePositions} />
                                <Route exact path="/matches" component={Matches} />
                                <Route path="/players/scorers" component={Goalscorers} />
                                <Route exact path="/players" component={Players} />
                                <Route path="/players/" component={Players} />
                                <Route path="/matches/seasons" component={Season} />
                                <Route exact path="/admin/add-result" component={AddResultForm} />
                                <Route path="/admin/add-result-complete" component={AddResultsComplete} />
                                <Route exact path="/teams" component={Teams} /> 
                                <Route exact="/teams" component={Teams}/>
                            </Switch>
                        </ContentWrapper>
                    </Suspense>
                </Router>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));