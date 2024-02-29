import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type ClassNames = {
    className?: string;
};
export const Row = ({ children, className }: PropsWithChildren<ClassNames>) => {
    return (
        <div className={twMerge('grid', 'grid-cols-2', 'gap-2', className)}>
            {children}
        </div>
    );
};

export const Column = ({
    children,
    className,
}: PropsWithChildren<ClassNames>) => {
    return (
        <div className={twMerge('flex', 'flex-col', 'gap-2', className)}>
            {children}
        </div>
    );
};

export const Narrow = ({
    children,
    className,
}: PropsWithChildren<ClassNames>) => {
    return <div className={twMerge('w-80', className)}>{children}</div>;
};
