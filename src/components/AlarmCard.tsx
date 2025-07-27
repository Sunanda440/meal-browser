import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Clock, Edit, Trash, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Alarm as AlarmType } from '@/hooks/useAlarmSystem';

interface AlarmCardProps {
  alarm: AlarmType;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<AlarmType>) => void;
  onDelete: (id: string) => void;
}

const AlarmCard: React.FC<AlarmCardProps> = ({ alarm, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    time: alarm.time,
    label: alarm.label,
    sound: alarm.sound,
  });

  const handleSave = () => {
    onUpdate(alarm.id, editForm);
    setIsEditing(false);
  };

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

  const soundIcons: Record<string, string> = {
    classic: '🔔',
    gentle: '🎵',
    bells: '🔔',
    chirp: '🐦',
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-lg border-l-4",
      alarm.isEnabled 
        ? "border-l-primary bg-gradient-to-r from-primary/5 to-transparent" 
        : "border-l-muted bg-muted/20",
      alarm.isRinging && "animate-pulse border-l-destructive bg-destructive/10"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getTimeEmoji(alarm.time)}</div>
            <div>
              <CardTitle className="text-lg">
                {formatTime(alarm.time)}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{alarm.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {alarm.isRinging && (
              <Badge variant="destructive" className="animate-pulse">
                <Bell className="w-3 h-3 mr-1" />
                Ringing
              </Badge>
            )}
            {alarm.snoozeCount > 0 && (
              <Badge variant="secondary">
                Snoozed {alarm.snoozeCount}x
              </Badge>
            )}
            <Switch
              checked={alarm.isEnabled}
              onCheckedChange={() => onToggle(alarm.id)}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {alarm.isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundIcons[alarm.sound] || '🔔'} {alarm.sound}</span>
            </div>
            <Clock className="w-4 h-4" />
            <span>Daily</span>
          </div>
          
          <div className="flex gap-1">
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Alarm</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={editForm.time}
                      onChange={(e) => setEditForm(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="label">Label</Label>
                    <Input
                      id="label"
                      value={editForm.label}
                      onChange={(e) => setEditForm(prev => ({ ...prev, label: e.target.value }))}
                      placeholder="Enter alarm label"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sound">Sound</Label>
                    <Select value={editForm.sound} onValueChange={(value) => setEditForm(prev => ({ ...prev, sound: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">🔔 Classic</SelectItem>
                        <SelectItem value="gentle">🎵 Gentle</SelectItem>
                        <SelectItem value="bells">🔔 Bells</SelectItem>
                        <SelectItem value="chirp">🐦 Chirp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="flex-1">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(alarm.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlarmCard;