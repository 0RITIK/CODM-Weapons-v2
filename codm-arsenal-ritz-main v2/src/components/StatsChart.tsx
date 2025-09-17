import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { WeaponStats } from '@/lib/weaponData';

interface StatsChartProps {
  weapons: WeaponStats[];
  statKey: keyof WeaponStats;
  color: string;
  statLabel: string;
}

export const StatsChart = ({ weapons, statKey, color, statLabel }: StatsChartProps) => {
  const chartData = weapons
    .map(weapon => ({
      name: weapon.Name,
      value: Number(weapon[statKey]) || 0,
      fullName: weapon.Name
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Show top 10 for readability

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-glow-primary">
          <p className="text-foreground font-semibold">{`${label}`}</p>
          <p className="text-primary">
            {`${statLabel}: `}
            <span className="font-bold text-neon-primary">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (index: number) => {
    const opacity = 1 - (index * 0.08);
    return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-80 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))"
            opacity={0.3}
          />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ 
              fill: 'hsl(var(--muted-foreground))', 
              fontSize: 12,
              fontWeight: 500
            }}
            stroke="hsl(var(--border))"
          />
          <YAxis
            tick={{ 
              fill: 'hsl(var(--muted-foreground))', 
              fontSize: 12,
              fontWeight: 500
            }}
            stroke="hsl(var(--border))"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]}
            stroke={color}
            strokeWidth={1}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getBarColor(index)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Chart Summary */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="text-2xl font-bold text-neon-primary">
            {Math.max(...chartData.map(d => d.value))}
          </div>
          <div className="text-xs text-muted-foreground">Highest {statLabel}</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-neon-secondary">
            {Math.round(chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length)}
          </div>
          <div className="text-xs text-muted-foreground">Average {statLabel}</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-neon-accent">
            {chartData.length}
          </div>
          <div className="text-xs text-muted-foreground">Weapons Shown</div>
        </div>
      </div>
    </div>
  );
};