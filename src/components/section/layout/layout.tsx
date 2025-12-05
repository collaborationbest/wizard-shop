'use client';

import styles from './layout.module.scss';
import { Head } from '../head/head';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.layout}>
            <Head />
            {children}
        </div>
    );
};
