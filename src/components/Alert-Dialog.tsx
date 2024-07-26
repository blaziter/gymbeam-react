import { isDefined } from '@lib';
import React from 'react';

import { Button } from './Button';
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialog as AlertDialogComponent,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui';

import { useNextTranslation } from '@lib/hooks';

type AlertDialogProps = {
    Icon?: React.ReactNode;
    openLabel: string;
    title: string;
    description?: string;
    cancelLabel: string;
    continueLabel: string;
    onClick?: () => void;
    key: React.Attributes['key'];
};

export const AlertDialog = ({
    Icon,
    openLabel,
    title,
    description,
    cancelLabel,
    continueLabel,
    onClick,
    ...props
}: AlertDialogProps) => {
    const { tb } = useNextTranslation(AlertDialog.displayName);

    return (
        <AlertDialogComponent {...props}>
            <AlertDialogTrigger>
                <Button Icon={Icon} variant='danger'>
                    {tb(openLabel)}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{tb(title)}</AlertDialogTitle>
                    {isDefined(description) && (
                        <AlertDialogDescription>
                            {tb(description)}
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{tb(cancelLabel)}</AlertDialogCancel>
                    <AlertDialogAction onClick={onClick}>
                        {tb(continueLabel)}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogComponent>
    );
};

AlertDialog.displayName = 'components.AlertDialog';
