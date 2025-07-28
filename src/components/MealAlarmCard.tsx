import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { AlarmClock, Volume2 } from 'lucide-react';
import { Alarm } from '@/hooks/useAlarmSystem';

interface MealAlarmCardProps {
  alarm: Alarm | undefined;
  mealTime: string;
  mealLabel: string;
  onToggle: (alarmId: string) => void;
}

const MealAlarmCard: React.FC<MealAlarmCardProps> = ({ 
  alarm, 
  mealTime, 
  mealLabel, 
  onToggle 
}) => {
  if (!alarm) {
    return (
      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-dashed">
        <div className="flex items-center gap-3">
          <AlarmClock className="w-4 h-4 text-muted-foreground" />
          <div>
            <div className="text-sm font-medium text-muted-foreground">{mealTime}</div>
            <div className="text-xs text-muted-foreground">No alarm set</div>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          Inactive
        </Badge>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
      alarm.isEnabled 
        ? 'bg-primary/5 border-primary/20' 
        : 'bg-muted/30 border-muted'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${
          alarm.isEnabled 
            ? 'bg-primary/10 text-primary' 
            : 'bg-muted text-muted-foreground'
        }`}>
          <AlarmClock className="w-4 h-4" />
        </div>
        <div>
          <div className="text-sm font-medium">{alarm.time}</div>
          <div className="text-xs text-muted-foreground">{alarm.label}</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {alarm.isEnabled && (
          <div className="flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground capitalize">{alarm.sound}</span>
          </div>
        )}
        <Switch
          checked={alarm.isEnabled}
          onCheckedChange={() => onToggle(alarm.id)}
        />
      </div>
    </div>
  );
};

export default MealAlarmCard;