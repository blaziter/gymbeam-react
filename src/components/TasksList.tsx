'use client';

import { Task } from '@components';

import { todoListApi, useApi } from '@lib/hooks';

type TasksListProps = {
    listId: string;
    taskId?: string;
    className?: string;
};

export const TasksList = (props: TasksListProps) => {
    const { data } = useApi(
        ['get-tasks', { id: props.listId }],
        ({ queryKey }) => todoListApi.getAllTasks(queryKey[1])
    );

    return (
        <div className='flex flex-col flex-basis-0 max-w-full min-w-[100px] p-8'>
            {data?.map((task) => <Task key={task.id} {...task} />)}
        </div>
    );
};
