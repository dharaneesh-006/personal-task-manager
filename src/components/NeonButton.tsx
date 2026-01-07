import React, { useEffect } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Gradients } from '../theme/gradients';
import { Colors } from '../theme/colors';

export default function NeonButton({ title, onPress }: any) {
  const glow = useSharedValue(0.6);

  useEffect(() => {
    glow.value = withRepeat(
      withTiming(1, { duration: 1800 }),
      -1,
      true
    );
  }, [glow]);

  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: glow.value,
  }));

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.wrapper, glowStyle]}>
        <LinearGradient colors={Gradients.button} style={styles.btn}>
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 18,
    shadowColor: Colors.neonPurple,
    shadowRadius: 25,
    elevation: 25,
  },
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 18,
  },
  text: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
