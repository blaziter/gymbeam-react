import { DialogProps as DialogComponentProps } from '@radix-ui/react-dialog';
import React, { Attributes } from 'react';

import { Button } from '@components';
import {
    Dialog as DialogComponent,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@components/ui';

type DialogProps = {
    key: Attributes['key'];
    openLabel: string;
    title: string;
    description?: string;
    children: React.ReactNode;
} & DialogComponentProps;

export const Dialog = ({
    key,
    openLabel,
    title,
    description,
    children,
    ...props
}: DialogProps) => {
    return (
        <DialogComponent key={key} {...props}>
            <DialogTrigger asChild>
                <Button variant='outline'>{openLabel}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </DialogComponent>
    );
};

Dialog.displayName = 'components.Dialog';
