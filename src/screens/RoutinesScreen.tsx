import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';

import { Colors } from '../theme/colors';
import { Gradients } from '../theme/gradients';
import { Glow } from '../theme/glow';
import NeonBottomBar from '../components/NeonBottomBar';
import { useRoutines, Routine } from '../context/RoutineContext';
import { hapticLight, hapticWarning } from '../utils/haptics';
import {
  scheduleAlarm,
  cancelAlarm,
} from '../native/AlarmManager';

function RoutineCard({
  routine,
  onToggle,
  onEdit,
  onDelete,
}: {
  routine: Routine;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const glow = useSharedValue(routine.active ? 1 : 0);
  const scale = useSharedValue(routine.active ? 1 : 0.96);

  glow.value = withTiming(routine.active ? 1 : 0, { duration: 250 });
  scale.value = withTiming(routine.active ? 1 : 0.96, { duration: 250 });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: glow.value,
  }));

  const timeText = new Date(routine.time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const renderDelete = () => (
    <View style={styles.deleteBox}>
      <Icon name="trash-outline" size={26} color="#fff" />
    </View>
  );

  return (
    <Swipeable renderRightActions={renderDelete} onSwipeableOpen={onDelete}>
      <Pressable onPress={onToggle}>
        <Animated.View style={animatedStyle}>
          <LinearGradient
            colors={Gradients.card}
            style={[styles.card, routine.active ? Glow.soft : null]}
          >
            <View>
              <Text style={styles.time}>{timeText}</Text>
              <Text style={styles.name}>{routine.title}</Text>
              <Text style={styles.mode}>
                {(routine.mode ?? 'both').toUpperCase()}
              </Text>
            </View>

            <View style={styles.right}>
              <Pressable onPress={onEdit}>
                <Icon
                  name="create-outline"
                  size={20}
                  color={Colors.neonBlue}
                />
              </Pressable>

              <Icon
                name={routine.active ? 'alarm' : 'alarm-outline'}
                size={22}
                color={routine.active ? Colors.neonGreen : Colors.textMuted}
              />

              <Text
                style={[
                  styles.status,
                  { color: routine.active ? Colors.neonGreen : Colors.textMuted },
                ]}
              >
                {routine.active ? 'ON' : 'OFF'}
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </Pressable>
    </Swipeable>
  );
}

export default function RoutinesScreen({ navigation }: any) {
  const { routines, toggleRoutine, deleteRoutine } = useRoutines();

  const handleToggle = (routine: Routine) => {
    hapticLight();

    // schedule / cancel alarm
    // if (!routine.active && (routine.mode === 'ring' || routine.mode === 'both')) {
    //   scheduleAlarm(routine.id, routine.time);
    // } else {
    //   cancelAlarm(routine.id);
    // }

    toggleRoutine(routine.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Routines</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {routines.map(routine => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onToggle={() => handleToggle(routine)}
            onEdit={() =>
              navigation.navigate('CreateRoutine', { routine })
            }
            onDelete={() => {
              hapticWarning();
              // cancelAlarm(routine.id);
              deleteRoutine(routine.id);
            }}
          />
        ))}
      </ScrollView>

      <NeonBottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    padding: 20,
  },
  title: {
    color: Colors.neonBlue,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    color: Colors.neonPurple,
    fontSize: 20,
    fontWeight: '700',
  },
  name: {
    color: Colors.textPrimary,
    fontSize: 16,
    marginTop: 4,
  },
  mode: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  right: {
    alignItems: 'center',
    gap: 6,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
  deleteBox: {
    width: 80,
    backgroundColor: Colors.neonPink,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 16,
  },
});
