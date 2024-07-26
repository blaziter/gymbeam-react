'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { getTags, isDefined } from '@lib';
import { cs } from 'date-fns/locale';
import React, { Attributes, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@components/Button';
import { Dialog } from '@components/Dialog';
import { Calendar, DialogFooter } from '@components/ui';
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

type AddTaskModalProps = {
    listId?: string;
    taskId?: string;
    key?: Attributes['key'];
    mode: 'create' | 'update';
    refetch?: () => void;
};

export const TaskDialog = ({
    listId,
    taskId,
    mode,
    refetch,
    ...props
}: AddTaskModalProps) => {
    const { tb, lang } = useNextTranslation(TaskDialog.displayName);
    const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined);
    const [open, setOpen] = React.useState(false);

    const { data } = useApi(
        [todoListApi.getTask.key, { listId, taskId }],
        ({ queryKey }) =>
            todoListApi.getTask.call(queryKey[1]).then((res) => {
                form.reset();

                return res;
            })
    );

    const defaultValues = useMemo(() => {
        switch (mode) {
            case 'create':
                return {
                    name: '',
                    priority: '1',
                    completed: false,
                    dueDate: new Date(),
                    tags: '',
                    etc: '',
                };
            case 'update':
                if (isDefined(data)) {
                    setDueDate(data.dueDate);

                    return {
                        name: data.name,
                        priority: data.priority,
                        completed: data.completed,
                        dueDate: data.dueDate,
                        tags: data.tags.length > 0 ? data.tags.join(', ') : '',
                        etc: data.etc,
                    };
                }
                break;

            default:
                throw new Error('Invalid mode');
        }
    }, [data, mode, setDueDate]);

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
                        await todoListApi.createTask
                            .call(
                                {
                                    listId,
                                },
                                {
                                    tags: isDefined(inputData.tags)
                                        ? getTags(inputData.tags)
                                        : undefined,
                                    name: inputData.name,
                                    completed: inputData.completed,
                                    priority: inputData.priority,
                                    dueDate: inputData.dueDate,
                                    etc: inputData.etc,
                                }
                            )
                            .then((res) => {
                                form.reset();

                                if (res.status === 201) {
                                    refetch?.();
                                    setOpen(false);
                                }
                            });
                    }
                    break;
                case 'update':
                    if (isDefined(listId) && isDefined(taskId)) {
                        await todoListApi.updateTask
                            .call(
                                {
                                    listId,
                                    taskId,
                                },
                                {
                                    tags: isDefined(inputData.tags)
                                        ? getTags(inputData.tags)
                                        : undefined,
                                    name: inputData.name,
                                    completed: inputData.completed,
                                    priority: inputData.priority,
                                    dueDate: inputData.dueDate,
                                    etc: inputData.etc,
                                }
                            )
                            .then((res) => {
                                form.reset();

                                if (res.status === 200) {
                                    refetch?.();
                                    setOpen(false);
                                }
                            });
                    }
                    break;
                default:
                    throw new Error('Invalid mode');
            }
        },
        [listId, mode, taskId, form, refetch]
    );

    return (
        <Dialog
            key={props.key}
            open={open}
            onOpenChange={setOpen}
            openLabel={tb(`openLabel.${mode}`)}
            title={tb(`title.${mode}`)}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitCallback)}>
                    <div className='flex gap-4'>
                        <div>
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
                            {mode === 'update' && (
                                <FormField
                                    name='completed'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {tb('completed')}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='checkbox'
                                                    checked={
                                                        field.value || false
                                                    }
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.checked
                                                        )
                                                    }
                                                    onBlur={field.onBlur}
                                                    disabled={field.disabled}
                                                    name={field.name}
                                                    ref={field.ref}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            {/* solution by string input,
                        in api post request there will be string transformer,
                        which will divide and somewhat make tags */}
                            <FormField
                                name='tags'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{tb('tags')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                name='etc'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{tb('etc')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name='priority'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{tb('priority')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                min={1}
                                                max={10}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        name='dueDate'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{tb('dueDate')}</FormLabel>
                                <FormControl className='mx-auto'>
                                    <Calendar
                                        className='border border-gray-300 rounded-md max-w-fit'
                                        mode='single'
                                        selected={dueDate}
                                        onSelect={(newDate) => {
                                            field.onChange(newDate);
                                            setDueDate(newDate);
                                        }}
                                        weekStartsOn={1}
                                        locale={lang === 'cs' ? cs : undefined}
                                        {...field}
                                    />
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

TaskDialog.displayName = 'components.feature.TaskDialog';

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Task should have at least 2 characters.',
    }),
    completed: z.boolean().optional(),
    priority: z.string().optional(),
    dueDate: z.date(),
    tags: z.string().optional(),
    etc: z.string().optional(),
});
