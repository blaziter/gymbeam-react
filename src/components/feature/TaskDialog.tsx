'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cs } from 'date-fns/locale';
import React, { Attributes } from 'react';
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

import { useNextTranslation } from '@lib/hooks';

type AddTaskModalProps = {
    listId?: string;
    taskId?: string;
    key?: Attributes['key'];
    mode: 'create' | 'update';
};

export const TaskDialog = ({
    key,
    listId,
    taskId,
    mode,
}: AddTaskModalProps) => {
    const { tb, lang } = useNextTranslation(TaskDialog.displayName);
    const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            completed: false,
            priority: 1,
            dueDate: undefined,
            tags: '',
            etc: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {}

    return (
        <Dialog
            key={key}
            openLabel={tb(`openLabel.${mode}`)}
            title={tb('title')}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex gap-4'>
                        <div>
                            <FormField
                                name='name'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{tb('name')}</FormLabel>
                                        <FormControl>
                                            <Input required {...field} />
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
                                                    defaultChecked={false}
                                                    {...field}
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
                                                defaultValue={1}
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
                                        onSelect={setDueDate}
                                        defaultValue={dueDate}
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
    priority: z.number().min(1).max(10),
    dueDate: z.date().optional(),
    tags: z.string().optional(),
    etc: z.string().optional(),
});
