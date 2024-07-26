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
    refetch?: () => void;
};

export const ListDialog = ({
    mode,
    listId,
    refetch,
    ...props
}: AddListModalProps) => {
    const { tb } = useNextTranslation(ListDialog.displayName);
    const [open, setOpen] = React.useState(false);

    const { data } = useApi(
        [todoListApi.getOneList.key, { listId }],
        (queryKey) =>
            todoListApi.getOneList.call(queryKey[1]).then((res) => {
                form.reset();

                return res;
            })
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => {
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
        }, [data, mode]),
    });

    const onSubmitCallback = useCallback(
        async (values: any) => {
            const inputData = formSchema.parse(values);

            switch (mode) {
                case 'create':
                    await todoListApi.createList
                        .call({
                            ...inputData,
                        })
                        .then((res) => {
                            form.reset();

                            if (res.status === 201) {
                                refetch?.();
                                setOpen(false);
                            }
                        });
                    break;
                case 'update':
                    if (isDefined(listId)) {
                        await todoListApi.updateList
                            .call(
                                {
                                    listId,
                                },
                                {
                                    ...inputData,
                                }
                            )
                            .then((res) => {
                                form.reset();
                                refetch?.();

                                if (res.status === 200) {
                                    setOpen(false);
                                }
                            });
                    }
                    break;
                default:
                    throw new Error('Invalid mode');
            }
        },
        [listId, mode, form, refetch]
    );

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
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
