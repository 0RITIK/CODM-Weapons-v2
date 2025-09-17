import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsChart } from "@/components/StatsChart";
import { getWeaponsByCategory, weaponCategories, categoryIcons } from "@/lib/weaponData";

const Stats = () => {
  const weaponsByCategory = getWeaponsByCategory();

  const statTypes = [
    { key: "Damage", label: "Damage", color: "#ef4444", icon: "💥" },
    { key: "Rate", label: "Fire Rate", color: "#f59e0b", icon: "🔥" },
    { key: "Accuracy", label: "Accuracy", color: "#3b82f6", icon: "🎯" },
    { key: "Mobility", label: "Mobility", color: "#10b981", icon: "⚡" },
    { key: "Range", label: "Range", color: "#8b5cf6", icon: "📏" },
    { key: "RPS", label: "RPS", color: "#f97316", icon: "⚡" }
  ];

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
                  Weapon Statistics
                </h1>
                <p className="text-sm text-muted-foreground">
                  Detailed performance analysis across all categories
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-accent">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">Analytics Dashboard</span>
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
            Performance Analytics
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive weapon statistics and performance metrics across all CODM categories. 
            Compare damage output, fire rates, accuracy, and more.
          </p>
        </motion.div>

        {/* Category Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {Object.entries(weaponCategories).map(([key, name]) => {
            const weapons = weaponsByCategory[key] || [];
            const avgDamage = weapons.reduce((sum, w) => sum + w.Damage, 0) / weapons.length || 0;
            
            return (
              <Card key={key} className="card-gaming">
                <CardHeader className="text-center pb-2">
                  <div className="text-3xl mb-2">
                    {categoryIcons[key as keyof typeof categoryIcons]}
                  </div>
                  <CardTitle className="text-lg text-neon-secondary">{name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {weapons.length}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">Weapons</div>
                  <div className="text-sm text-accent font-medium">
                    Avg DMG: {avgDamage.toFixed(0)}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Stats Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs defaultValue="Damage" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-card/50 p-1">
              {statTypes.map((stat) => (
                <TabsTrigger
                  key={stat.key}
                  value={stat.key}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
                >
                  <span className="mr-2">{stat.icon}</span>
                  <span className="hidden sm:inline">{stat.label}</span>
                  <span className="sm:hidden">{stat.key}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {statTypes.map((stat) => (
              <TabsContent key={stat.key} value={stat.key} className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-neon-primary mb-2">
                    {stat.icon} {stat.label} Analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Compare {stat.label.toLowerCase()} performance across all weapon categories
                  </p>
                </div>

                <div className="grid gap-8">
                  {Object.entries(weaponCategories).map(([categoryKey, categoryName]) => {
                    const weapons = weaponsByCategory[categoryKey] || [];
                    if (weapons.length === 0) return null;

                    return (
                      <Card key={`${stat.key}-${categoryKey}`} className="card-gaming">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-3">
                            <span className="text-2xl">
                              {categoryIcons[categoryKey as keyof typeof categoryIcons]}
                            </span>
                            <span className="text-neon-secondary">{categoryName}</span>
                            <span className="text-sm text-muted-foreground">
                              ({weapons.length} weapons)
                            </span>
                          </CardTitle>
                          <CardDescription>
                            {stat.label} comparison for all {categoryName.toLowerCase()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <StatsChart
                            weapons={weapons}
                            statKey={stat.key as keyof typeof weapons[0]}
                            color={stat.color}
                            statLabel={stat.label}
                          />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Back to Arsenal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link to="/">
            <Button size="lg" className="btn-primary px-8 py-4">
              🔫 Back to Arsenal
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;