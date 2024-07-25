import useTranslation from 'next-translate/useTranslation';

import { isDefined, isEmptyString } from '@lib/validation';

export const useNextTranslation = (scope?: string) => {
    const translation = useTranslation();

    /* translation with base */
    const tb = (key: string, options?: Record<string, string>) => {
        return translation.t(
            isDefined(!isEmptyString(scope)) ? `${scope}.${key}` : key,
            options
        );
    };

    return {
        tb,
        ...translation,
    };
};
