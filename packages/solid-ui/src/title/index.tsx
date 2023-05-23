import styles from './index.module.css';

export const Title = ({
    class: classList,
    children,
}: {
    children: string;
    class?: string;
}) => {
    return (
        <div class={classList}>
            <h2 class={styles.title}>{children || 'no-title'}</h2>
        </div>
    );
};
