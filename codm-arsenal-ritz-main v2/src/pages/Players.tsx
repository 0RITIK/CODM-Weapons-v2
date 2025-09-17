import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronUp, ChevronDown, Users, Trophy, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PlayerStats, fetchPlayerData, playerColumns } from "@/lib/playerData";

type SortConfig = {
  key: keyof PlayerStats;
  direction: 'asc' | 'desc';
};

const Players = () => {
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'kills', direction: 'desc' });

  useEffect(() => {
    const loadPlayerData = async () => {
      setLoading(true);
      const data = await fetchPlayerData();
      setPlayers(data);
      setLoading(false);
    };
    loadPlayerData();
  }, []);

  const filteredAndSortedPlayers = useMemo(() => {
    let filtered = players.filter(player =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortConfig.direction === 'asc' 
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });

    return filtered;
  }, [players, searchTerm, sortConfig]);

  const handleSort = (key: keyof PlayerStats) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (columnKey: keyof PlayerStats) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronUp className="h-4 w-4 opacity-30" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-primary" />
      : <ChevronDown className="h-4 w-4 text-primary" />;
  };

  const formatValue = (value: any, type: string) => {
    if (type === 'string') return value;
    if (type === 'number') {
      if (typeof value === 'number') {
        return value % 1 === 0 ? value.toString() : value.toFixed(2);
      }
    }
    return value?.toString() || '0';
  };

  const topPlayers = useMemo(() => {
    const sorted = [...players].sort((a, b) => b.kills - a.kills);
    return {
      topKiller: sorted[0],
      topKD: [...players].sort((a, b) => b.kdRatio - a.kdRatio)[0],
      topLevel: [...players].sort((a, b) => b.level - a.level)[0]
    };
  }, [players]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-4xl mb-4">🎮</div>
          <div className="text-xl text-muted-foreground">Loading player stats...</div>
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
                  Player Statistics
                </h1>
                <p className="text-sm text-muted-foreground">
                  CODM community leaderboard and player analytics
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-accent">
              <Users className="h-5 w-5" />
              <span className="font-medium">{players.length} Players</span>
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
            Player Leaderboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive player statistics and rankings from the CODM community. 
            Sort by any metric to find top performers.
          </p>
        </motion.div>

        {/* Top Players Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="card-gaming">
            <CardHeader className="text-center pb-2">
              <div className="text-3xl mb-2">🏆</div>
              <CardTitle className="text-lg text-neon-primary">Top Killer</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-xl font-bold text-primary mb-1">
                {topPlayers.topKiller?.name?.split('#')[0] || 'N/A'}
              </div>
              <div className="text-lg text-accent font-medium">
                {topPlayers.topKiller?.kills || 0} Kills
              </div>
            </CardContent>
          </Card>

          <Card className="card-gaming">
            <CardHeader className="text-center pb-2">
              <div className="text-3xl mb-2">🎯</div>
              <CardTitle className="text-lg text-neon-secondary">Best K/D</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-xl font-bold text-primary mb-1">
                {topPlayers.topKD?.name?.split('#')[0] || 'N/A'}
              </div>
              <div className="text-lg text-accent font-medium">
                {topPlayers.topKD?.kdRatio?.toFixed(2) || 0} K/D
              </div>
            </CardContent>
          </Card>

          <Card className="card-gaming">
            <CardHeader className="text-center pb-2">
              <div className="text-3xl mb-2">⭐</div>
              <CardTitle className="text-lg text-neon-accent">Highest Level</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-xl font-bold text-primary mb-1">
                {topPlayers.topLevel?.name?.split('#')[0] || 'N/A'}
              </div>
              <div className="text-lg text-accent font-medium">
                Level {topPlayers.topLevel?.level || 0}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Input
            placeholder="🔍 Search players by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md mx-auto"
          />
        </motion.div>

        {/* Players Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="card-gaming">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-neon-primary" />
                <span>Player Statistics</span>
                <span className="text-sm text-muted-foreground">
                  ({filteredAndSortedPlayers.length} shown)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {playerColumns.map((column) => (
                        <TableHead
                          key={column.key}
                          className="cursor-pointer hover:bg-muted/50 select-none"
                          onClick={() => handleSort(column.key as keyof PlayerStats)}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{column.label}</span>
                            {getSortIcon(column.key as keyof PlayerStats)}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedPlayers.slice(0, 100).map((player, index) => (
                      <TableRow
                        key={player.name}
                        className="hover:bg-muted/20 transition-colors"
                      >
                        {playerColumns.map((column) => (
                          <TableCell
                            key={`${player.name}-${column.key}`}
                            className={column.key === 'name' ? 'font-medium' : 'text-center'}
                          >
                            {column.key === 'name' 
                              ? player.name.split('#')[0]
                              : formatValue(player[column.key as keyof PlayerStats], column.type)
                            }
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {filteredAndSortedPlayers.length > 100 && (
                <div className="text-center mt-4 text-muted-foreground">
                  Showing top 100 results. Use search to narrow down.
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
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

export default Players;