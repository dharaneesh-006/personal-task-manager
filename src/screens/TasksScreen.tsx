import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../theme/colors';

export default function TasksScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: Colors.textPrimary }}>Tasks Screen</Text>
    </View>
  );
}
