import HapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const hapticLight = () =>
  HapticFeedback.trigger('impactLight', options);

export const hapticSuccess = () =>
  HapticFeedback.trigger('notificationSuccess', options);

export const hapticWarning = () =>
  HapticFeedback.trigger('notificationWarning', options);
