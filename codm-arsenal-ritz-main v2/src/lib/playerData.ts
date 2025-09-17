export interface PlayerStats {
  name: string;
  wins: number;
  kills: number;
  kdRatio: number;
  killstreak: number;
  level: number;
  losses: number;
  prestige: number;
  hits: number;
  timePlayed: number;
  headshots: number;
  averageTime: number;
  gamesPlayed: number;
  assists: number;
  misses: number;
  xp: number;
  scorePerMinute: number;
  shots: number;
  deaths: number;
}

export const parsePlayerCSV = (csvText: string): PlayerStats[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const player: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      if (header === 'name') {
        player[header] = value;
      } else {
        player[header] = parseFloat(value) || 0;
      }
    });
    
    return player as PlayerStats;
  });
};

export const fetchPlayerData = async (): Promise<PlayerStats[]> => {
  try {
    const response = await fetch('/data/players.csv');
    const csvText = await response.text();
    return parsePlayerCSV(csvText);
  } catch (error) {
    console.error('Failed to fetch player data:', error);
    return [];
  }
};

export const playerColumns = [
  { key: 'name', label: 'Player Name', type: 'string' },
  { key: 'wins', label: 'Wins', type: 'number' },
  { key: 'kills', label: 'Kills', type: 'number' },
  { key: 'kdRatio', label: 'K/D Ratio', type: 'number' },
  { key: 'killstreak', label: 'Kill Streak', type: 'number' },
  { key: 'level', label: 'Level', type: 'number' },
  { key: 'losses', label: 'Losses', type: 'number' },
  { key: 'prestige', label: 'Prestige', type: 'number' },
  { key: 'hits', label: 'Hits', type: 'number' },
  { key: 'timePlayed', label: 'Time Played', type: 'number' },
  { key: 'headshots', label: 'Headshots', type: 'number' },
  { key: 'averageTime', label: 'Avg Time', type: 'number' },
  { key: 'gamesPlayed', label: 'Games', type: 'number' },
  { key: 'assists', label: 'Assists', type: 'number' },
  { key: 'misses', label: 'Misses', type: 'number' },
  { key: 'xp', label: 'XP', type: 'number' },
  { key: 'scorePerMinute', label: 'SPM', type: 'number' },
  { key: 'shots', label: 'Shots', type: 'number' },
  { key: 'deaths', label: 'Deaths', type: 'number' }
] as const;