import React, {Component} from 'react';

import CompetitionOptions from '../../../components/form/options/competition';
import Input from '../../../components/form/ui/input/input';
import RoundOptions from '../../../components/form/options/round';
import SeasonOptions from '../../../components/form/options/season';
import Select from '../../../components/form/ui/select/select';
import auth from '../../../config/auth';
import {filterArrayofObjects} from '../../../util';

class Form extends Component {

    constructor(props) {
		super(props);
		this.state = {
            data: '',
            playersData: '',
            snippetsData: '',
            season: '2020-21',
            homeTeam: '',
            awayTeam: '',
            homeGoals: '',
            awayGoals: '',
            competition: 'League',
            formSubmitted: false,
            substitutedCounter: 0
        }
    }


    // Event handlers
    seasonChange = e => this.setState({ 
        season: e.target.value 
    });

    homeTeamSelect = e => this.setState({
        homeTeam: e.target.value 
    })

    awayTeamSelect = e => this.setState({
        awayTeam: e.target.value 
    })

    homeTeamGoals = e => this.setState({
        homeGoals: e.target.value 
    })

    awayTeamsGoals = e => this.setState({
        awayGoals: e.target.value 
    })

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        fetch('add-result-complete', {
            method: 'POST',
            body: data,
        });
    }

    // If own goal, enable relavant text input
    ownGoalHandler = e => {
        let goalNumber = e.target.value;
        goalNumber = goalNumber.substr(goalNumber.length - 1);
        let ownGoalTextInput = document.getElementById(`scorer-${goalNumber}-own-goal-name`);
        let daggersGoalscorerSelect = document.getElementById(`match_scorers.s_drfc_goal_${goalNumber}_scorer`)
        if (ownGoalTextInput.hasAttribute('disabled')) {
            ownGoalTextInput.removeAttribute('disabled');
            daggersGoalscorerSelect.setAttribute('disabled', true);
        } else {
            ownGoalTextInput.setAttribute('disabled', true);
            daggersGoalscorerSelect.removeAttribute('disabled');
        }
    }

    // Player substituted handler
    playerSubstitutedHandler = e => {
        let playerSubbedCheckboxes = document.querySelectorAll('.player__substituted__select');
        let playerSubstitutedMinute = document.getElementById(`${e.target.value}-minute`);
        if (playerSubstitutedMinute.classList.contains(`visibility`, `visibility--hidden`)) {
            this.setState({
                substitutedCounter: this.state.substitutedCounter + 1
            });
            playerSubstitutedMinute.classList.remove(`visibility`, `visibility--hidden`);
            
        } else {
            playerSubstitutedMinute.classList.add(`visibility`, `visibility--hidden`);
            this.setState({
                substitutedCounter: this.state.substitutedCounter - 1
            });
        }

        // Check for max 3 subs - come back to later
        // console.log(this.state.substitutedCounter)
        // if (this.state.substitutedCounter >= 2) {
        //     for (const p of playerSubbedCheckboxes) {
        //         if (p.checked === false ) {
        //             p.setAttribute('disabled','')
        //         }
        //     }
        // } else {
        //     for (const p of playerSubbedCheckboxes) {
        //         p.removeAttribute('disabled')
        //     }
        // }
        
    }

    // If cup competition selected, enable Round select
    competitionHandler = e => {
        let competition = e.target.value;
        this.setState({competition: competition})
        
        let roundSelect = document.getElementById(`round-select`);
        if (competition === 'League') {
            roundSelect.setAttribute('disabled', true);
        } else {
            roundSelect.removeAttribute('disabled');
        }
    }

    componentDidMount() {
        fetch(`/teams`)
            .then(response => response.json())
            .then(data => this.setState({data}));
        fetch(`/players`)
            .then(response => response.json())
            .then(playersData => this.setState({playersData}));
        fetch(`/snippets`)
            .then(response => response.json())
            .then(snippetsData => this.setState({snippetsData}));

        let roundSelect = document.getElementById(`round-select`);
        if (this.state.competition !== 'League') {
            if (roundSelect.hasAttribute('disabled')) {
                roundSelect.removeAttribute('disabled');
            } else {
                roundSelect.setAttribute('disabled', true);
            }
        }   
    }

    render() {

        if (sessionStorage.loggedIn === 'true') {

            // Update players list based on season select
            let players = this.state.playersData.players;
            let filteredPlayers;
            if (players) {
                let a = this.state.season;
                filteredPlayers = players.filter(function(result) {
                    return (
                        result[a] === 'Y'
                    )
                })
            }        
        
            let teams = this.state.data.results;
            let teamsArray = [];

            if (teams) {
                for (const t of teams) {
                    teamsArray.push(t)
                }
            }

            // Build teams select options
            let teamsList = teamsArray.map(t => {
                return <option 
                            key={t.team_id} 
                            value={t.team_name}
                            name={t.team_name}
                        >
                            {t.team_name}
                        </option>
            });

            // Build opponent step select options
            let stepOpponent = [];
            for (let i = 1; i <= 9; i++) {
                stepOpponent.push(
                    <option 
                        key={`step-opponent-${i}`} 
                        value={i}
                        name={`step-opponent-${i}`}
                    >
                        {i}
                    </option>
                )
            }

            // Build players select options
            let playersArray = [];
            if (filteredPlayers) {
                for (const p of filteredPlayers) {
                    playersArray.push(p)
                }
            }
            let playersList = playersArray.map(p => {
                return <option 
                            key={p.player_id} 
                            value={p.player_id}
                            name={p.player_id}
                        >
                            {p.surname}, {p.first_name}
                        </option>
            })

            // Build regular time options
            let regularMinuteSelect = [];
            for (let i = 1; i <= 120; i++) {
                regularMinuteSelect.push(
                    <option 
                        key={`regular-minute-${i}`} 
                        value={i}
                        name={`regular-minute-${i}`}
                    >
                        {i}
                    </option>
                )
            }

            // Build injury time options
            let injuryTimeMinuteSelect = [];
            for (let i = 1; i <= 20; i++) {
                injuryTimeMinuteSelect.push(
                    <option 
                        key={`injury-time-minute-${i}`} 
                        value={i}
                        name={`injury-time-minute-${i}`}
                    >
                        {i}
                    </option>
                )
            }  

            // Build starting player select options
            let playerStartSelect = []
            let playerStartSubstituted = [];
            for (let i = 1; i <= 11; i++) {
                playerStartSelect.push(
                    <React.Fragment>
                        <div className={`flex-wrapper`}>
                            <Select
                                key={`playerStart${i}`}
                                selectName={`results.player_${i}`}
                                labelText={`Player ${i}`}
                            >
                                <option value='' selected disabled hidden>{`Player ${i}`}</option>
                                {playersList}
                            </Select>
                            <Input
                                className={`player__substituted__select display display--block margin margin--auto`}
                                inputType={`checkbox`} 
                                labelText={`Subbed?`} 
                                inputId={`player-${i}-subbed`} 
                                inputValue={`player-${i}-subbed`}
                                labelRequired
                                onChange={this.playerSubstitutedHandler.bind(this)} 
                            />
                            <Select
                                className={`visibility visibility--hidden`}
                                key={`player_${i}subbed_minute`}
                                selectId={`player-${i}-subbed-minute`}
                                selectName={`results.player_${i}_subbed_minute`}
                                >
                                <option value='' selected disabled hidden>{`Substituted minute`}</option>
                                {regularMinuteSelect}
                            </Select>
                        </div>
                    </React.Fragment>
                )                
            }

            // Build substitute player select options
            let playerSubSelect = []
            for (let i = 1; i <= 4; i++) {
                playerSubSelect.push(
                    <React.Fragment>
                        <div className='flex-wrapper'>
                            <Select
                                key={`playerSubMinute${i}`}
                                selectName={`results.sub_${i}`}
                                >
                                <option value='' selected disabled hidden>{`Substitute ${i} minute`}</option>
                                {playersList}
                            </Select>
                            <Select
                                key={`playerSub${i}`}
                                selectName={`results.sub_${i}_minute`}
                                >
                                <option value='' selected disabled hidden>{`Substitute ${i} minute`}</option>
                                {regularMinuteSelect}
                            </Select>
                        </div>
                    </React.Fragment>
                )                
            }   

            // Calculate Daggers' goals and limit number of goals to be inputted
            let daggersGoals = 0;
            let opponentGoals = 0;
            if (this.state.homeTeam === 'Dagenham & Redbridge') {
                daggersGoals = this.state.homeGoals;
                opponentGoals = this.state.awayGoals;
            } else if (this.state.awayTeam === 'Dagenham & Redbridge') {
                daggersGoals = this.state.awayGoals;
                opponentGoals = this.state.homeGoals;
            }

            let scorerSelect = []
            for (let i = 1; i <= daggersGoals; i++) {
                scorerSelect.push(
                    <div>
                        <h4>{`Goal ${i}`}</h4>
                        <Select 
                            selectId={`match_scorers.s_drfc_goal_${i}_scorer`} 
                            key={`scorer${i}`} 
                            selectName={`match_scorers.s_drfc_goal_${i}_scorer`}
                        >
                            <option value='' selected disabled hidden>{`Select player name`}</option>
                            {playersList}
                        </Select>
                        <Select key={`regular-minute-${i}`} selectName={`match_scorers.drfc_goal_${i}_minute`}>
                            <option value='' selected disabled hidden>{`Goal time (minute)`}</option>
                            {regularMinuteSelect}
                        </Select>
                        <Select key={`injury-time-minute-${i}`} selectName={`match_scorers.drfc_goal_${i}_minute_injury_time`}>
                            <option value='' selected disabled hidden>{`Injury time (if applicable)`}</option>
                            {injuryTimeMinuteSelect}
                        </Select>
                        <Input 
                            inputType={`checkbox`} 
                            labelRequired 
                            labelText={`Penalty`} 
                            inputId={`scorer-${i}-pen`} 
                            inputValue={`pen`}
                            inputName={`match_scorers.drfc_goal_${i}_pen`}
                        />
                        <Input 
                            inputType={`checkbox`} 
                            labelRequired 
                            labelText={`Own goal`} 
                            inputId={`scorer-${i}-own-goal`} 
                            inputValue={`ownGoal${i}`}
                            onChange={this.ownGoalHandler.bind(this)} 
                        />
                        <Input 
                            inputType={`text`} 
                            inputDisabled 
                            placeholderText={`Opponent name`} 
                            inputId={`scorer-${i}-own-goal-name`} 
                            inputName={`match_scorers.s_drfc_goal_${i}_scorer`}
                        />
                    </div>
                )
            }

            let opponentScorers = [];
            for (let i = 1; i <= opponentGoals; i++) {
                opponentScorers.push(
                    <div>
                        <h4>{`Opponent goal ${i}`}</h4>
                        <Input 
                            type={`text`}
                            selectId={`match_scorers.opponent_goal_${i}_scorer`} 
                            key={`opponentGoal-${i}`} 
                            inputName={`match_scorers.opponent_goal_${i}_scorer`}
                        >
                        </Input>
                        <Select key={`regular-minute-${i}`} selectName={`match_scorers.opponent_goal_${i}_minute`}>
                            <option value='' selected disabled hidden>{`Goal time (minute)`}</option>
                            {regularMinuteSelect}
                        </Select>
                        <Select key={`injury-time-minute-${i}`} selectName={`match_scorers.opponent_goal_${i}_minute_injury_time`}>
                            <option value='' selected disabled hidden>{`Injury time (if applicable)`}</option>
                            {injuryTimeMinuteSelect}
                        </Select>
                        <Input 
                            inputType={`checkbox`} 
                            labelRequired 
                            labelText={`Penalty`} 
                            inputId={`opponent_goal-${i}-pen`} 
                            inputValue={`pen`}
                            inputName={`match_scorers.opponent_goal_${i}_pen`}
                        />
                    </div>
                )
            }

            // Opponents' goals
            let oppGoals = 0;
            if (this.state.homeTeam === 'Dagenham & Redbridge') {
                oppGoals = this.state.awayGoals;
            } else if (this.state.awayTeam === 'Dagenham & Redbridge') {
                oppGoals = this.state.homeGoals;
            }

            let oppScorers = 
                <Input 
                    inputType={`text`} 
                    placeholderText={`Opposition scorers`} 
                    inputId={`opposition-scorers`} 
                    inputName={`results.opp_scorers`}
                />


            let leaguePosition = [];
            for (let i = 1; i <= 24; i++) {
                leaguePosition.push(
                    <option 
                        key={`league-position-${i}`} 
                        value={i}
                        name={`league-position-${i}`}
                    >
                        {i}
                    </option>
                )
            }

            // Snippets
            let snippets = this.state.snippetsData.snippets;
            let attendanceSnippets = filterArrayofObjects(snippets, 'section', 'Attendances')
            // Build teams select options
            let attendanceSnippetsOptions;
            if (attendanceSnippets) {
                attendanceSnippetsOptions = attendanceSnippets.map(a => {
                    return <option 
                                key={a.id} 
                                value={a.id}
                                name={a.id}
                            >
                                {a.name}
                            </option>
                });
            }
            console.log(attendanceSnippets)
        
            return (
                <div className="add-result">
                    <h1>Add result</h1>   

                    <button 
                        onClick={() => {
                            auth.logout(() => {
                                this.props.history.push("/login");
                            })
                        }}
                    >
                        Logout
                    </button>
                    <form action="add-result-complete" method="POST">
                        <section class="match-details">
                            <h2>Match details</h2>
                            <div class="flex-wrapper">
                                <Input 
                                    labelRequired 
                                    labelText={`Match ID`} 
                                    inputName={`results.match_scorers.attendances.match_id`} 
                                />
                                <Input 
                                    labelRequired 
                                    inputType={`date`} 
                                    labelText={`Date`} 
                                    inputName={`results.date`} 
                                />
                                <Select 
                                    labelRequired 
                                    labelText={`Season`} 
                                    selectName={`results.season`} 
                                    onChange={this.seasonChange.bind(this)}
                                >
                                    <SeasonOptions />
                                </Select>
                            </div>
                            <div class="flex-wrapper">
                                <Select 
                                    selectId={`competition-select`}
                                    labelText={`Competition`} 
                                    selectName={`results.competition`}
                                    onChange={this.competitionHandler.bind(this)} 
                                >
                                    <CompetitionOptions />
                                </Select>
                                <Select 
                                    selectId={`round-select`}
                                    labelText={`Round`} 
                                    selectName={`results.round`} 
                                    labelRequired
                                    selectDisabled
                                >
                                    <RoundOptions />
                                </Select>
                                <Select 
                                    labelText={`Opponent (step in pyramid)`} 
                                    selectName={`results.step_opponent`} 
                                    labelRequired
                                >
                                    <option value="5" selected="selected">5</option>
                                    {stepOpponent}
                                </Select>
                            </div>

                            <div class="flex-wrapper match-details__team-goals">
                                <Select 
                                    labelText={`Home team`} 
                                    selectName={`results.team_home`} 
                                    onChange={this.homeTeamSelect.bind(this)}
                                >
                                    <option value="" selected disabled hidden>Home team</option>
                                    {teamsList} 
                                </Select>
                                <Input 
                                    labelText={`Home goals`} 
                                    inputName={`results.home_goals`} 
                                    value={this.state.value} 
                                    inputSize={`2`}
                                    inputMaxLength={`2`}
                                    onChange={(event) => this.setState({homeGoals: event.target.value})} 
                                />
                                <span>-</span>
                                <Input 
                                    labelText={`Away goals`} 
                                    inputName={`results.away_goals`} 
                                    inputSize={`2`}
                                    inputMaxLength={`2`}
                                    onChange={this.awayTeamsGoals.bind(this)} 
                                />

                                <Select 
                                    labelText={`Away team`} 
                                    selectName={`results.team_away`} 
                                    onChange={this.awayTeamSelect.bind(this)}
                                >
                                    <option value="" selected disabled hidden>Away team</option>
                                    {teamsList} 
                                </Select>
                            </div>
                        </section>

                        <section class="starts-subs">
                            <h2>Starts/subs</h2>
                            <div className="flex-wrapper">
                                <div class="starts-select">
                                    <h3>Starting XI</h3>
                                    {playerStartSelect}
                                </div>
                                <div className='player-start-substituted'>
                                    <h3>Substituted</h3>
                                    {playerStartSubstituted}
                                </div>
                            </div>
                            <div clas="subs-select">
                                <h3>Substitutes</h3>
                                {playerSubSelect}
                            </div>
                        </section>

                        {/* Conditionally render goalscorer fields */}
                        {daggersGoals > 0 ? <section><h2>Dag & Red goalscorers</h2>{scorerSelect}</section>: null}
                        {oppGoals > 0 ? <section><h2>Opponent goalscorers</h2>{opponentScorers}</section> : null}

                        <section class="additional-data">
                            <h2>Additional data</h2>
                            <Select 
                                labelText={`Man of the Match`} 
                                selectName={`results.motm`}
                            >
                                <option value="" selected disabled hidden>Man of the match</option>
                                {playersList} 
                            </Select>
                            <Input 
                                labelText={`Attendance`} 
                                inputName={`attendances.attendance_total`} 
                                labelRequired 
                            />
                            <Input 
                                labelText={`Attendance (away)`} 
                                inputName={`attendances.attendance_away`} 
                                labelRequired 
                            />
                            <Input
                                inputType={`checkbox`} 
                                labelText={`Exclude attendance from feeds?`} 
                                inputName={`attendances.attendance_calc_exclude`} 
                                inputValue={`1`}
                                labelRequired
                            />
                            <Select 
                                labelText={`Attendance note`} 
                                selectName={`attendances.attendance_note`}
                            >
                                <option value="" selected disabled hidden>Attendance note</option>
                                {attendanceSnippetsOptions} 
                            </Select>
                            <Select 
                                labelText={`League position`} 
                                selectName={`results.league_position`}
                            >
                                <option value="" selected disabled hidden>League position</option>
                                {leaguePosition} 
                            </Select>
                            <Select 
                                labelText={`Attended`} 
                                selectName={`results.attended`}
                            >
                                <option value="" selected disabled hidden>Attended</option>
                                <option value='Y' name='Y'>Yes</option>
                                <option value='N' name='N'>No</option>
                            </Select>
                            <Input 
                                labelText={`Referee`} 
                                inputName={`results.referee`} 
                                labelRequired 
                            />

                        </section>                    
                        
                        <button>Submit</button>
                    </form>
                </div>
            )
        } else {
            this.props.history.push('/login');
            return null;
        }
    }
}

export default Form;