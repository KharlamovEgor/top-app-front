import { KeyboardEvent } from 'react';
import { Button, Input } from '..';
import { SearchProps } from './Search.props';
import SearchIcon from './search.svg';
import cn from 'classnames';
import styles from './Search.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearch = () => {
		router.push({
			pathname: '/search',
			query: {
				q: search,
			},
		});
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key == 'Enter') {
			goToSearch();
		}
	};

	return (
		<div className={cn(styles.search, className)} {...props}>
			<Input
				className={styles.input}
				placeholder="Поиск..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				aria-label="Искать по сайту"
				appearance="primary"
				className={styles.button}
				onClick={goToSearch}
			>
				<SearchIcon />
			</Button>
		</div>
	);
};
