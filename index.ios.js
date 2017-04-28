const { AppRegistry } = require('react-native');
const Elm = require('./elm');
const component = Elm.Main.start();
import initPushNotifications from './init-push-notifications';

initPushNotifications();

AppRegistry.registerComponent('PurpleTrain', () => component);
