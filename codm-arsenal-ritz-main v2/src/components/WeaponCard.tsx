import { motion } from "framer-motion";
import { useState } from "react";
import { WeaponStats } from "@/lib/weaponData";
import { Badge } from "@/components/ui/badge";
import ak47Image from "@/assets/weapons/ak47.jpg";
import msmcImage from "@/assets/weapons/msmc.jpg";
import dlq33Image from "@/assets/weapons/dlq33.jpg";
import rpdImage from "@/assets/weapons/rpd.jpg";
import by15Image from "@/assets/weapons/by15.jpg";
import j358Image from "@/assets/weapons/j358.jpg";
import ak117Image from "@/assets/weapons/ak117.jpg";
import type25Image from "@/assets/weapons/type25.jpg";

interface WeaponCardProps {
  weapon: WeaponStats;
  index: number;
  onClick: () => void;
}

export const WeaponCard = ({ weapon, index, onClick }: WeaponCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Custom image URLs - Add your own image URLs here
  const customImageUrls = {
  "ak47": "https://blix.gg/wp-content/uploads/2024/10/a94b57735f5e5ced.jpeg",
  "m4": "https://zilliongamer.com/uploads/codm/best-gunsmith-loadout-attachments/m4/m4-all-rounder-gunsmith-loadout-cod-mobile.jpg",
  "type25": "https://zilliongamer.com/uploads/codm/best-gunsmith-loadout-attachments/type-25/type-25-aggressive-gunsmith-loadout-cod-mobile.jpg",
  "ak117": "https://zilliongamer.com/uploads/codm/skins/assault/ak117/ak117-drip-cod-mobile.jpg",
  "bk57": "https://zilliongamer.com/uploads/codm/skins/assault/bk57/bk57-wasteland-cod-mobile.jpg",
  "lk24": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMc4FFpy9GJzbxQ5IDJ7jTy4DYzftGI352Zg&s",
  "m16": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-t0S9XKCRB9qVVkpLGxc3zpnHSDLNhq3ykg&s",
  "adm10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbH-XzGqptezRa1bBoJZ-714SlUc-Qyg1wNg&s",
  "msmc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwwsrl1Dtou1Srj7eoZmJpStV_Mxs5Cr6l3Q&s",
  "aks74u": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4xtNAJNjuvsYjsQKRcvkGGdWzVX3nBZz3dg&s",
  "pdw57": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7rgW6Rc0hp49uLdNvbmrf9fptj16tFD36Iw&s",
  "chicom": "https://zilliongamer.com/uploads/call-of-duty-mobile/thumbnail/chicom.jpg",
  "hg40": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwAIlo0YngZAuTAZHuic1mFXb8El08DWZ5g&s",
  "rus79u": "https://zilliongamer.com/uploads/codm/best-gunsmith-loadout-attachments/rus-79u/rus-79u-aggressive-gunsmith-loadout-cod-mobile.jpg",
  "dlq33": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdixqq70LuAlooZAbdl76c_4K0c8x6kL4bWg&s",
  "arctic50": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD4lJ1YsT0H5LCT9MVW6uAH1tKbTxaoDglfg&s",
  "m21ebr": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJY_ZUk804rPVTuli4sNzkgUaEnO01u5tW7w&s",
  "xpr50": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1mgg3STt4kWlapZ4sV8-73VAtqlcErinGyQ&s",
  "outlaw": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrEdRvgwR7tAZm1v7JdAUhxVTfeN5UAb7cog&s",
  "locus": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHzTd99uJtlhtygvg9zJopR9kK7S4jQb8BRA&s",
  "by15": "https://zilliongamer.com/uploads/codm/skins/shotgun/by15/by15-rusted-cod-mobile.jpg",
  "hs2126": "https://i.redd.it/qb2eh4er0yr61.jpg",
  "striker": "https://i.redd.it/why-is-the-striker-considered-a-bad-gun-v0-7jedftq6b8nb1.jpg?width=1600&format=pjpg&auto=webp&s=d7d8f146bb5fbc08b410d5eecd290f49f3e10371",
  "hs0405": "https://i.redd.it/fuqu6fpqe9i61.png",
  "krm262": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRRqzzJa7s_Cqe8pt23w13bWpqe6zyPj9k6g&s",
  "echo": "https://zilliongamer.com/uploads/codm/weapons/sg/echo/echo-cod-mobile.jpg",
  "s36": "https://lh3.googleusercontent.com/aaZA7u_IutfqdImSuhNeHRAA9stttd4NfUYegcXDQJRuZxq07YjnLSoN1OUFldy61C5DBBPrJB6GjYU_oiP0UctMAK18ISLCWya4AdyU_rDI",
  "rpd": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9JU3taNA_5j9ttOAqqiqqUP-zhvCWYxav2g&s",
  "ul736": "https://pbs.twimg.com/media/GC_c2gKaAAAU2j1.jpg",
  "m4lmg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlmkUTsIasSE9Ry3vx-GAE8wkfzkjgX5r4FA&s",
  "chopper": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-vaNrKsWS01GxfxSzR6EJtgsLL6ahMEqOg&s",
  "holger26": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBAoxDLavxyNwhUr9i7uvIbKiXeyPCd9uyFg&s",
  "mw11": "https://i.redd.it/kiteysykn8c71.jpg",
  "j358": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUUsuMaxH7Ebo7Xwej-9o2eGq6bGOG6NXTnA&s",
  "50gs": "https://zilliongamer.com/uploads/codm/weapons/pistol/50-gs/50-gs-cod-mobile.jpg",
  "renetti": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxDF9eILsq81Km4Q4w-uVkcZIt5PjlVZahhw&s",
  "shorty": "https://zilliongamer.com/uploads/codm/weapons/secondary/shorty/shorty-call-of-duty-mobile.jpg",
  "crossbow": "https://oyster.ignimgs.com/mediawiki/apis.ign.com/call-of-duty-2014/7/78/Crossbow.jpg"
};

  // Map weapon names to images
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
      'darealgamingq33': dlq33Image, // alternative naming
      'rpd': rpdImage,
      'by15': by15Image,
      'j358': j358Image,
      'j358revolver': j358Image,
      'ak117': ak117Image,
      'type25': type25Image,
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
    
    return imageMap[nameKey] || ak47Image; // fallback to ak47
  };

  const statColors = {
    Damage: "from-red-500 to-red-400",
    Rate: "from-yellow-500 to-yellow-400", 
    Accuracy: "from-blue-500 to-blue-400",
    Mobility: "from-green-500 to-green-400",
    Range: "from-purple-500 to-purple-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03,
        rotateY: 5,
      }}
      className="weapon-card group p-6 h-full cursor-pointer"
      onClick={onClick}
    >
      {/* Weapon Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 bg-muted/20">
        <motion.img
          src={getWeaponImage(weapon.Name)}
          alt={weapon.Name}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImageError(true)}
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Category Badge */}
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary/90 text-primary-foreground font-bold">
            {weapon.Category}
          </Badge>
        </div>

        {/* DPS Badge */}
        <div className="absolute top-2 left-2">
          <Badge className="bg-accent/90 text-accent-foreground font-bold">
            {weapon.DPS} DPS
          </Badge>
        </div>

        {/* Hover Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </div>

      {/* Weapon Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-neon-primary mb-1">
            {weapon.Name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {weapon.Ammo} • {weapon.Mags} mags
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "DMG", value: weapon.Damage, max: 100 },
            { label: "RATE", value: weapon.Rate, max: 100 },
            { label: "ACC", value: weapon.Accuracy, max: 100 },
            { label: "MOB", value: weapon.Mobility, max: 100 }
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </span>
                <span className="text-xs font-bold text-foreground">
                  {stat.value}
                </span>
              </div>
              <div className="stat-bar">
                <motion.div
                  className="stat-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Hint */}
        <motion.div 
          className="text-center pt-2 border-t border-border/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 1 }}
        >
          <p className="text-xs text-primary/80 font-medium">
            Click for detailed stats →
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};