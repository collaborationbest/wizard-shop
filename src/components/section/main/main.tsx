'use client';
import Image from 'next/image';

import { Button, Modal, Text } from '@/components/ui';
import { Spin } from '@/components/ui/spin/spin';

import styles from './main.module.scss';
import { useMain } from './use-main';

const formatCooldown = (totalSeconds: number) => {
    const seconds = Math.max(0, totalSeconds);

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const pad = (value: number) => value.toString().padStart(2, '0');

    if (days > 0) {
        return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    }

    if (hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    }

    return `${pad(minutes)}:${pad(secs)}`;
};

export const Main = () => {
    const {
        SPIN_ITEMS,
        selectedItem,
        isModalOpen,
        isStart,
        isSpinning,
        cooldownSeconds,
        handleStart,
        setIsModalOpen,
        setIsStart,
        handleSelect,
    } = useMain();

    const handleCloseModal = () => setIsModalOpen(false);

    const renderButtonContent = () => {
        if (isSpinning) {
            return 'Spinning...';
        }

        if (cooldownSeconds > 0) {
            const formatted = formatCooldown(cooldownSeconds);
            const isLongFormat = formatted.split(':').length === 4;
            const className = [
                styles.cooldownLabel,
                isLongFormat ? styles.cooldownLong : '',
            ]
                .filter(Boolean)
                .join(' ');

            return <span className={className}>{formatted}</span>;
        }

        return 'Spin';
    };

    return (
        <section className={styles.main}>
            <Spin
                items={SPIN_ITEMS}
                isStart={isStart}
                setIsStart={setIsStart}
                onSelect={handleSelect}
            />
            <Button
                onClick={handleStart}
                size='lg'
                disabled={isStart || isSpinning || cooldownSeconds > 0}
            >
                {renderButtonContent()}
            </Button>
            <Modal
                isOpen={isModalOpen}
                handleClose={handleCloseModal}
                key={selectedItem?.img}
            >
                <div className={styles.modalContent}>
                    <Text size='md' variant='light'>
                        {selectedItem?.win
                            ? 'ПОЗДРАВЛЯЕМ! ВОТ ВАШ ПРИЗ'
                            : 'ПОВЕЗЁТ В СЛЕДУЮЩИЙ РАЗ'}
                    </Text>
                    <div className={styles.wrap}>
                        {selectedItem?.img ? (
                            <div className={styles.image}>
                                <Image
                                    key={selectedItem?.img}
                                    src={selectedItem.img}
                                    alt={selectedItem.id}
                                    width={100}
                                    height={100}
                                />
                                <div className={styles.shadow}></div>
                            </div>
                        ) : null}
                        {selectedItem?.win && (
                            <div className={styles.winText}>Гроші</div>
                        )}

                        <Button size='md'>
                            {selectedItem?.win ? (
                                <div className={styles.winLabel}>ЗАБРАТЬ</div>
                            ) : (
                                <div className={styles.loseLabel}>
                                    ПОВТОРИТЬ
                                </div>
                            )}
                        </Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};
