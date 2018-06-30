import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

import { wordsOfEncouragement, wordsOfPraise } from '../data';

const NOTIFICATION_KEY = 'mobileflashcards:notifications';

/**
 * Get a random number up to a given `max` number param
 * @function getRandomNumber
 * @param {number} max
 * @return number
 */
export const getRandomNumber = max => Math.floor(Math.random() * max) + 0;

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split('T')[0];
}

export const getDailyReminderValue = () => {
  return {
    today: "👋 Don't forget to log data",
  };
};

export const clearLocalNotifications = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
};

const createLocalNotification = () => {
  return {
    title: 'Study time!',
    body: 'Dont forget to study today!',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
};

export const askNotificationPermission = () => {
  Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then(({ status }) => {
      if (status === 'granted') {
        return setLocalNotification();
      }
    })
    .catch(error =>
      console.warn('Error asking Permission for NOTIFICATIONS', error)
    );
};

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            // Set a notification time to be tomorrow at 9am
            // NB: timezone will vary based on device settings
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(9);
            tomorrow.setMinutes(0);
            tomorrow.setSeconds(0);

            Notifications.scheduleLocalNotificationAsync(
              createLocalNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              }
            );

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
};

/**
 * Util function to add a response delay
 * @function enforePromiseDelay
 * @param {number} ms
 * return Promise
 */
export const enforcePromiseDelay = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Return a random message from either `wordsOfPraise` or `wordsOfEncouragement` Arrays
 * @function getRandomMessage
 * @param {number} score
 * return string
 */
export const getRandomMessage = score => {
  const MAX_TOP_SCORE = 100;
  let randIndex = 0;
  let message = '';

  if (score === MAX_TOP_SCORE) {
    randIndex = getRandomNumber(wordsOfPraise.length);
    message = wordsOfPraise[randIndex];
  } else {
    randIndex = getRandomNumber(wordsOfEncouragement.length);
    message = wordsOfEncouragement[randIndex];
  }
  return message;
};
