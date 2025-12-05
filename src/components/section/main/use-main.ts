import { useCallback, useEffect, useState } from 'react';

import { SpinItem } from '@/components/ui';

const COOLDOWN_DURATION_SECONDS = 3;

export const useMain = () => {
    const [selectedItem, setSelectedItem] = useState<SpinItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isStart, setIsStart] = useState<boolean>(false);
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [cooldownSeconds, setCooldownSeconds] = useState<number>(0);

    const handleSelect = useCallback((item: SpinItem) => {
        setSelectedItem(item);
    }, []);

    const SPIN_ITEMS: SpinItem[] = [
        {
            id: 'dollar',
            img: '/items/dollar.png',
            win: true,
        },
        {
            id: 'bucket',
            img: '/items/bucket.png',
            win: true,
        },
        {
            id: 'failed',
            img: '/items/failed.png',
            win: false,
        },
        {
            id: 'dollar',
            img: '/items/dollar.png',
            win: true,
        },
        {
            id: 'bucket',
            img: '/items/bucket.png',
            win: true,
        },
        {
            id: 'failed',
            img: '/items/failed.png',
            win: false,
        },
    ];

    const handleStart = useCallback(() => {
        if (isSpinning || cooldownSeconds > 0) {
            return;
        }

        setSelectedItem(null);
        setIsStart(true);
        setIsSpinning(true);
    }, [cooldownSeconds, isSpinning]);

    useEffect(() => {
        if (selectedItem) {
            setIsModalOpen(true);
            setIsSpinning(false);
            setCooldownSeconds(COOLDOWN_DURATION_SECONDS);
        }
    }, [selectedItem]);

    useEffect(() => {
        if (cooldownSeconds <= 0) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setCooldownSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [cooldownSeconds]);

    return {
        SPIN_ITEMS,
        selectedItem,
        isModalOpen,
        isStart,
        isSpinning,
        cooldownSeconds,
        setIsModalOpen,
        setIsStart,
        handleSelect,
        handleStart,
    };
};
