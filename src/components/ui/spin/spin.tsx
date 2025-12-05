'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import styles from './spin.module.scss';
import { Gem } from '../gem/gem';
import Image from 'next/image';

export type SpinItem = {
    id: string;
    img: string;
    win: boolean;
};

export type SpinProps = {
    items: SpinItem[];
    spinDurationMs?: number;
    spinTurns?: number;
    isStart?: boolean;
    setIsStart?: (value: boolean) => void;
    onSelect?: (item: SpinItem) => void;
    onEnd?: (value: boolean) => void;
};

const DEFAULT_SPIN_DURATION_MS = 4000;
const DEFAULT_SPIN_TURNS = 5;
const LABEL_TOP = 65;
const LABEL_LEFT = 40;

export const Spin = ({
    items,
    spinDurationMs = DEFAULT_SPIN_DURATION_MS,
    spinTurns = DEFAULT_SPIN_TURNS,
    isStart = false,
    setIsStart,
    onSelect,
    onEnd,
}: SpinProps) => {
    const angleStep = useMemo(
        () => (items.length > 0 ? 360 / items.length : 0),
        [items.length],
    );

    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const rotationRef = useRef(rotation);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        rotationRef.current = rotation;
    }, [rotation]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const getSelectedItemIndex = useCallback(
        (rotationValue: number): number | null => {
            if (items.length === 0 || angleStep === 0) {
                return null;
            }

            const normalizedRotation = ((rotationValue % 360) + 360) % 360;
            const pointerAngle = (360 - normalizedRotation) % 360;
            const baseIndex = Math.floor(pointerAngle / angleStep);
            const remainder = pointerAngle % angleStep;

            const epsilon = 0.0001;
            if (remainder < epsilon) {
                return (baseIndex + items.length) % items.length;
            }

            return (baseIndex + 1) % items.length;
        },
        [angleStep, items.length],
    );

    const startSpin = useCallback(() => {
        if (isSpinning || items.length === 0 || angleStep === 0) {
            return;
        }

        const targetIndex = Math.floor(Math.random() * items.length);
        const currentRotation = rotationRef.current;

        const normalizedRotation = ((currentRotation % 360) + 360) % 360;
        const randomDeviation = Math.random() * angleStep;
        const desiredPointerAngle =
            (((targetIndex * angleStep - randomDeviation) % 360) + 360) % 360;
        const desiredNormalizedRotation = (360 - desiredPointerAngle) % 360;
        const deltaRotation =
            (normalizedRotation - desiredNormalizedRotation + 360) % 360;
        const targetRotation =
            currentRotation - spinTurns * 360 - deltaRotation;

        setIsSpinning(true);
        onEnd?.(false);
        rotationRef.current = targetRotation;
        setRotation(targetRotation);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setIsSpinning(false);
            const selectedIndex = getSelectedItemIndex(rotationRef.current);
            if (selectedIndex !== null) {
                onSelect?.(items[selectedIndex]);
            }
            onEnd?.(true);
            timeoutRef.current = null;
        }, spinDurationMs);
    }, [
        angleStep,
        getSelectedItemIndex,
        isSpinning,
        items,
        onEnd,
        onSelect,
        spinDurationMs,
        spinTurns,
    ]);

    useEffect(() => {
        if (isStart) {
            startSpin();
            setIsStart?.(false);
        }
    }, [isStart, startSpin]);

    const markersStyle: CSSProperties = {
        transform: `rotate(${rotation}deg)`,
        transition: isSpinning
            ? `transform ${spinDurationMs}ms cubic-bezier(0.23, 1, 0.32, 1)`
            : undefined,
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.gem}>
                    <Gem />
                </div>
                <div className={styles.wrap}></div>
                <button
                    type='button'
                    className={styles.logoButton}
                    onClick={startSpin}
                    disabled={isSpinning}
                    aria-label='Spin the wheel'
                >
                    <Image
                        src={'/static/background.png'}
                        width={60}
                        height={60}
                        alt='Spin button'
                        className={styles.logo}
                    />
                </button>

                <div className={styles.markers} style={markersStyle}>
                    {items.map((item, index) => {
                        const markerRotationStyle: CSSProperties = {
                            transform: `rotate(${index * angleStep}deg)`,
                        };

                        return (
                            <div
                                key={`marker-${item.id}-${index}`}
                                className={styles.marker}
                                style={markerRotationStyle}
                            >
                                <div className={styles.line}></div>
                                <div className={styles.dot}></div>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.labels} style={markersStyle}>
                    {items.map((item, index) => {
                        const rotation = index * angleStep;
                        const labelShellStyle: CSSProperties = {
                            transform: `rotate(${rotation}deg)`,
                        };
                        const badgeWrapperStyle: CSSProperties = {
                            transform: `translate(-50%, -50%) translateY(-${LABEL_TOP}px) translateX(-${LABEL_LEFT}px) rotate(${-20}deg)`,
                        };

                        return (
                            <div
                                key={`label-${item.id}-${index}`}
                                className={styles.label}
                                style={labelShellStyle}
                            >
                                <div
                                    className={styles.badgeWrapper}
                                    style={badgeWrapperStyle}
                                >
                                    <span className={styles.iconBadge}>
                                        <Image
                                            src={item.img}
                                            width={50}
                                            height={30}
                                            alt={item.id}
                                        />
                                        <div className={styles.shadow}></div>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
