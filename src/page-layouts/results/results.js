import React, {Component} from 'react';

import Banner from '../../components/banner/banner';
import BannerImg from '../../images/banner/football-field-alfredo-camacho.jpg';
import Result from '../../components/result/result';
import SeasonOptions from '../../components/form/options/season';
import Select from '../../components/form/ui/select/select';
import Spinner from '../../components/ui/spinner/spinner';
import Table from '../../components/hoc/table/table';
import Warning from '../../components/hoc/warning/warning';
import axios from 'axios';
import { nameFormat } from '../../util';
import { setupCache } from 'axios-cache-adapter';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: '',
          location: '',
          season: '2021-22',
          opposition: 'all',
          teamsData: '',
          filteredResults: '',
          dataLoaded: false
        };
    }
        
    // Generic onChange handler => updates state
    onChange = e => this.setState({ 
        [e.target.name]: e.target.value 
    });

    // Season change handler
    seasonChange = (e) => {
      this.setState({ 
        season: e.target.value
      });
    }

    // Stay on page once form submitted
    handleSubmit(event) {
        event.preventDefault();
    }

    async componentDidMount() {
      // Cache GET requests
      let cache;
      function cacheReq() {
        
        // Define cache adapter and manage properties
        cache = setupCache({
          maxAge: 15 * 60 * 1000
        })
      }
      await cacheReq(cache);

      // Create cache adapter instance
      const api = axios.create({
        adapter: cache.adapter
      })
      
      // Cache GET responses and save in state
      await api({
        url: 'https://www.statreport.co.uk/api/json/data-matches.php',
        method: 'get'
      }).then(async (response) => {
        this.setState({data: response.data})
      })

      await api({
        url: 'https://www.statreport.co.uk/api/json/data-teams.php',
        method: 'get'
      }).then(async (response) => {
        this.setState({teamsData: response.data})
      })
      
      await this.setState({dataLoaded: true})
    }

    render() {
      document.title = `${nameFormat('Dagenham & Redbridge')} matches | StatReport`;

        // For scoping, define variables needed in template
        let results = this.state.data.results;
        let results_template;
        let table_heading;
        let team_select;
        let teamsList;
        let season_select;
        let filteredResults;
        let team_home;
        let team_away;
        let season;
        let opposition;
        let outcome;
        let banner = <Banner
          name='Matches'
          description='Results and match information'
          image={BannerImg}
          // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freeimages.com/">FreeImages</a>
        />;

        if (results) {

            // Assign variables to variables (will be used to filter data)
            this.state.location === 'home' ? team_home = 'Dagenham & Redbridge'
              : this.state.location === 'away' ? team_away = 'Dagenham & Redbridge'
              : team_home = ('Dagenham & Redbridge', team_away = 'Dagenham & Redbridge');
            season = this.state.season;
            opposition = this.state.opposition;
      
            // Filter results object based on variables set from state 
            filteredResults = results.filter(function(result) {
              return (
                (result.team_home === team_home || result.team_away === team_away) &&
                (season !== 'all' ? result.season === season : result.season === 
                  '2020-21' || 
                  '2019-20' || 
                  '2018-19' || 
                  '2017-18' || 
                  '2016-17' || 
                  '2015-16' || 
                  '2014-15' || 
                  '2013-14' ) &&
                (opposition === 'all' 
                  ? (result.team_home === 'Dagenham & Redbridge' 
                    || result.team_away === 'Dagenham & Redbridge') 
                  : (result.team_away === opposition 
                    || result.team_home === opposition))
                ); 

              });              
      
            if (filteredResults.length > 0) {
      
              results_template = filteredResults.map(result => {
      
                if (result.goals_home === result.goals_away) {
                  outcome = 'D';
                } else if (result.team_home === ('Dagenham & Redbridge' && result.goals_home > result.goals_away) || (result.team_away === 'Dagenham & Redbridge' && result.goals_away > result.goals_home)) {
                  outcome = 'W'
                } else if (result.team_home === ('Dagenham & Redbridge' && result.goals_home < result.goals_away) || (result.team_away === 'Dagenham & Redbridge' && result.goals_away < result.goals_home)) {
                  outcome = 'L';
                }

                console.log(result);
      
                return (
                  <Result
                    key={result.match_id}
                    match_id={result.match_id}
                    competition={result.competition}
                    season={result.season}
                    date={result.date}
                    team_home={result.team_home}
                    goals_home={result.goals_home}
                    goals_away={result.goals_away}
                    team_away={result.team_away}
                    attendance={result.attendance}
                    league_position={result.league_position}
                    link_enabled
                  />
                )
              })
            } 
      
            /**
             * Create markup for select menus based on fetched data. Map through and filter out any duplicate values
             */
            let teams = this.state.teamsData.results,
              teamsArray = [];

            if (teams) {
              for (const t of teams) {
                teamsArray.push(t)
              }
            }

            // Build teams select options
            teamsList = teamsArray.map(t => {
              return <option 
                key={t.team_id} 
                value={t.team_name}
                name={t.team_name}
              >
              {t.team_name}
              </option>
            });
            
            let oppositionArr = [];
            results.map(result => { 
              oppositionArr.push(result.opposition);
            })
            oppositionArr = [...new Set(oppositionArr)];
            team_select = oppositionArr.map(opposition => { return <option value={opposition}>{opposition}</option> })
            
            let seasonsArr = [];
            results.map(result => { 
              seasonsArr.push(result.season);
            })
            seasonsArr = [...new Set(seasonsArr)];
            // Set default selected season to state value
            season_select = seasonsArr.map(season => { 
              if (season === this.state.season) {
                return (
                  <option value={season} selected>{season}</option>
                )
              } else {
                return (
                  <option value={season}>{season}</option>
                ) 
              }
            })
          }
        filteredResults = [...new Set(filteredResults)];

        if (filteredResults.length > 0) {
          return (
            <React.Fragment>
              {banner}
              <div className='wrapper--content__inpage'>
                <form 
                  className='matches__filter background-gray2'
                  onSubmit={this.handleSubmit}
                >
                  <h2>Filter matches</h2>
                  <select name="location" onChange={this.onChange}>
                    <option value="all" selected>All locations</option>
                    <option value="home">Home</option>
                    <option value="away">Away</option>
                  </select>
                  <select name="opposition" onChange={this.onChange}>
                    <option value="all">All teams</option>
                    {teamsList}
                  </select>
                  <Select 
                    labelText={`Season`} 
                    selectName={`results.season`} 
                    onChange={this.seasonChange}
                  >
                    <option value="" selected disabled hidden>Select season</option>
                    <SeasonOptions />
                    </Select>
                </form>
                <Table>
                  <thead data-content-align='left'>
                    <tr>
                      <th>Date</th>
                      <th>Competition</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th 
                        className="align-right"
                        data-display="small"
                      ><abbr title="Attendance">Att</abbr></th>
                      <th 
                        className="align-right"
                        data-display="small"
                      ><abbr title="League position">Pos</abbr></th>
                    </tr>
                  </thead>
                  <tbody>
                    {results_template}
                  </tbody>
                </Table>
              </div>
            </React.Fragment>
          )  
        } else if (!this.state.dataLoaded) {
          return (
              <Spinner />
          )
        } else {
          return (
            <React.Fragment>
              {banner}
              <div className='wrapper--content__inpage'>
                <form 
                  className='matches__filter background-gray2'
                  onSubmit={this.handleSubmit}
                >
                  <h2>Filter matches</h2>
                  <select name="location" onChange={this.onChange}>
                    <option value="all" selected>All locations</option>
                    <option value="home">Home</option>
                    <option value="away">Away</option>
                  </select>
                  <select name="opposition" onChange={this.onChange}>
                    <option value="all">All teams</option>
                    {teamsList}
                  </select>
                  <select name="season" onChange={this.onChange}>
                    <option value="all">All seasons</option>
                    {season_select}
                  </select>
                </form>
                <Warning>
                  <p>No results found. Please try making another selection.</p>
                </Warning>
              </div>
            </React.Fragment>
          )
        }
        
    }
}

export default Results;