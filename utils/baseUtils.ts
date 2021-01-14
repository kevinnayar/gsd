import { ITaskItem } from '../types/baseTypes';

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

export function updateTaskListPositionByIndex(taskList: ITaskItem[]): ITaskItem[] {
  return taskList.map((item, index) => {
    item.position = index;
    return item;
  });
}

export function sortTaskListAsc(taskList: ITaskItem[]): ITaskItem[] {
  return taskList.sort((a, b) => {
    if (a.position > b.position) return 1;
    if (a.position < b.position) return -1;
    return 0;
  });
}
