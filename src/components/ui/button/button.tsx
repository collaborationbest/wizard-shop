import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

export type ButtonVariant = 'primary';
export type ButtonSize = 'md' | 'lg';

export type ButtonProps = {
    size?: ButtonSize;
    fullWidth?: boolean;
    ariaLabel?: string;
    children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    function Button(
        {
            children,
            ariaLabel = 'Button',
            className,
            size = 'md',
            fullWidth = false,
            type = 'button',
            ...rest
        },
        ref,
    ) {
        return (
            <button
                role='button'
                aria-label={ariaLabel}
                ref={ref}
                type={type}
                className={classNames(styles.button, styles[size], className, {
                    [styles.fullWidth]: fullWidth,
                    [styles.disabled]: rest.disabled,
                })}
                {...rest}
            >
                <span className={styles.label}>{children}</span>
            </button>
        );
    },
);
