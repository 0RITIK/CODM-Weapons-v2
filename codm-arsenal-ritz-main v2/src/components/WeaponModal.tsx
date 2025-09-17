import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { WeaponStats } from "@/lib/weaponData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ak47Image from "@/assets/weapons/ak47.jpg";
import msmcImage from "@/assets/weapons/msmc.jpg";
import dlq33Image from "@/assets/weapons/dlq33.jpg";
import rpdImage from "@/assets/weapons/rpd.jpg";
import by15Image from "@/assets/weapons/by15.jpg";
import j358Image from "@/assets/weapons/j358.jpg";
import ak117Image from "@/assets/weapons/ak117.jpg";
import type25Image from "@/assets/weapons/type25.jpg";

interface WeaponModalProps {
  weapon: WeaponStats | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WeaponModal = ({ weapon, isOpen, onClose }: WeaponModalProps) => {
  if (!weapon) return null;

  // Custom image URLs - Add your own image URLs here
  const customImageUrls: Record<string, string> = {
    // Example: 'ak47': 'https://your-image-url.com/ak47.jpg',
    // Example: 'msmc': 'https://your-image-url.com/msmc.jpg',
  };

  const getWeaponImage = (weaponName: string) => {
    const nameKey = weaponName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check for custom URL first
    if (customImageUrls[nameKey]) {
      return customImageUrls[nameKey];
    }
    
    // Fall back to local images
    const imageMap: Record<string, string> = {
      'ak47': ak47Image,
      'msmc': msmcImage,
      'dlq33': dlq33Image,
      'darealgamingq33': dlq33Image,
      'rpd': rpdImage,
      'by15': by15Image,
      'j358': j358Image,
      'j358revolver': j358Image,
      'ak117': ak117Image,
      'type25': type25Image,
      // Additional mappings
      'adm10': ak47Image,
      'bk57': ak47Image,
      'm16': ak47Image,
      'lk24': ak47Image,
      'm4': ak47Image,
      'chicom': msmcImage,
      'aks74u': msmcImage,
      'pdw57': msmcImage,
      'hg40': msmcImage,
      'artic50': dlq33Image,
      'article50': dlq33Image,
      'm21ebr': dlq33Image,
      'xpr50': dlq33Image,
      's36': rpdImage,
      'ul736': rpdImage,
      'm4lmg': rpdImage,
      'h2126': by15Image,
      'striker': by15Image,
      'h20405': by15Image,
      'dagger': j358Image,
      'mw11handgun': j358Image,
      'smrsrockets': j358Image,
      'fhj17rockets': j358Image,
      'fragsticky': j358Image,
      'tripmine': j358Image
    };
    return imageMap[nameKey] || ak47Image;
  };

  const allStats = [
    { label: "Damage", value: weapon.Damage, max: 100, color: "from-red-500 to-red-400" },
    { label: "Fire Rate", value: weapon.Rate, max: 100, color: "from-yellow-500 to-yellow-400" },
    { label: "Accuracy", value: weapon.Accuracy, max: 100, color: "from-blue-500 to-blue-400" },
    { label: "Mobility", value: weapon.Mobility, max: 100, color: "from-green-500 to-green-400" },
    { label: "Range", value: weapon.Range, max: 100, color: "from-purple-500 to-purple-400" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-card/95 backdrop-blur-md border border-border/50 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary/20 text-primary border border-primary/30">
                    {weapon.Category}
                  </Badge>
                  <Badge className="bg-accent/20 text-accent border border-accent/30">
                    {weapon.DPS} DPS
                  </Badge>
                </div>
                <h2 className="text-3xl font-bold text-neon-primary">
                  {weapon.Name}
                </h2>
                <p className="text-muted-foreground">
                  {weapon.Ammo} • {weapon.Mags} magazines • {weapon.Optics}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Weapon Image */}
            <motion.div 
              className="relative rounded-xl overflow-hidden mb-8 bg-muted/20"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={getWeaponImage(weapon.Name)}
                alt={weapon.Name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
            </motion.div>

            {/* Detailed Stats */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-neon-secondary mb-4">
                Weapon Statistics
              </h3>
              
              <div className="grid gap-4">
                {allStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">
                        {stat.label}
                      </span>
                      <span className="font-bold text-lg text-neon-primary">
                        {stat.value}/100
                      </span>
                    </div>
                    
                    <div className="h-3 bg-muted rounded-full overflow-hidden relative">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full relative overflow-hidden`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/30">
                 <div className="space-y-2">
                   <h4 className="font-semibold text-accent">Performance</h4>
                   <p className="text-sm text-muted-foreground">
                     RPS: <span className="text-foreground font-medium">{weapon.RPS}</span>
                   </p>
                 </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-secondary">Equipment</h4>
                  <p className="text-sm text-muted-foreground">
                    Optics: <span className="text-foreground font-medium">{weapon.Optics}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Magazines: <span className="text-foreground font-medium">{weapon.Mags}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};