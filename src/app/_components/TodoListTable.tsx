'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Table, TasksList } from '@components';
import { Button } from '@components/Button';
import { ListDialog, TaskDialog } from '@components/feature';

import { todoListApi, useApi, useNextTranslation } from '@lib/hooks';
import { List } from '@lib/model';

export const TodoListTable = () => {
    const router = useRouter();
    const { tb } = useNextTranslation(Table.displayName);
    const { data, refetch } = useApi([todoListApi.getAllLists.key], () =>
        todoListApi.getAllLists.call()
    );

    const deleteListCallback = useCallback(
        (id: string) => {
            todoListApi.deleteList.call({ listId: id }).then((res) => {
                res.status === 200 && refetch();
            });
        },
        [refetch]
    );

    return (
        <Table<List>
            title={tb('todoListTable.title')}
            actions={<ListDialog key='add' mode='create' />}
            columns={[
                {
                    name: tb('todoListTable.name'),
                    cell: (row) => <div>{row.name}</div>,
                },
            ]}
            data={data}
            expandableRows
            expandableRowsComponent={(row) => (
                <TasksList
                    listId={row.data.id}
                    className='m-4'
                    refetch={refetch}
                />
            )}
            rowDetail={(row) => router.push(`/list/${row.id}`)}
            actionColumns={(row) => [
                <TaskDialog
                    key='add'
                    listId={row.id}
                    mode='create'
                    refetch={refetch}
                />,
                <Button
                    Icon={<TrashIcon />}
                    variant='danger'
                    key='delete'
                    onClick={() => deleteListCallback(row.id)}
                >
                    {tb('todoListTable.actionColumns.delete')}
                </Button>,
            ]}
            refetch={refetch}
        />
    );
};
