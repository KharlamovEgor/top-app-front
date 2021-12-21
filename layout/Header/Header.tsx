import { HeaderProps } from './Header.props';
import styles from './Header.module.css';

export const Header = ({ ...props }: HeaderProps) => {
	return <div {...props}>Header</div>;
};
