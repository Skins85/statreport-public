import './main.scss';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CookieConsent, { Cookies } from "react-cookie-consent";
import React, {Suspense, lazy, useEffect, useState} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

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

export default withRouter(function App({ location }) {

  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [hasError, setErrors] = useState(false);
  
  useEffect(() => {
    const { pathname } = location;
    setCurrentPath(pathname);
  }, [location]);

  return (
    <React.Fragment>
      <Suspense fallback={<Spinner />}>
      <CookieNotice />
      <ContentWrapper
        path={currentPath}>
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
          <Route path="/admin/add-result" component={AddResultForm} />
          <Route path="/admin/add-result-complete" component={AddResultsComplete} />
          <Route path="/login" component={Login} />
          <Route exact path="/teams" component={Teams} /> 
          <Route exact="/teams" component={Teams}/>
          {/* <Route path="*" component={() => "404 not found"} /> */}
        </Switch>
      </ContentWrapper>
      </Suspense>
    </React.Fragment>
  );
});