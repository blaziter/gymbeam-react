'use client';

import { isDefined } from '@lib';
import { TrashIcon } from '@radix-ui/react-icons';
import { formatISO } from 'date-fns';
import React, { useCallback, useEffect } from 'react';

import { AlertDialog } from './Alert-Dialog';
import { TaskDialog } from './feature';
import { Input, Label } from './ui';
import { Badge } from './ui/badge';

import { todoListApi } from '@lib/hooks';
import { Task as TaskModel } from '@lib/model';

export const Task = ({
    name,
    completed,
    priority,
    dueDate,
    tags,
    etc,
    listId,
    refetch,
    taskId,
}: TaskModel & { listId: string; taskId?: string; refetch?: () => void }) => {
    const [updateCompleted, setUpdateCompleted] = React.useState<
        boolean | undefined
    >(completed);

    const taskCompletedCallback = useCallback(
        (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            if (e.target instanceof HTMLInputElement && isDefined(taskId)) {
                todoListApi.updateTask.call(
                    { listId, taskId },
                    { completed: e.target.checked }
                );

                setUpdateCompleted(e.target.checked);
            }
        },
        [listId, taskId]
    );

    const taskDeleteCallback = useCallback(() => {
        if (isDefined(taskId)) {
            todoListApi.deleteTask.call({ listId, taskId }).then((res) => {
                res.status === 200 && refetch?.();
            });
        }
    }, [listId, taskId, refetch]);

    useEffect(() => {
        setUpdateCompleted(completed);
    }, [completed]);

    return (
        <div
            className={`grid grid-cols-6 items-center gap-2 p-2 border-b last:border-0 border-gray-200 ${updateCompleted ? 'bg-[#9ACD32]/25' : ''}`}
            key={`${name}-${listId}`}
        >
            <div className='grid grid-cols-2 items-center'>
                <Input
                    type='checkbox'
                    checked={updateCompleted}
                    onClick={(e) => taskCompletedCallback(e)}
                />
                <Label>{name}</Label>
            </div>
            <Label>{priority}</Label>
            <Label>{formatISO(dueDate, { representation: 'date' })}</Label>
            <div className='flex gap-1 flex-wrap max-w-[10rem]'>
                {isDefined(tags) &&
                    tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
            </div>
            <Label>{etc}</Label>
            <div className='flex gap-1 text-sm'>
                <TaskDialog
                    taskId={taskId}
                    listId={listId}
                    mode='update'
                    refetch={refetch}
                />
                <AlertDialog
                    key='delete'
                    Icon={<TrashIcon />}
                    onClick={taskDeleteCallback}
                    openLabel='task.delete.actionButton'
                    title='task.delete.title'
                    cancelLabel='task.delete.cancelLabel'
                    continueLabel='task.delete.continueLabel'
                />
            </div>
        </div>
    );
};

Task.displayName = 'components.Task';
