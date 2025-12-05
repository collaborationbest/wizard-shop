import { MouseEventHandler, useEffect } from 'react';

export type UseModalProps = {
    isOpen: boolean;
    lockScroll?: boolean;
    closeOnBackdropClick?: boolean;
    handleClose: () => void;
};

export const useModal = ({
    isOpen,
    lockScroll = true,
    closeOnBackdropClick = true,
    handleClose,
}: UseModalProps) => {
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [handleClose, isOpen]);

    useEffect(() => {
        if (!lockScroll) {
            return;
        }

        if (!isOpen) {
            return;
        }

        const { body } = document;
        const previousOverflow = body.style.overflow;
        body.style.overflow = 'hidden';

        return () => {
            body.style.overflow = previousOverflow;
        };
    }, [isOpen, lockScroll]);

    const handleOverlayClick: MouseEventHandler<HTMLDivElement> = () => {
        if (closeOnBackdropClick) {
            handleClose();
        }
    };

    const stopPropagation: MouseEventHandler<HTMLDivElement> = event => {
        event.stopPropagation();
    };

    return {
        handleOverlayClick,
        stopPropagation,
    };
};
