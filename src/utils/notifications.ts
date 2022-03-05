import { writable, derived, Readable } from 'svelte/store';
import type { INotification } from './types';

const TIMEOUT = 3000;

function createNotificationStore() {
  const _notifications = writable([]);

  function generateId() {
    return '_' + Math.random().toString(36).substring(2, 20);
  }

  function send(message: string, timeout: number, type: string = 'default') {
    _notifications.update((state) => {
      return [...state, { id: generateId(), type, message, timeout }];
    });
  }

  const notifications: Readable<Array<INotification>> = derived(
    _notifications,
    ($_notifications, set) => {
      set($_notifications);
      if ($_notifications.length > 0) {
        const timer = setTimeout(() => {
          _notifications.update((state) => {
            state.shift();
            return state;
          });
        }, $_notifications[0].timeout);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  );

  const { subscribe } = notifications;

  return {
    subscribe,
    send,

    default: (msg: string, timeout: number = TIMEOUT) =>
      send(msg, timeout, 'default'),

    danger: (msg: string, timeout: number = TIMEOUT) =>
      send(msg, timeout, 'danger'),

    warning: (msg: string, timeout: number = TIMEOUT) =>
      send(msg, timeout, 'warning'),

    info: (msg: string, timeout: number = TIMEOUT) =>
      send(msg, timeout, 'info'),

    success: (msg: string, timeout: number = TIMEOUT) =>
      send(msg, timeout, 'success'),
  };
}

export const notifications = createNotificationStore();
