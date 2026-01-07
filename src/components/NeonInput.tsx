import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Glow } from '../theme/glow';

export default function NeonInput(props: any) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={Colors.textMuted}
      style={[styles.input, Glow.soft]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 14,
    color: Colors.textPrimary,
    fontSize: 16,
    marginBottom: 16,
  },
});
