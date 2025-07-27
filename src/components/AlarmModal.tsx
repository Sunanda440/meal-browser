import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlarmClock, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Alarm } from '@/hooks/useAlarmSystem';

interface AlarmModalProps {
  alarm: Alarm | null;
  isOpen: boolean;
  onSnooze: (alarmId: string) => void;
  onDismiss: (alarmId: string) => void;
  maxSnoozes: number;
  snoozeMinutes: number;
}

const AlarmModal: React.FC<AlarmModalProps> = ({ 
  alarm, 
  isOpen, 
  onSnooze, 
  onDismiss, 
  maxSnoozes,
  snoozeMinutes 
}) => {
  if (!alarm) return null;

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getTimeEmoji = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 6 && hour < 12) return '🌅';
    if (hour >= 12 && hour < 17) return '☀️';
    if (hour >= 17 && hour < 21) return '🌆';
    return '🌙';
  };

  const canSnooze = alarm.snoozeCount < maxSnoozes;

  return (
    <Dialog open={isOpen} onOpenChange={() => onDismiss(alarm.id)}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="text-6xl animate-pulse">
                  {getTimeEmoji(alarm.time)}
                </div>
                <div className="absolute -top-2 -right-2">
                  <AlarmClock className="w-8 h-8 text-primary animate-bounce" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary">
                  {formatTime(alarm.time)}
                </h2>
                <p className="text-lg text-foreground mt-1">
                  {alarm.label}
                </p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 mt-6">
          {alarm.snoozeCount > 0 && (
            <div className="text-center">
              <Badge variant="secondary" className="text-sm">
                Snoozed {alarm.snoozeCount} time{alarm.snoozeCount !== 1 ? 's' : ''}
              </Badge>
            </div>
          )}
          
          <div className="text-center text-muted-foreground text-sm">
            It's time for your meal! 🍽️
          </div>
          
          <div className="flex gap-2">
            {canSnooze && (
              <Button 
                variant="outline" 
                className="flex-1 h-12 text-base"
                onClick={() => onSnooze(alarm.id)}
              >
                <Clock className="w-5 h-5 mr-2" />
                Snooze {snoozeMinutes}m
              </Button>
            )}
            
            <Button 
              className={cn(
                "h-12 text-base",
                canSnooze ? "flex-1" : "w-full"
              )}
              onClick={() => onDismiss(alarm.id)}
            >
              <X className="w-5 h-5 mr-2" />
              Dismiss
            </Button>
          </div>
          
          {!canSnooze && alarm.snoozeCount > 0 && (
            <div className="text-center text-sm text-muted-foreground">
              Maximum snoozes reached ({maxSnoozes})
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlarmModal;