import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import {
  white,
  black,
  red,
  pink,
  purple,
  lightPurple,
  blue,
  orange,
  green,
} from './colors';

const NOTIFICATION_KEY = 'UdaciFitness:notifications';

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split('T')[0];
}

export const getDailyReminderValue = () => {
  return {
    today: ":wave Don't forget to log data",
  };
};

export const clearLocalNotifications = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
};

const createLocalNotification = () => {
  return {
    title: 'Log your stats!',
    body: 'Dont forget to log your stats for today!',
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

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate(+1));
            tomorrow.setHours(20);
            tomorrow.setMinutes(20);
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

export const enforcePromiseDelay = ms =>
  new Promise(resolve => setTimeout(resolve, ms));
