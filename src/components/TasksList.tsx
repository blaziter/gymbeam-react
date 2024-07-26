'use client';

import classNames from 'classnames';

import { Task } from '@components';

import { todoListApi, useApi } from '@lib/hooks';

type TasksListProps = {
    listId: string;
    className?: string;
    refetch?: () => void;
};

export const TasksList = ({ listId, ...props }: TasksListProps) => {
    const { data } = useApi(
        [todoListApi.getAllTasks.key, { listId: listId }],
        ({ queryKey }) => todoListApi.getAllTasks.call(queryKey[1])
    );

    return (
        <div
            className={classNames(
                'flex flex-col flex-basis-0 max-w-full min-w-[100px] p-8',
                props.className
            )}
        >
            {data?.map((task) => (
                <Task
                    key={task.id}
                    listId={listId}
                    taskId={task.id}
                    refetch={props.refetch}
                    {...task}
                />
            ))}
        </div>
    );
};
