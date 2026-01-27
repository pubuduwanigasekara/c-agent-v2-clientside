export interface Team {
  team_id: number;
  name: string;
  rank: number;
  display_name: string;
}

export interface Player {
  Player_id: number;
  Full_Name: string;
  Playing_Role: string;
  Batting_Style: string;
  Bowling_Style: string;
}

export interface Ground {
  ground_id: number;
  name: string;
  display_name: string;
}

export interface AnalyzeRequest {
  your_team: string;
  opponent_team: string;
  date: string;
  time: string;
  location: string;
  timezone: string;
  your_team_players: string[];
  opponent_team_players: string[];
  session_id: string;
  client_id: string;
  user_id: string;
}

export interface ChatRequest {
  message: string;
  session_id?: string;
  client_id?: string;
  user_id?: string;
}
