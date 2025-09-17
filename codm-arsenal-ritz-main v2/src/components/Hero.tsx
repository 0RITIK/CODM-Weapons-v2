import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,69,0,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,191,255,0.2),transparent_50%)]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${40 + i * 5}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Main Title */}
          <motion.h1 
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            CODM
          </motion.h1>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-neon-primary pulse-neon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            WEAPONS HUB
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover the ultimate arsenal of Call of Duty Mobile weapons with detailed stats, 
            comparisons, and professional insights.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="btn-primary px-8 py-4 text-lg min-w-[200px]"
            >
              🔥 Explore Arsenal
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/reviews">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-4 text-lg min-w-[200px] border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-black"
                >
                  ⭐ Game Reviews
                </Button>
              </Link>
              
              <Link to="/players">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-4 text-lg min-w-[200px] border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  👥 Player Stats
                </Button>
              </Link>
              
              <Link to="/stats">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-4 text-lg min-w-[200px] border-secondary/50 text-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
                  📊 View Stats
                </Button>
              </Link>
              
              <Link to="/throwables">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-4 text-lg min-w-[200px] border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  💣 Throwables
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Weapon Categories Preview */}
          <motion.div 
            className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {[
              { name: "Assault Rifles", icon: "🔥", count: 8 },
              { name: "SMGs", icon: "⚡", count: 5 },
              { name: "Snipers", icon: "🎯", count: 6 },
              { name: "LMGs", icon: "💪", count: 4 },
              { name: "Shotguns", icon: "💥", count: 4 },
              { name: "Pistols", icon: "🗡️", count: 7 }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                className="card-gaming text-center p-4 hover:scale-105"
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium text-neon-secondary">{category.count}</div>
                <div className="text-xs text-muted-foreground">{category.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};