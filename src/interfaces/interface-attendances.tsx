export interface InterfaceAttendances {
    attendance: any
    competition: any
    date: any
    goals_away: any
    goals_home: any
    match_id: any
    season: any
    team_away: any
    team_home: any
}

export interface InterfaceAttendancesShort {
    rank: number,
    match_id: string,
    date: string,
    attendance: number,
    home_goals: number,
    away_goals: number,
    team_away: string
}