import { zodResolver } from '@hookform/resolvers/zod';
import React, { Attributes } from 'react';
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

import { useNextTranslation } from '@lib/hooks';

type AddListModalProps = {
    key: Attributes['key'];
    mode: 'create' | 'update';
};

export const ListDialog = ({ key, mode }: AddListModalProps) => {
    const { tb } = useNextTranslation(ListDialog.displayName);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
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
