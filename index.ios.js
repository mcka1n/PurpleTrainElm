const { AppRegistry, AsyncStorage, PushNotificationIOS } = require('react-native');
const Elm = require('./elm');
const component = Elm.Main.start();

const upsertInstallation = (deviceToken, homeStopId) => {
  const endpoint = `http://10.0.1.66:4000/api/v2/installations/${deviceToken}`;
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
    upsertInstallation(deviceToken, stop);
  });
}

PushNotificationIOS.addEventListener('register', _onRegistered);
PushNotificationIOS.requestPermissions();

AppRegistry.registerComponent('PurpleTrain', () => component);
