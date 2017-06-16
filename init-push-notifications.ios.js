const {
  Alert,
  AppRegistry,
  AsyncStorage,
  PushNotificationIOS,
} = require('react-native');

const upsertInstallation = (deviceToken, homeStopId) => {
  const endpoint = `https://purpletrainapp.com/api/v2/installations/${deviceToken}`;
  const params = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  params.body = JSON.stringify({
    home_stop_id: homeStopId,
    operating_system: 'ios',
    push_notifications_enabled: true,
  });

  fetch(endpoint, params).then(() => {});
};

const _onRegistered = (deviceToken) => {
  AsyncStorage.getItem('stop').then((stop) => {
    if (stop) {
      upsertInstallation(deviceToken, stop);
    }
  });

  // Store token so we can upsert later, when user changes their stop
  AsyncStorage.setItem('deviceToken', deviceToken);
}

const promptForCancellationsNotifications = () => {
  Alert.alert(
    'This is what it sounds like when trains cry',
    'Purple Train can send you notifications when your trains are cancelled!',
    [
      { text: 'Not Now' },
      { text: 'Give Access', onPress: PushNotificationIOS.requestPermissions },
    ],
  );
};

const promptKey = 'promptedForCancellationsNotifications';

export default function() {
  // TODO - where to remove event listener?
  PushNotificationIOS.addEventListener('register', _onRegistered);

  AsyncStorage.getItem(promptKey).then((value) => {
    if (!value) {
      AsyncStorage.setItem(promptKey, 'somevalue').then(() => {
        promptForCancellationsNotifications();
      });
    }
  });
};
