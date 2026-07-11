import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCard = ({ stats }) => {
  const statItems = [
    {
      key: 'weeklyWorkouts',
      label: 'This Week',
      value: stats?.weeklyWorkouts || 0,
      target: stats?.weeklyTarget || 5,
      icon: 'Dumbbell',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      key: 'totalMinutes',
      label: 'Minutes',
      value: stats?.totalMinutes || 0,
      target: stats?.minutesTarget || 300,
      icon: 'Clock',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      key: 'caloriesBurned',
      label: 'Calories',
      value: stats?.caloriesBurned || 0,
      target: stats?.caloriesTarget || 2000,
      icon: 'Zap',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      key: 'level',
      label: 'Level',
      value: stats?.level || 1,
      target: null,
      icon: 'Trophy',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const getProgressPercentage = (value, target) => {
    if (!target) return 100;
    return Math.min((value / target) * 100, 100);
  };

  return (
    <div className="bg-card rounded-2xl p-6 morphic-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-poppins font-semibold text-lg text-foreground">
          Quick Stats
        </h2>
        <Icon name="BarChart3" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {statItems?.map((item) => (
          <div
  key={item?.key}
  className="space-y-4 p-2 rounded-xl hover:bg-background/30 transition"
>
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
                <Icon name={item?.icon} size={20} className={item?.color} />
              </div>
              {item?.target && (
                <span className="text-xs text-muted-foreground">
                  /{item?.target}
                </span>
              )}
            </div>
            
            <div>
              <div className="font-mono font-bold text-xl text-foreground">
                {item?.value?.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                {item?.label}
              </div>
            </div>

            {item?.target && (
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${item?.color?.replace('text-', 'bg-')}`}
                  style={{ width: `${getProgressPercentage(item?.value, item?.target)}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsCard;