import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Settings, Volume2, Vibrate, Clock } from 'lucide-react';
import type { AlarmSettings as AlarmSettingsType } from '@/hooks/useAlarmSystem';

interface AlarmSettingsProps {
  settings: AlarmSettingsType;
  onUpdateSettings: (settings: AlarmSettingsType) => void;
}

const AlarmSettings: React.FC<AlarmSettingsProps> = ({ settings, onUpdateSettings }) => {
  const updateSetting = <K extends keyof AlarmSettingsType>(
    key: K, 
    value: AlarmSettingsType[K]
  ) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Alarm Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Snooze Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <Label className="text-sm font-medium">Snooze Duration</Label>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Minutes</span>
                <span className="text-sm font-medium">{settings.snoozeMinutes}</span>
              </div>
              <Input
                type="number"
                min="1"
                max="30"
                value={settings.snoozeMinutes}
                onChange={(e) => updateSetting('snoozeMinutes', parseInt(e.target.value) || 5)}
                className="w-full"
              />
            </div>
          </div>

          {/* Max Snoozes */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Maximum Snoozes</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Times</span>
                <span className="text-sm font-medium">{settings.maxSnoozes}</span>
              </div>
              <Input
                type="number"
                min="0"
                max="10"
                value={settings.maxSnoozes}
                onChange={(e) => updateSetting('maxSnoozes', parseInt(e.target.value) || 3)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-primary" />
            <Label className="text-sm font-medium">Volume</Label>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Level</span>
              <span className="text-sm font-medium">{Math.round(settings.volume * 100)}%</span>
            </div>
            <Slider
              value={[settings.volume]}
              onValueChange={(value) => updateSetting('volume', value[0])}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        {/* Vibration Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Vibrate className="w-4 h-4 text-primary" />
            <Label htmlFor="vibrate" className="text-sm font-medium">
              Vibration
            </Label>
          </div>
          <Switch
            id="vibrate"
            checked={settings.vibrate}
            onCheckedChange={(checked) => updateSetting('vibrate', checked)}
          />
        </div>

        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
          <p className="font-medium mb-1">Note:</p>
          <ul className="space-y-1">
            <li>• Browser notifications require permission</li>
            <li>• Vibration only works on supported devices</li>
            <li>• Sounds may be limited in some browsers</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlarmSettings;