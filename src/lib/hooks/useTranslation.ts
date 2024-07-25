import useTranslation from 'next-translate/useTranslation';

export const useNextTranslation = (scope?: string) => {
    const translation = useTranslation();

    const tb = (key: string) => {
        return translation.t(scope ? `${scope}.${key}` : key);
    };

    return {
        tb,
        ...translation,
    };
};
