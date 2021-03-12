import './main.scss';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CookieConsent, { Cookies } from "react-cookie-consent";
import React, {Suspense, lazy, useEffect, useState} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import Spinner from './components/ui/spinner/spinner';

const About = lazy(() => import('./page-layouts/about/about'));
const AddResultForm = lazy(() => import('./page-layouts/forms/add-result/add-result'));
const AddResultsComplete = lazy(() => import('./components/form/journey/add-result-complete'));
const Attendances = lazy(() => import('./components/attendances/attendances'));
const Bio = lazy(() => import('./page-layouts/about/bio/bio'));
const ContentWrapper = lazy(() => import('./components/hoc/component-wrapper/wrapper'));
const CookieNotice = lazy(() => import('./components/cookies/cookie-notice/cookie-notice'));
const CookiePolicy = lazy(() => import('./components/cookies/cookie-policy/cookie-policy'));
const Disclaimer = lazy(() => import('./page-layouts/disclaimer/disclaimer'));
const Goalscorers = lazy(() => import('./components/scorer/scorer'));
const Home = lazy(() => import('./page-layouts/home/home'));
const LeaguePositions = lazy(() => import('./components/league-positions/league-positions'));
const Login = lazy(() => import('./components/login/login'));
const Matches = lazy(() => import('./components/match/match'));
const Players = lazy(() => import('./page-layouts/players/players'));
const Teams = lazy(() => import('./components/teams/teams'));

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