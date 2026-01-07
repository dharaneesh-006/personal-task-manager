import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Gradients } from '../theme/gradients';
import { Glow } from '../theme/glow';

export default function NeonCard({ children }: any) {
  return (
    <LinearGradient colors={Gradients.card} style={[styles.card, Glow.soft]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
  },
});
