import styles from './index.module.css';

export type TitleColor = 'yellow' | 'green';

export const Title = ({
    class: classList,
    children,
    color,
}: {
    children: string;
    class?: string;
    color?: TitleColor;
}) => {
    const gradientPattern = `linear-gradient(
        90deg,
        rgb(12, 138, 40, 1) 0%,
        rgba(12, 138, 40, 1) 60%,
        rgba(12, 138, 40, 0) 100%
    )`;
    return (
        <div className={[classList, styles.container].join(' ')}>
            <h2 className={styles.title} data-color={color || 'green'}>
                {children || 'no-title'}
            </h2>
        </div>
    );
};
