import { motion } from "framer-motion";
import { useState } from "react";
import { WeaponCard } from "./WeaponCard";
import { WeaponModal } from "./WeaponModal";
import { getWeaponsByCategory, weaponCategories, categoryIcons, WeaponStats } from "@/lib/weaponData";
import { Button } from "@/components/ui/button";

export const WeaponSection = () => {
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponStats | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("AR");
  
  const weaponsByCategory = getWeaponsByCategory();

  const handleWeaponClick = (weapon: WeaponStats) => {
    setSelectedWeapon(weapon);
  };

  const handleCloseModal = () => {
    setSelectedWeapon(null);
  };

  return (
    <>
      <section id="weapons" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-neon-primary mb-4">
              Weapon Arsenal
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the complete CODM weapon collection with detailed statistics and performance metrics
            </p>
          </motion.div>

          {/* Category Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {Object.entries(weaponCategories).map(([key, name]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 text-lg font-bold transition-all duration-300 ${
                  selectedCategory === key
                    ? "btn-primary"
                    : "border-border/50 hover:border-primary/50 hover:text-primary"
                }`}
              >
                <span className="mr-2 text-xl">{categoryIcons[key as keyof typeof categoryIcons]}</span>
                {name}
              </Button>
            ))}
          </motion.div>

          {/* Weapon Grid */}
          <motion.div
            key={selectedCategory} // This forces re-render when category changes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {weaponsByCategory[selectedCategory]?.map((weapon, index) => (
              <WeaponCard
                key={`${weapon.Category}-${weapon.Name}`}
                weapon={weapon}
                index={index}
                onClick={() => handleWeaponClick(weapon)}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {(!weaponsByCategory[selectedCategory] || weaponsByCategory[selectedCategory].length === 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-muted-foreground mb-2">
                No weapons found
              </h3>
              <p className="text-muted-foreground">
                This category doesn't have any weapons available yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Weapon Modal */}
      <WeaponModal
        weapon={selectedWeapon}
        isOpen={!!selectedWeapon}
        onClose={handleCloseModal}
      />
    </>
  );
};