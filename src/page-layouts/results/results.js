import React, {Component} from 'react';

import Banner from '../../components/banner/banner';
import BannerImg from '../../images/banner/football-field-alfredo-camacho.jpg';
import Result from '../../components/result/result';
import CompetitionOptions from '../../components/form/options/competition';
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
      const queryString = window.location.search;
      const URLParams = new URLSearchParams(queryString);
      super(props);
        this.state = {
          data: '',
          teamsData: '',
          dataLoaded: false,
          params: {
            competition: URLParams.get('competition'),
            location: URLParams.get('location'),
            season: URLParams.get('season'),
            opposition: URLParams.get('opposition')
          }
        };
      }
        
    // Generic onChange handler => updates state
    onChange = e => {
      const {name, value} = e.target;
      let params = {...this.state.params, [name] : value.toLowerCase()}
      this.setState({params});
    };

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

      // If URL has query parameter on load, target relevant option elment and add selected attribute
      for (const param in this.state.params) {

        let id = this.state.params[param],
          targetSelect = document.getElementById(param),
          targetOption;

        if (id) {
          if (param === 'season') {
            id = `season-${id}`
          }
        }
        id ? id = id.replace(/ /g, '-') : null;

        targetSelect ? targetOption = targetSelect.querySelector(`[id=${id}]`) : null;
        targetOption ? targetOption.setAttribute('selected', true) : null;
      }

        // For scoping, define variables needed in template
        let results = this.state.data.results,
          results_template,
          teamsList,
          filteredResults,
          team_home,
          team_away,
          season,
          location,
          opposition,
          competition,
          filters,
          paramsUrl = [],
          url = new URL(window.location.href),
          banner = <Banner
            name='Matches'
            description='Results and match information'
            image={BannerImg}
            // Banner image: Photo by <a href="/photographer/alfcb-46394">Alfredo Camacho</a> from <a href="https://freeimages.com/">FreeImages</a>
          />;

          // Build URL params          
          [this.state.params].map(function (param) {
            param.location ? paramsUrl.push(`location=${param.location}`) : null;
            param.competition ? paramsUrl.push(`competition=${param.competition.replace(/ /g, '+').toLowerCase()}`) : null;
            param.opposition ? paramsUrl.push(`opposition=${param.opposition.replace(/ /g, '+').toLowerCase()}`) : null;
            param.season ? paramsUrl.push(`season=${param.season}`) : null;
          });

          paramsUrl = paramsUrl.join('&');
          paramsUrl.length > 0 ? window.history.pushState(null, null, 'matches?' + paramsUrl) : null;

          this.state.params.location ? location = this.state.params.location : location = 'all';
          this.state.params.competition ? competition = this.state.params.competition : competition = 'all';
          this.state.params.opposition ? opposition = this.state.params.opposition : opposition = 'all';
          this.state.params.season ? season = this.state.params.season : season = 'all';

        if (results) {

            // Assign variables to variables (will be used to filter data)
            location === 'home' ? team_home = 'Dagenham & Redbridge'
              : location === 'away' ? team_away = 'Dagenham & Redbridge'
              : team_home = ('Dagenham & Redbridge', team_away = 'Dagenham & Redbridge');

            // No query parameters, load all results for current season
            const aqueryString = window.location.search;
            const aURLParams = new URLSearchParams(aqueryString);
            aURLParams.get('season') ? season = aURLParams.get('season') : season = '2022-23';
      
            // Filter results object based on variables set from state 
            filteredResults = results.filter(function(result) {
              return (
                (result.team_home === team_home || result.team_away === team_away) &&
                (season !== 'all' ? result.season === season : result.season) &&
                (opposition === 'all' 
                  ? (result.team_home === 'Dagenham & Redbridge' 
                    || result.team_away === 'Dagenham & Redbridge') 
                  : (result.team_away.toLowerCase() === opposition 
                    || result.team_home.toLowerCase() === opposition)
                ) &&
                (competition !== 'all' ? result.competition.toLowerCase() === competition : result.competition.toLowerCase())
              )
            });   
            
            let oppositionOptions = document.querySelectorAll('#opposition option');
            for (const option of oppositionOptions) {
              option.value === opposition ? option.setAttribute('selected', 'selected') : null;
            }

            if (filteredResults.length > 0) {
              results_template = filteredResults.map(result => {      
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
                id={t.team_id}
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
            
            let seasonsArr = [];
            results.map(result => { 
              seasonsArr.push(result.season);
            })
            seasonsArr = [...new Set(seasonsArr)];
          }
        filteredResults = [...new Set(filteredResults)];

        filters = <form 
          className='matches__filter background-gray2'
        >
      <h2>Filter matches</h2>
			<div className='wrapper--matches__filter__select'>
				<div className='matches__filter__select'>
					<Select 
						labelRequired 
						selectId={`location`}
						labelText={`Location`} 
						selectName={`location`} 
						onChange={this.onChange}
					>
						<option id="all" value="all" selected>Home and away</option>
						<option id="home" value="home">Home</option>
						<option id="away" value="away">Away</option>
					</Select>
				</div>
				<div className='matches__filter__select'>
					<Select 
						labelRequired
						selectId={`opposition`}
						labelText={`Opposition`} 
						selectName={`opposition`} 
						onChange={this.onChange}
            selected={opposition}
					>
						<option value="all">All teams</option>
						{teamsList}
					</Select>
				</div>
				<div className='matches__filter__select'>
					<Select 
						labelRequired
						selectId={`season`}
						labelText={`Season`} 
						selectName={`season`} 
						onChange={this.onChange}
					>
						<SeasonOptions season={season} />
					</Select>
				</div>
				<div className='matches__filter__select'>
					<Select 
						labelRequired
						selectId={`competition`}
						labelText={`Competition`} 
						selectName={`competition`} 
						onChange={this.onChange}
					>
						<option value="" selected disabled hidden>Select competition</option>
						<CompetitionOptions />
					</Select>
				</div>
			</div>
        </form>;

        if (filteredResults.length > 0) {
          	return (
            	<>
              		{banner}
					<div className='wrapper--content__inpage'>
						{filters}
						<Table>
						<thead data-content-align='left'>
							<tr>
								<th data-display-hidden='mobile'><span>Date</span></th>
								<th data-display-hidden='mobile' colSpan={4}><span>Competition</span></th>
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
			</>
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
                {filters}
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