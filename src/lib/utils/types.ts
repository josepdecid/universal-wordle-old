export enum GameMode {
  Daily = 'Daily',
  Training = 'Training',
}

export enum InputState {
  Empty,
  Missing,
  Missplaced,
  Correct,
}

export type NotificationLevel =
  | 'default'
  | 'danger'
  | 'warning'
  | 'info'
  | 'success';

export interface INotification {
  id: string;
  type: NotificationLevel;
  message: string;
  timeout: number;
}
