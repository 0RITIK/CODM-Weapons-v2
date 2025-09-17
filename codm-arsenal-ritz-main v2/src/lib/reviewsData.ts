export interface PlayerReview {
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

export const parseCSV = (csvText: string): PlayerReview[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const player: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      if (header === 'name') {
        player[header] = value || '';
      } else {
        // Ensure all numeric values are properly parsed and have fallbacks
        const numValue = parseFloat(value);
        player[header] = isNaN(numValue) ? 0 : numValue;
      }
    });
    
    return player as PlayerReview;
  }).filter(player => player.name && player.name !== '');
};

export const getPlayerRating = (player: PlayerReview): number => {
  const kdWeight = 0.3;
  const levelWeight = 0.2;
  const winsWeight = 0.25;
  const spmWeight = 0.15;
  const accuracyWeight = 0.1;
  
  const normalizedKD = Math.min(player.kdRatio / 3, 1);
  const normalizedLevel = Math.min(player.level / 100, 1);
  const normalizedWins = Math.min(player.wins / 1000, 1);
  const normalizedSPM = Math.min(player.scorePerMinute / 300, 1);
  const accuracy = player.shots > 0 ? player.hits / player.shots : 0;
  const normalizedAccuracy = Math.min(accuracy, 1);
  
  return (
    normalizedKD * kdWeight +
    normalizedLevel * levelWeight +
    normalizedWins * winsWeight +
    normalizedSPM * spmWeight +
    normalizedAccuracy * accuracyWeight
  ) * 100;
};

export const getPlayerTier = (rating: number): string => {
  if (rating >= 80) return 'Legendary';
  if (rating >= 65) return 'Master';
  if (rating >= 50) return 'Pro';
  if (rating >= 35) return 'Elite';
  return 'Rookie';
};

export const getPlayerPerformanceStats = (players: PlayerReview[]) => {
  const totalPlayers = players.length;
  
  // Handle empty array case
  if (totalPlayers === 0) {
    return {
      totalPlayers: 0,
      avgKD: 0,
      avgLevel: 0,
      totalKills: 0,
      totalGames: 0,
      topPerformer: null as PlayerReview | null
    };
  }
  
  const avgKD = players.reduce((sum, p) => sum + p.kdRatio, 0) / totalPlayers;
  const avgLevel = players.reduce((sum, p) => sum + p.level, 0) / totalPlayers;
  const totalKills = players.reduce((sum, p) => sum + p.kills, 0);
  const totalGames = players.reduce((sum, p) => sum + p.gamesPlayed, 0);
  
  return {
    totalPlayers,
    avgKD: Math.round(avgKD * 100) / 100,
    avgLevel: Math.round(avgLevel),
    totalKills,
    totalGames,
    topPerformer: players.reduce((best, current) => 
      getPlayerRating(current) > getPlayerRating(best) ? current : best
    )
  };
};