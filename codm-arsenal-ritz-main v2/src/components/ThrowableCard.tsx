import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Throwable } from "@/lib/throwablesData";

interface ThrowableCardProps {
  throwable: Throwable;
  index: number;
}

export const ThrowableCard = ({ throwable, index }: ThrowableCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Lethal": return "bg-red-500/20 text-red-400 border-red-500/50";
      case "Tactical": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "Melee": return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <Card className="card-gaming overflow-hidden h-full">
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-muted/50 to-background/50 flex items-center justify-center overflow-hidden">
            <img
              src={throwable.image}
              alt={throwable.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <Badge 
            className={`absolute top-2 right-2 ${getTypeColor(throwable.type)}`}
          >
            {throwable.type}
          </Badge>
        </div>
        
        <CardContent className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-neon-primary mb-2">
              {throwable.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {throwable.description}
            </p>
          </div>

          <div className="space-y-3">
            {throwable.damage > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Damage</span>
                  <span className="text-neon-primary font-medium">{throwable.damage}</span>
                </div>
                <Progress value={throwable.damage} className="h-1.5" />
              </div>
            )}
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Range</span>
                <span className="text-neon-secondary font-medium">{throwable.range}m</span>
              </div>
              <Progress value={throwable.range * 10} className="h-1.5" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Cooldown</span>
                <span className="text-neon-accent font-medium">{throwable.cooldown}s</span>
              </div>
              <Progress value={100 - (throwable.cooldown * 2)} className="h-1.5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};