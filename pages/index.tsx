import React, { useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';
import { withLayout } from '../layout/Layout';

function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(0);

	return (
		<>
			<Htag tag="h1">Заголовок</Htag>
			<Button appearance="primary" arrow="right">
				Кнопка
			</Button>
			<Button appearance="ghost" arrow="down">
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

			<Rating rating={rating} setRating={setRating} isEditable />
		</>
	);
}

export default withLayout(Home);
