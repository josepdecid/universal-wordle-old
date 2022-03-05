export enum GameMode {
  Daily = 'Daily',
  Training = 'Training',
}

export type CellStatus =
  | 'Correct'
  | 'Missplaced'
  | 'TmpMissplaced'
  | 'Missing'
  | 'Empty';

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
