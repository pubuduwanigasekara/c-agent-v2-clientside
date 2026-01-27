export function validateTeams(team1: string, team2: string) {
  return team1 && team2 && team1 !== team2;
}

export function validatePlayers(players: string[]) {
  return players.length >= 11 && players.length <= 30;
}
