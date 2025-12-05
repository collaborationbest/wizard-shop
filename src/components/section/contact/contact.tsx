import { Button, Text } from '@/components/ui';

import styles from './contact.module.scss';

export const Contact = () => {
    return (
        <section className={styles.contact}>
            <Text size='md' variant='light'>
                Рулетка временно не работает, следите за обновлениями в нашем
                телеграмм канале
            </Text>
            <Button size='md'>
                <div className={styles.buttonLabel}>ССЫЛКА</div>
            </Button>
        </section>
    );
};
