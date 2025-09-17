import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Star, Target, Award, TrendingUp, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayerReview, parseCSV, getPlayerRating, getPlayerTier, getPlayerPerformanceStats } from "@/lib/reviewsData";

const Reviews = () => {
  const [players, setPlayers] = useState<PlayerReview[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerReview[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const response = await fetch('/data/reviews.csv');
        const csvText = await response.text();
        const parsedPlayers = parseCSV(csvText);
        
        // Sort by rating
        const sortedPlayers = parsedPlayers
          .filter(p => p.gamesPlayed > 0)
          .sort((a, b) => getPlayerRating(b) - getPlayerRating(a))
          .slice(0, 50); // Show top 50 players
        
        setPlayers(sortedPlayers);
        setFilteredPlayers(sortedPlayers);
      } catch (error) {
        console.error('Error loading player data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  useEffect(() => {
    let filtered = players;

    if (searchTerm) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (tierFilter !== "all") {
      filtered = filtered.filter(player =>
        getPlayerTier(getPlayerRating(player)).toLowerCase() === tierFilter
      );
    }

    setFilteredPlayers(filtered);
  }, [searchTerm, tierFilter, players]);

  const stats = getPlayerPerformanceStats(players);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black';
      case 'Master': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'Pro': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'Elite': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-4xl mb-4">🎮</div>
          <p className="text-muted-foreground">Loading player reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="hover:bg-muted/50">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-neon-primary">
                  Player Reviews
                </h1>
                <p className="text-sm text-muted-foreground">
                  Elite player performance analysis and rankings
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-accent">
              <Trophy className="h-5 w-5" />
              <span className="font-medium">Hall of Fame</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Elite Player Reviews
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive analysis of top CODM players based on performance metrics, 
            kill/death ratios, and overall battlefield dominance.
          </p>
        </motion.div>

        {/* Performance Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <Card className="card-gaming">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Players</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-primary">{stats.totalPlayers}</div>
              <p className="text-xs text-muted-foreground">Elite warriors analyzed</p>
            </CardContent>
          </Card>

          <Card className="card-gaming">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average K/D</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-secondary">{stats.avgKD}</div>
              <p className="text-xs text-muted-foreground">Community average</p>
            </CardContent>
          </Card>

          <Card className="card-gaming">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Eliminations</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-accent">{(stats.totalKills || 0).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Combined kills</p>
            </CardContent>
          </Card>

          <Card className="card-gaming">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-primary truncate">
                {stats.topPerformer ? stats.topPerformer.name.split('#')[0] : 'No Data'}
              </div>
              <p className="text-xs text-muted-foreground">
                Rating: {stats.topPerformer ? Math.round(getPlayerRating(stats.topPerformer)) : 0}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex-1">
            <Input
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-card/50 border-border/50"
            />
          </div>
          <Select value={tierFilter} onValueChange={setTierFilter}>
            <SelectTrigger className="w-full md:w-[180px] bg-card/50 border-border/50">
              <SelectValue placeholder="Filter by tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="legendary">Legendary</SelectItem>
              <SelectItem value="master">Master</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="elite">Elite</SelectItem>
              <SelectItem value="rookie">Rookie</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Player Reviews Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid gap-6"
        >
          {filteredPlayers.map((player, index) => {
            const rating = getPlayerRating(player);
            const tier = getPlayerTier(rating);
            const accuracy = player.shots > 0 ? (player.hits / player.shots * 100) : 0;

            return (
              <Card key={player.name} className="card-gaming hover:scale-[1.02] transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                        <div>
                          <CardTitle className="text-lg text-neon-primary">
                            {player.name.split('#')[0]}
                          </CardTitle>
                          <CardDescription className="text-xs text-muted-foreground">
                            {player.name.includes('#') ? `#${player.name.split('#')[1]}` : ''}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getTierColor(tier)} font-bold px-3 py-1`}>
                      {tier}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-primary">{Math.round(rating)}</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">{(player.kdRatio || 0).toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">K/D Ratio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">{player.level || 0}</div>
                      <div className="text-xs text-muted-foreground">Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-secondary">{player.wins || 0}</div>
                      <div className="text-xs text-muted-foreground">Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{accuracy.toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-accent">{(player.scorePerMinute || 0).toFixed(0)}</div>
                      <div className="text-xs text-muted-foreground">SPM</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/20">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Kills: <span className="text-primary font-medium">{(player.kills || 0).toLocaleString()}</span></span>
                      <span>Deaths: <span className="text-secondary font-medium">{(player.deaths || 0).toLocaleString()}</span></span>
                      <span>Games: <span className="text-accent font-medium">{(player.gamesPlayed || 0).toLocaleString()}</span></span>
                      <span>Headshots: <span className="text-neon-primary font-medium">{(player.headshots || 0).toLocaleString()}</span></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Players Found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Back to Arsenal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link to="/">
            <Button size="lg" className="btn-primary px-8 py-4">
              🏠 Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews;