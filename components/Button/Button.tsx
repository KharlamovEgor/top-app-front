import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import ArrowIcon from './arrow.svg';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

export const Button = ({
	appearance,
	arrow = 'none',
	children,
	className,
	...props
}: ButtonProps): JSX.Element => {
	const scale = useMotionValue(1);

	useEffect(() => {
		scale.onChange((s) => console.log(s));
	}, []);

	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost',
			})}
			style={{ scale }}
			{...props}
		>
			{children}
			{arrow != 'none' && (
				<ArrowIcon
					className={cn(styles.arrow, {
						[styles.down]: arrow == 'down',
					})}
				/>
			)}
		</motion.button>
	);
};
