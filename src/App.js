import './main.scss';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CookieConsent, { Cookies } from "react-cookie-consent";
import React, {useEffect, useState} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import About from './page-layouts/about/about';
import AddResultForm from './page-layouts/forms/add-result/add-result';
import AddResultsComplete from './components/form/journey/add-result-complete';
import Attendances from './components/attendances/attendances';
import Bio from './page-layouts/about/bio/bio';
import ContentWrapper from './components/hoc/component-wrapper/wrapper';
import CookieNotice from './components/cookies/cookie-notice/cookie-notice';
import CookiePolicy from './components/cookies/cookie-policy/cookie-policy';
import Disclaimer from './page-layouts/disclaimer/disclaimer';
import Goalscorers from './components/scorer/scorer';
import Home from './page-layouts/home/home';
import LeaguePositions from './components/league-positions/league-positions';
import Login from './components/login/login';
import Matches from './components/match/match';
import Players from './page-layouts/players/players';
import Teams from './components/teams/teams';

export default withRouter(function App({ location }) {

  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [hasError, setErrors] = useState(false);
  
  useEffect(() => {
    const { pathname } = location;
    setCurrentPath(pathname);
  }, [location]);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
});