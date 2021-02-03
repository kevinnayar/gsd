import * as React from 'react';
import {
  useDrop,
  DropTargetMonitor,
  DragObjectWithType
} from 'react-dnd';
import { ITaskItem } from '../../types/taskTypes';
import { ColumnId } from '../../types/baseTypes';

type TaskDropZoneProps = {
  position: number;
  columnId: ColumnId;
  updatePosition: (taskItem: ITaskItem, position: number, columnId: ColumnId) => void;
};

export function TaskDropZone(props: TaskDropZoneProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item: DragObjectWithType) => {
      if (item.type === 'task') {
        const movingItem = { ...item } as ITaskItem;
        props.updatePosition(movingItem, props.position, props.columnId);
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div
      ref={drop}
      className={`task-dropzone task-dropzone--${isOver ? 'active' : 'inactive'}`}
    />
  );
}

