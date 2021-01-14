import * as React from 'react';
import {
  useDrop,
  DropTargetMonitor,
  DragObjectWithType
} from 'react-dnd';
import { ITaskItem } from '../../../types/baseTypes';

type TaskDropZoneProps = {
  position: number;
  updatePosition: (from: number, to: number) => void;
};

export function TaskDropZone(props: TaskDropZoneProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item: DragObjectWithType) => {
      if (item.type === 'task') {
        const movedItem = { ...item } as ITaskItem;
        props.updatePosition(movedItem.position, props.position);
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

