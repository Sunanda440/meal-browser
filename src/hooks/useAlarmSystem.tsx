import { useState, useEffect, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Alarm {
  id: string;
  time: string; // Format: "HH:MM"
  label: string;
  isEnabled: boolean;
  sound: string;
  isRinging: boolean;
  snoozeCount: number;
  isCustomSound: boolean;
}

export interface AlarmSettings {
  snoozeMinutes: number;
  maxSnoozes: number;
  volume: number;
  vibrate: boolean;
}

const DEFAULT_ALARMS: Omit<Alarm, 'id' | 'isRinging' | 'snoozeCount'>[] = [
  { time: '08:30', label: 'Breakfast Time 🍳', isEnabled: true, sound: 'classic', isCustomSound: false },
  { time: '10:30', label: 'Morning Snack 🍎', isEnabled: true, sound: 'gentle', isCustomSound: false },
  { time: '12:30', label: 'Lunch Time 🍽️', isEnabled: true, sound: 'bells', isCustomSound: false },
  { time: '17:00', label: 'Afternoon Snack 🥨', isEnabled: true, sound: 'chirp', isCustomSound: false },
  { time: '19:20', label: 'Dinner Time 🍝', isEnabled: true, sound: 'classic', isCustomSound: false },
];

const DEFAULT_SETTINGS: AlarmSettings = {
  snoozeMinutes: 5,
  maxSnoozes: 3,
  volume: 0.8,
  vibrate: true,
};

export const useAlarmSystem = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [settings, setSettings] = useState<AlarmSettings>(DEFAULT_SETTINGS);
  const [currentRingingAlarm, setCurrentRingingAlarm] = useState<string | null>(null);
  const { toast } = useToast();
  const audioRef = useRef<any>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load alarms and settings from localStorage
  useEffect(() => {
    const savedAlarms = localStorage.getItem('mealAlarms');
    const savedSettings = localStorage.getItem('alarmSettings');

    if (savedAlarms) {
      setAlarms(JSON.parse(savedAlarms));
    } else {
      const defaultAlarms = DEFAULT_ALARMS.map(alarm => ({
        ...alarm,
        id: crypto.randomUUID(),
        isRinging: false,
        snoozeCount: 0,
      }));
      setAlarms(defaultAlarms);
      localStorage.setItem('mealAlarms', JSON.stringify(defaultAlarms));
    }

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else {
      localStorage.setItem('alarmSettings', JSON.stringify(DEFAULT_SETTINGS));
    }
  }, []);

  // Save alarms to localStorage
  useEffect(() => {
    if (alarms.length > 0) {
      localStorage.setItem('mealAlarms', JSON.stringify(alarms));
    }
  }, [alarms]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('alarmSettings', JSON.stringify(settings));
  }, [settings]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Vibrate function
  const vibrate = useCallback(() => {
    if (settings.vibrate && 'vibrate' in navigator) {
      navigator.vibrate([500, 300, 500, 300, 500]);
    }
  }, [settings.vibrate]);

  // Generate alarm sound using Web Audio API
  const generateAlarmTone = useCallback((type: string, audioContext: AudioContext, duration: number = 1) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure sound based on type
    switch (type) {
      case 'classic':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.5);
        oscillator.type = 'square';
        break;
      case 'gentle':
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.type = 'sine';
        break;
      case 'bells':
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.3); // E5
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.6); // G5
        oscillator.type = 'sine';
        break;
      case 'chirp':
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.2);
        oscillator.type = 'triangle';
        break;
      default:
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'square';
    }

    // Set volume with envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(settings.volume * 0.8, audioContext.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(settings.volume * 0.6, audioContext.currentTime + duration * 0.8);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);

    return oscillator;
  }, [settings.volume]);

  // Play alarm sound
  const playAlarmSound = useCallback((sound: string, isCustomSound: boolean) => {
    try {
      // Stop any existing sound
      if (audioRef.current) {
        if (audioRef.current.stop) audioRef.current.stop();
        if (audioRef.current.interval) clearInterval(audioRef.current.interval);
        audioRef.current = null;
      }

      if (isCustomSound) {
        // Play custom sound file
        const audio = new Audio(sound);
        audio.volume = settings.volume;
        audio.loop = true;
        audio.play().catch(console.error);
        audioRef.current = audio;
      } else {
        // Use Web Audio API for built-in sounds
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const playTone = () => {
          generateAlarmTone(sound, audioContext, 1.5);
        };
        
        // Play immediately
        playTone();
        
        // Set up repeating sound
        const interval = setInterval(playTone, 2000);
        
        audioRef.current = {
          stop: () => {
            clearInterval(interval);
            audioContext.close().catch(console.error);
          },
          interval
        };
      }
    } catch (error) {
      console.error('Error playing alarm sound:', error);
      // Fallback: Try simple beep
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(settings.volume, audioContext.currentTime);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
      } catch (fallbackError) {
        console.error('Fallback sound also failed:', fallbackError);
      }
    }
  }, [settings.volume, generateAlarmTone]);

  // Stop alarm sound
  const stopAlarmSound = useCallback(() => {
    if (audioRef.current) {
      if (audioRef.current.stop) {
        audioRef.current.stop();
      } else if (audioRef.current.pause) {
        audioRef.current.pause();
      }
      audioRef.current = null;
    }
  }, []);

  // Check if any alarm should ring
  const checkAlarms = useCallback(() => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    alarms.forEach(alarm => {
      if (alarm.isEnabled && alarm.time === currentTime && !alarm.isRinging) {
        triggerAlarm(alarm.id);
      }
    });
  }, [alarms]);

  // Trigger alarm
  const triggerAlarm = useCallback((alarmId: string) => {
    const alarm = alarms.find(a => a.id === alarmId);
    if (!alarm) return;

    setAlarms(prev => prev.map(a => 
      a.id === alarmId ? { ...a, isRinging: true } : a
    ));
    
    setCurrentRingingAlarm(alarmId);
    playAlarmSound(alarm.sound, alarm.isCustomSound);
    vibrate();

    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`🍽️ ${alarm.label}`, {
        body: 'Time for your meal!',
        icon: '/favicon.ico',
        tag: alarmId,
      });
    }

    // Show toast
    toast({
      title: alarm.label,
      description: 'Time for your meal! 🍽️',
      duration: 10000,
    });
  }, [alarms, playAlarmSound, vibrate, toast]);

  // Snooze alarm
  const snoozeAlarm = useCallback((alarmId: string) => {
    const alarm = alarms.find(a => a.id === alarmId);
    if (!alarm || alarm.snoozeCount >= settings.maxSnoozes) return;

    stopAlarmSound();
    setCurrentRingingAlarm(null);
    
    setAlarms(prev => prev.map(a => 
      a.id === alarmId 
        ? { ...a, isRinging: false, snoozeCount: a.snoozeCount + 1 }
        : a
    ));

    // Set timeout for snooze
    setTimeout(() => {
      triggerAlarm(alarmId);
    }, settings.snoozeMinutes * 60 * 1000);

    toast({
      title: `Snoozed for ${settings.snoozeMinutes} minutes`,
      description: `${alarm.label} will ring again`,
    });
  }, [alarms, settings, stopAlarmSound, triggerAlarm, toast]);

  // Dismiss alarm
  const dismissAlarm = useCallback((alarmId: string) => {
    stopAlarmSound();
    setCurrentRingingAlarm(null);
    
    setAlarms(prev => prev.map(a => 
      a.id === alarmId 
        ? { ...a, isRinging: false, snoozeCount: 0 }
        : a
    ));
  }, [stopAlarmSound]);

  // Toggle alarm
  const toggleAlarm = useCallback((alarmId: string) => {
    setAlarms(prev => prev.map(a => 
      a.id === alarmId ? { ...a, isEnabled: !a.isEnabled } : a
    ));
  }, []);

  // Update alarm
  const updateAlarm = useCallback((alarmId: string, updates: Partial<Alarm>) => {
    setAlarms(prev => prev.map(a => 
      a.id === alarmId ? { ...a, ...updates } : a
    ));
  }, []);

  // Add alarm
  const addAlarm = useCallback((alarmData: Omit<Alarm, 'id' | 'isRinging' | 'snoozeCount'>) => {
    const newAlarm: Alarm = {
      ...alarmData,
      id: crypto.randomUUID(),
      isRinging: false,
      snoozeCount: 0,
    };
    setAlarms(prev => [...prev, newAlarm]);
  }, []);

  // Delete alarm
  const deleteAlarm = useCallback((alarmId: string) => {
    setAlarms(prev => prev.filter(a => a.id !== alarmId));
  }, []);

  // Start checking alarms
  useEffect(() => {
    checkIntervalRef.current = setInterval(checkAlarms, 1000);
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [checkAlarms]);

  return {
    alarms,
    settings,
    currentRingingAlarm,
    updateSettings: setSettings,
    toggleAlarm,
    updateAlarm,
    addAlarm,
    deleteAlarm,
    snoozeAlarm,
    dismissAlarm,
    triggerAlarm, // For testing
  };
};