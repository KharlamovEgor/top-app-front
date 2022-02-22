import { CardProps } from './Card.props';
import cn from 'classnames';
import styles from './Card.module.css';
import { ForwardedRef, forwardRef } from 'react';

export const Card = forwardRef(
	(
		{ color = 'white', children, className, ...props }: CardProps,
		ref: ForwardedRef<HTMLDivElement>,
	): JSX.Element => {
		return (
			<div
				ref={ref}
				className={cn(styles.card, className, {
					[styles.blue]: color == 'blue',
				})}
				{...props}
			>
				{children}
			</div>
		);
	},
);
