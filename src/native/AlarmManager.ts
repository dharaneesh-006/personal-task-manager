import { NativeModules } from 'react-native';

const { AlarmModule } = NativeModules;

export function scheduleAlarm(id: number, time: number) {
  AlarmModule.scheduleAlarm(id, time);
}

export function cancelAlarm(id: number) {
  AlarmModule.cancelAlarm(id);
}
