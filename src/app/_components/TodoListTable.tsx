'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

import { Table, TasksList } from '@components';
import { Button } from '@components/Button';
import { TaskDialog } from '@components/feature';

import { todoListApi, useApi, useNextTranslation } from '@lib/hooks';
import { List } from '@lib/model';

export const TodoListTable = () => {
    const router = useRouter();
    const { tb } = useNextTranslation(Table.displayName);
    const { data, refetch } = useApi([todoListApi.getAllLists.key], () =>
        todoListApi.getAllLists.call()
    );

    return (
        <Table<List>
            title={tb('todoListTable.title')}
            columns={[
                {
                    name: tb('todoListTable.name'),
                    cell: (row) => <div>{row.name}</div>,
                },
            ]}
            data={data}
            expandableRows
            expandableRowsComponent={(row) => (
                <TasksList listId={row.data.id} className='m-4' />
            )}
            rowDetail={(row) => router.push(`/list/${row.id}`)}
            actionColumns={[
                <TaskDialog key='add' mode='create' />,
                <Button Icon={<TrashIcon />} variant='danger' key='delete'>
                    {tb('todoListTable.actionColumns.delete')}
                </Button>,
            ]}
            refetch={refetch}
        />
    );
};
