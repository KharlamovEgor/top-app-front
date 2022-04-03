import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps
	extends Omit<
		DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
		'onAnimationStart' | 'onDragStart' | 'onDrag' | 'onDragEnd' | 'ref'
	> {
	children: ReactNode;
	appearance: 'primary' | 'ghost';
	arrow?: 'down' | 'right' | 'none';
}
