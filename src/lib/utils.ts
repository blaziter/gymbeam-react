import { type ClassValue, clsx } from 'clsx';
import { isEmpty } from 'lodash';
import { twMerge } from 'tailwind-merge';

import { isEmptyString } from './validation';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getTags = (tags: string): string[] => {
    const result = tags.split(',').map((tag) => tag.trim());

    if (!isEmpty(result)) {
        result.map(
            (tag) => isEmptyString(tag) && result.splice(result.indexOf(tag), 1)
        );
    }

    return result;
};
