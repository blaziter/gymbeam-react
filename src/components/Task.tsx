import { formatISO } from 'date-fns';
import React from 'react';

import { TaskDialog } from './feature';
import { Input, Label } from './ui';
import { Badge } from './ui/badge';

import { Task as TaskModel } from '@lib/model';

export const Task = ({
    id,
    name,
    completed,
    priority,
    dueDate,
    tags,
    etc,
    taskId,
}: TaskModel & { taskId?: string }) => {
    return (
        <div
            className={`grid grid-cols-6 items-center gap-2 p-2 border-b last:border-0 border-gray-200 ${completed ? 'bg-[#9ACD32]/25' : ''}`}
            key={`${name}-${id}`}
        >
            <div className='grid grid-cols-2 items-center'>
                <Input type='checkbox' defaultChecked={completed} />
                <Label>{name}</Label>
            </div>
            <Label>{priority}</Label>
            <Label>{formatISO(dueDate, { representation: 'date' })}</Label>
            <div className='flex gap-1 flex-wrap max-w-[10rem]'>
                {tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                ))}
            </div>
            <Label>{etc}</Label>
            <div>
                <TaskDialog taskId={taskId} listId={id} mode='update' />
            </div>
        </div>
    );
};

Task.displayName = 'components.Task';
