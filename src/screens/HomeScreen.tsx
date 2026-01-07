import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import NeonCard from '../components/NeonCard';
import NeonBottomBar from '../components/NeonBottomBar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My PA</Text>

      <NeonCard>
        <Text style={styles.label}>Today</Text>
        <Text style={styles.value}>3 Tasks Pending</Text>
      </NeonCard>

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
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
  },
  label: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  value: {
    color: Colors.textPrimary,
    fontSize: 22,
    marginTop: 8,
    fontWeight: '600',
  },
});
