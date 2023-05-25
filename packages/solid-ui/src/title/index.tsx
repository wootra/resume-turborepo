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
        <div class={classList}>
            <h2 class={styles.title} data-color={color || 'green'}>
                {children || 'no-title'}
            </h2>
        </div>
    );
};
