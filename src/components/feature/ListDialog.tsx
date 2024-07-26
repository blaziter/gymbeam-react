'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { isDefined } from '@lib';
import React, { Attributes, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@components/Button';
import { Dialog } from '@components/Dialog';
import { DialogFooter } from '@components/ui';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';

import { todoListApi, useApi, useNextTranslation } from '@lib/hooks';

type AddListModalProps = {
    key: Attributes['key'];
    mode: 'create' | 'update';
    taskId?: string;
    listId?: string;
};

export const ListDialog = ({
    mode,
    taskId,
    listId,
    ...props
}: AddListModalProps) => {
    const { tb } = useNextTranslation(ListDialog.displayName);

    const { data } = useApi(
        [todoListApi.getOneList.key, { listId }],
        (queryKey) => todoListApi.getOneList.call(queryKey[1])
    );

    const defaultValues = useMemo(() => {
        switch (mode) {
            case 'create':
                return {
                    name: '',
                };
            case 'update':
                if (isDefined(data)) {
                    return {
                        name: data.name,
                    };
                }
                break;

            default:
                throw new Error('Invalid mode');
        }
    }, [data, mode]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmitCallback = useCallback(
        async (values: any) => {
            const inputData = formSchema.parse(values);

            switch (mode) {
                case 'create':
                    if (isDefined(listId)) {
                        await todoListApi.createList.call({
                            ...inputData,
                        });
                    }
                    break;
                case 'update':
                    if (isDefined(listId) && isDefined(taskId)) {
                        await todoListApi.updateTask.call(
                            {
                                listId,
                                taskId,
                            },
                            {
                                ...inputData,
                            }
                        );
                    }
                    break;
                default:
                    throw new Error('Invalid mode');
            }
        },
        [listId, mode, taskId]
    );

    return (
        <Dialog
            openLabel={tb(`openLabel.${mode}`)}
            title={tb(`title.${mode}`)}
            {...props}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitCallback)}>
                    <FormField
                        name='name'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{tb('name')}</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter className='mt-2'>
                        <Button type='submit'>{tb(`submit.${mode}`)}</Button>
                    </DialogFooter>
                </form>
            </Form>
        </Dialog>
    );
};

ListDialog.displayName = 'components.feature.ListDialog';

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'List should have at least 2 characters.',
    }),
});
