import { type HTMLAttributes, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const GreyButton = (
	props: PropsWithChildren<HTMLAttributes<HTMLButtonElement>> & {
		selected: boolean;
	},
) => {
	const { className, selected, children, ...rest } = props;
	return (
		<button
			className={twMerge(
				'border border-slate-200 rounded-sm drop-shadow-sm hover:dropshadow-none p-2',
				selected ? 'bg-lime-400 hover:bg-lime-300' : 'bg-slate-300 hover:bg-slate-200',
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	);
};

export default GreyButton;
