import classNames from 'classnames';
import * as React from 'react';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    Icon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, Icon, variant = 'primary', children, ...props }, ref) => {
        const variantClass = React.useMemo(() => {
            switch (variant) {
                case 'primary':
                    return 'bg-blue-500 text-white';
                case 'secondary':
                    return 'bg-gray-300 text-gray-800';
                case 'tertiary':
                    return 'bg-transparent text-blue-500';
                case 'danger':
                    return 'bg-red-500 text-white';
                case 'outline':
                    return 'border border-gray-300 text-gray-800';
            }
        }, [variant]);

        return (
            <button
                className={classNames(
                    `px-3 py-2 rounded-md ${variantClass} flex flex-row gap-1 items-center min-w-fit`,
                    className
                )}
                {...props}
                ref={ref}
            >
                {Icon}
                {children}
            </button>
        );
    }
);

Button.displayName = 'components.Button';
