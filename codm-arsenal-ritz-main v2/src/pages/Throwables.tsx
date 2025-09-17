import { motion } from "framer-motion";
import { ArrowLeft, Target, Zap, Bomb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThrowableCard } from "@/components/ThrowableCard";
import { throwablesData, getThrowablesByType } from "@/lib/throwablesData";

const Throwables = () => {
  const throwablesByType = getThrowablesByType();

  const typeIcons = {
    "Lethal": <Bomb className="h-5 w-5" />,
    "Tactical": <Target className="h-5 w-5" />,
    "Melee": <Zap className="h-5 w-5" />
  };

  const typeDescriptions = {
    "Lethal": "High-damage explosive devices designed to eliminate enemies",
    "Tactical": "Utility devices that provide strategic advantages and area control",
    "Melee": "Close-combat weapons that can be thrown for instant elimination"
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="hover:bg-muted/50">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-neon-primary">
                Throwables Arsenal
              </h1>
              <p className="text-sm text-muted-foreground">
                Tactical equipment and explosive ordnance
              </p>
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
            💣 THROWABLES
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master the art of tactical equipment deployment. From lethal explosives to tactical utilities, 
            every throwable can change the tide of battle.
          </p>
        </motion.div>

        {/* Type Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {Object.entries(throwablesByType).map(([type, items]) => (
            <Card key={type} className="card-gaming">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  {typeIcons[type as keyof typeof typeIcons]}
                </div>
                <CardTitle className="text-neon-secondary">{type}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {items.length}
                </div>
                <p className="text-sm text-muted-foreground">
                  {typeDescriptions[type as keyof typeof typeDescriptions]}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Throwables Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs defaultValue="Lethal" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-card/50 p-1">
              {Object.keys(throwablesByType).map((type) => (
                <TabsTrigger
                  key={type}
                  value={type}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
                >
                  <span className="mr-2">
                    {typeIcons[type as keyof typeof typeIcons]}
                  </span>
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(throwablesByType).map(([type, items]) => (
              <TabsContent key={type} value={type} className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-neon-primary mb-2">
                    {typeIcons[type as keyof typeof typeIcons]} {type} Equipment
                  </h3>
                  <p className="text-muted-foreground">
                    {typeDescriptions[type as keyof typeof typeDescriptions]}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((throwable, index) => (
                    <ThrowableCard
                      key={throwable.id}
                      throwable={throwable}
                      index={index}
                    />
                  ))}
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

export default Throwables;