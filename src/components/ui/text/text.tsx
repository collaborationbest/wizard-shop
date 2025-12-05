import { forwardRef, type HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './text.module.scss';

export type TextVariant = 'primary' | 'light';
export type TextSize = 'md' | 'lg';

export type TextProps = {
    variant?: TextVariant;
    size?: TextSize;
} & HTMLAttributes<HTMLParagraphElement>;

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
    { variant = 'primary', size = 'md', className, children, ...rest },
    ref,
) {
    return (
        <p
            ref={ref}
            className={classNames(
                styles.text,
                styles[variant],
                styles[size],
                className,
            )}
            {...rest}
        >
            {children}
        </p>
    );
});
