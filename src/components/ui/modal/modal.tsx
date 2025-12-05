'use client';
import { type ReactNode } from 'react';
import classNames from 'classnames';

import styles from './modal.module.scss';
import { useModal } from './use-modal';

export type ModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    children?: ReactNode;
    className?: string;
    overlayClassName?: string;
    closeOnBackdropClick?: boolean;
    lockScroll?: boolean;
    labelledBy?: string;
    describedBy?: string;
};

export const Modal = ({
    isOpen,
    handleClose,
    children,
    className,
    overlayClassName,
    closeOnBackdropClick = true,
    lockScroll = true,
    labelledBy,
    describedBy,
}: ModalProps) => {
    const { handleOverlayClick, stopPropagation } = useModal({
        isOpen,
        handleClose,
        closeOnBackdropClick,
        lockScroll,
    });

    if (!isOpen) {
        return null;
    }

    return (
        <div
            role='dialog'
            aria-modal='true'
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
            className={classNames(styles.modal)}
        >
            <div
                className={classNames(styles.overlay, overlayClassName)}
                onClick={handleOverlayClick}
                aria-hidden='true'
            />
            <div
                className={classNames(styles.content, className)}
                onClick={stopPropagation}
            >
                {children}
            </div>
        </div>
    );
};
