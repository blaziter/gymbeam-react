'use client';

import { isDefined } from '@lib';
import { ChevronRightIcon, ReloadIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import DataTable, {
    TableProps as TableComponentProps,
} from 'react-data-table-component';

import { Button } from './Button';

import { useNextTranslation } from '@lib/hooks';

type TableProps<T> = {
    data: Array<T> | undefined;
    actionColumns?: (row: T) => Array<React.ReactNode> | React.ReactNode;
    paginationPerPage?: number;
    rowDetail?: (row: T) => void | (() => void);
    refetch?: () => void;
} & Omit<TableComponentProps<T>, 'data' | 'paginationPerPage'>;

export const Table = <T,>({
    data,
    columns,
    actionColumns,
    rowDetail,
    paginationPerPage = 10,
    expandableRowsComponent,
    refetch,
    title,
    actions,
    ...props
}: TableProps<T>) => {
    const { tb } = useNextTranslation(Table.displayName);

    const count = useMemo(() => {
        return isDefined(data) ? data.length : 0;
    }, [data]);

    return (
        <div
            className={classNames(
                'border border-gray-300 rounded-md p-4',
                props.className
            )}
        >
            <DataTable<T>
                title={<div className='text-base'>{title}</div>}
                actions={
                    <div className='flex gap-1 text-sm'>
                        {[
                            actions,
                            isDefined(refetch) ? (
                                <Button
                                    className='text-sm'
                                    key='refresh'
                                    onClick={refetch}
                                    variant='primary'
                                    Icon={<ReloadIcon />}
                                >
                                    {tb('refresh')}
                                </Button>
                            ) : undefined,
                        ]}
                    </div>
                }
                data={isDefined(data) ? data : []}
                columns={[
                    ...columns,
                    {
                        name: tb('actions'),
                        cell: (row) => (
                            <div className='flex gap-2 min-w-max'>
                                {isDefined(actionColumns)
                                    ? actionColumns(row)
                                    : undefined}
                                <Button
                                    variant='tertiary'
                                    className='flex'
                                    onClick={
                                        isDefined(rowDetail)
                                            ? () => rowDetail(row)
                                            : undefined
                                    }
                                >
                                    {tb('detail')} <ChevronRightIcon />
                                </Button>
                            </div>
                        ),
                    },
                ]}
                pagination
                paginationTotalRows={count}
                paginationPerPage={paginationPerPage}
                expandableRowsComponent={expandableRowsComponent}
                {...props}
            />
        </div>
    );
};

Table.displayName = 'components.Table';
