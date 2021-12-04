import React from 'react';
import { Button, Htag, P, Tag } from '../components';

export default function Home(): JSX.Element {
	return (
		<>
			<Htag tag="h1">Текст</Htag>
			<Button appearance="primary" arrow={'right'}>
				Кнопка
			</Button>
			<Button appearance="ghost" arrow={'down'}>
				Кнопка
			</Button>
			<P size="l">Большой</P>
			<P>Средний</P>
			<P>Маленький</P>

			<Tag color="ghost" href="https://vk.com">
				Маленький
			</Tag>
			<Tag size="m" color="ghost" href="https://vk.com">
				Средний
			</Tag>

			<Tag color="green">Маленький</Tag>
			<Tag size="m" color="green">
				Средний
			</Tag>

			<Tag color="grey">Маленький</Tag>
			<Tag size="m" color="grey">
				Средний
			</Tag>

			<Tag color="primary">Маленький</Tag>
			<Tag size="m" color="primary">
				Средний
			</Tag>

			<Tag color="red">Маленький</Tag>
			<Tag size="m" color="red">
				Средний
			</Tag>
		</>
	);
}
