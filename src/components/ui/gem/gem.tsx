import Image from 'next/image';
import styles from './gem.module.scss';

export const Gem = () => {
    return (
        <div className={styles.container}>
            <svg
                width='100%'
                height='100%'
                viewBox='0 0 118 110'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M58.6667 110L0 4.88889L57.037 0L117.333 4.88889L58.6667 110Z'
                    fill='#A5FCF8'
                />
                <path
                    d='M58 90L9 8.77778L56.6389 5L107 8.77778L58 90Z'
                    fill='#06BCF7'
                />
            </svg>
            <Image
                src={'/static/gem.png'}
                width={30}
                height={30}
                alt='Gem'
                className={styles.gem}
            />
        </div>
    );
};
