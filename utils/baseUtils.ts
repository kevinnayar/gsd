import { ITaskItem, IThemeMode } from '../types/baseTypes';


export function unixTimestampToDayDate(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 10);
}

export function isMobileDevice(): boolean {
  const ver = window.navigator.appVersion;
  if (!ver) return false;
  return Boolean(
    ver.match(/iPhone/) || ver.match(/iPad/) || ver.match(/Android/)
  );
}

export function moveItemInList<T>(listIn: T[], from: number, _to: number): T[] {
  const to = from < _to ? _to - 1 : _to;

  if (from === to) return listIn;

  const listOut: T[] = [];

  listIn.forEach((item, index) => {
    if (from < to) {
      if (index < from) listOut[index] = item;
      if (index === from) listOut[to] = item;
      if (index > from && index <= to) listOut[index - 1] = item;
      if (index > to) listOut[index] = item;
    } else if (from > to) {
      if (index < to) listOut[index] = item;
      if (index >= to && index < from) listOut[index + 1] = item;
      if (index === from) listOut[to] = item;
      if (index > from) listOut[index] = item;
    }
  });

  return listOut;
}

export function insertAtIndex<T>(listIn: T[], itemIn: T, index: number): T[] {
  const listOut: T[] = [...listIn.slice(0, index), itemIn, ...listIn.slice(index)];
  return listOut;
}

const GSD_THEME_KEY = 'GSD_THEME_KEY';
const DEFAULT_THEME_MODE: IThemeMode = 'light-mode';

export function getLocalTheme(storage: Storage): IThemeMode {
  return storage.getItem && storage.getItem(GSD_THEME_KEY) !== null && storage.getItem(GSD_THEME_KEY) !== 'null'
    ? (storage.getItem(GSD_THEME_KEY) as IThemeMode)
    : DEFAULT_THEME_MODE;
}

export function setLocalTheme(storage: Storage, themeMode: IThemeMode) {
  if (storage.setItem) storage.setItem(GSD_THEME_KEY, themeMode);
}