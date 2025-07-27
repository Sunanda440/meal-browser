import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, AlarmClock, Clock, Settings as SettingsIcon } from 'lucide-react';
import { useAlarmSystem } from '@/hooks/useAlarmSystem';
import AlarmCard from './AlarmCard';
import AlarmModal from './AlarmModal';
import AlarmSettings from './AlarmSettings';

const AlarmManager: React.FC = () => {
  const {
    alarms,
    settings,
    currentRingingAlarm,
    updateSettings,
    toggleAlarm,
    updateAlarm,
    addAlarm,
    deleteAlarm,
    snoozeAlarm,
    dismissAlarm,
  } = useAlarmSystem();

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newAlarmForm, setNewAlarmForm] = useState({
    time: '12:00',
    label: '',
    sound: 'classic',
    isEnabled: true,
    isCustomSound: false,
  });

  const handleAddAlarm = () => {
    if (newAlarmForm.label.trim()) {
      addAlarm(newAlarmForm);
      setNewAlarmForm({
        time: '12:00',
        label: '',
        sound: 'classic',
        isEnabled: true,
        isCustomSound: false,
      });
      setShowAddDialog(false);
    }
  };

  const activeAlarms = alarms.filter(alarm => alarm.isEnabled);
  const ringingAlarm = alarms.find(alarm => alarm.id === currentRingingAlarm);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlarmClock className="w-5 h-5 text-primary" />
              Meal Reminders
              <Badge variant="secondary" className="ml-2">
                {activeAlarms.length} active
              </Badge>
            </CardTitle>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Alarm
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Meal Reminder</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-time">Time</Label>
                    <Input
                      id="new-time"
                      type="time"
                      value={newAlarmForm.time}
                      onChange={(e) => setNewAlarmForm(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-label">Label</Label>
                    <Input
                      id="new-label"
                      value={newAlarmForm.label}
                      onChange={(e) => setNewAlarmForm(prev => ({ ...prev, label: e.target.value }))}
                      placeholder="e.g., Healthy Snack Time 🥗"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-sound">Sound</Label>
                    <Select 
                      value={newAlarmForm.sound} 
                      onValueChange={(value) => setNewAlarmForm(prev => ({ ...prev, sound: value }))}
                    >
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
                    <Button onClick={handleAddAlarm} className="flex-1">
                      Add Alarm
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="alarms" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="alarms" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Alarms
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <SettingsIcon className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="alarms" className="space-y-4">
              {alarms.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <AlarmClock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No meal reminders set up yet.</p>
                  <p className="text-sm">Add your first alarm to get started!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {alarms
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map(alarm => (
                      <AlarmCard
                        key={alarm.id}
                        alarm={alarm}
                        onToggle={toggleAlarm}
                        onUpdate={updateAlarm}
                        onDelete={deleteAlarm}
                      />
                    ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="settings">
              <AlarmSettings 
                settings={settings} 
                onUpdateSettings={updateSettings} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Ringing Alarm Modal */}
      <AlarmModal
        alarm={ringingAlarm || null}
        isOpen={!!currentRingingAlarm}
        onSnooze={snoozeAlarm}
        onDismiss={dismissAlarm}
        maxSnoozes={settings.maxSnoozes}
        snoozeMinutes={settings.snoozeMinutes}
      />
    </>
  );
};

export default AlarmManager;