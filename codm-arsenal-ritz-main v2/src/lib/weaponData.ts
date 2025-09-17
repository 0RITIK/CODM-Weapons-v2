export interface WeaponStats {
  Category: string;
  Name: string;
  DPS: number;
  Damage: number;
  Rate: number;
  Accuracy: number;
  Mobility: number;
  Range: number;
  RPS: number;
  Optics: string;
  Ammo: string;
  Mags: string;
  DmgPerMag: string;
}

export const weaponCategories = {
  AR: "Assault Rifles",
  SMG: "Sub Machine Guns", 
  Sniper: "Snipers",
  LMG: "Light Machine Guns",
  Shotgun: "Shotguns",
  Secondary: "Pistols & Melee"
};

export const categoryIcons = {
  AR: "🔥",
  SMG: "⚡",
  Sniper: "🎯",
  LMG: "💪",
  Shotgun: "💥",
  Secondary: "🗡️"
};

// Raw weapon data from CSV
export const rawWeaponData = `Category,Name,DPS,Damage,Rate,Accuracy,Mobility,Range,RPS,Optics,Ammo,Mags,Dmg/Mag
AR,Type25,385,55,70,45,60,40,14,Red -> 4X,5.56mm,20-40,1650
AR,AK47,385,70,55,45,60,65,11,Red -> 4X,7.62mm,20-40,2100
AR,AK117,350,50,70,55,60,45,14,Red -> 4X,5.56mm,20-40,1500
AR,ADM10,330,60,55,50,55,55,11,Red -> 4X,7.62mm,20-40,1800
AR,BK57,302,48,63,65,60,50,12.6,Red -> Tac,?,20-40,1440
AR,M16,293,65,45,60,60,60,9,Red -> Tac,5.56mm,20-40,1950
AR,LK24,270,45,60,47,60,50,12,Red -> Tac,?,20-40,1350
AR,M4,270,45,60,70,60,45,12,Red -> 4X,5.56mm,20-40,1350
SMG,MSMC,525,75,70,45,80,30,14,Red -> Tac,9mm,20-40,2250
SMG,Chicom,488,75,65,60,80,40,13,Red -> 4X?,9mm,25-45,2250
SMG,AKS74U,480,80,60,55,75,35,12,Red -> 4X,9mm,25-45,2880
SMG,PDW-57,450,90,50,40,75,25,10,Red -> 4X,9mm,45-65,4500
SMG,HG40,300,75,40,60,75,40,8,Red -> Tac,9mm,25-45,2400
Sniper,DL-Q33,135,85,15,60,45,95,3,4X +,7.62mm,05-013,540
Sniper,Artic 50,90,90,10,60,50,95,2,4X +,7.62mm,05-013,630
Sniper,Article 50,255,85,30,60,50,95,6,4X +,7.62mm,05-013,595
Sniper,M21 EBR,128,85,15,60,45,95,3,4X +,7.62mm,08-016,680
Sniper,M21 EBR,280,80,35,60,45,95,7,4X +,7.62mm,08-016,640
Sniper,XPR50,160,80,20,55,45,90,4,4X +,7.62mm,06-014,800
LMG,S36,563,75,75,35,40,50,15,?,?,?,7500
LMG,RPD,423,65,65,40,40,50,13,Red -> 4X,7.62mm,75-120,6500
LMG,UL736,420,70,60,45,40,55,12,?,?,?,5250
LMG,M4LMG,330,60,55,60,40,45,11,Red -> 4X,5.56mm,75-95,4500
Shotgun,H2126,338,75,45,70,80,15,9,�,12 Gage,10-016,1200
Shotgun,Striker,245,85,35,85,75,30,7,�,12 Gage,10-016,840
Shotgun,BY15,170,85,20,80,75,30,4,�,12 Gage,04-012,680
Shotgun,H20405,45,90,5,85,75,30,1,�,12 Gage,04-012,720
Secondary,Dagger,100,50,10,70,90,10,2,�,,,
Secondary,MW 11 handgun,260,65,40,55,90,20,8,�,,,780
Secondary,J358 revolver,120,80,15,70,90,35,3,�,,,480
Secondary,SMRS rockets,100,95,10,70,80,40,�,�,,,
Secondary,FHJ-17 rockets,100,90,10,90,40,90,�,�,,,
Secondary,Frag/Sticky,100,70,�,�,�,50,�,�,,,
Secondary,Trip mine,100,65,�,�,�,40,�,�,,,`;

export function parseWeaponData(): WeaponStats[] {
  const lines = rawWeaponData.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const weapon: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      if (header === 'DPS' || header === 'Damage' || header === 'Rate' || 
          header === 'Accuracy' || header === 'Mobility' || header === 'Range' || 
          header === 'RPS') {
        weapon[header] = parseFloat(value) || 0;
      } else {
        weapon[header] = value || '';
      }
    });
    
    return weapon as WeaponStats;
  });
}

export function getWeaponsByCategory(): Record<string, WeaponStats[]> {
  const weapons = parseWeaponData();
  const grouped: Record<string, WeaponStats[]> = {};
  
  Object.keys(weaponCategories).forEach(category => {
    grouped[category] = weapons.filter(weapon => weapon.Category === category);
  });
  
  return grouped;
}

export function getWeaponImagePath(weaponName: string): string {
  const imageName = weaponName.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/\s+/g, '');
  return `/src/assets/weapons/${imageName}.jpg`;
}