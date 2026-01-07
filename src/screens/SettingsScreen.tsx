import React from 'react';
import { View} from 'react-native';
import { Colors } from '../theme/colors';
import { Pressable, Text } from 'react-native';
import { showTestNotification } from '../utils/notifications';

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable onPress={showTestNotification}>
        <Text style={{ color: 'white' }}>Test Notification</Text>
      </Pressable>
    </View>
  );
}
