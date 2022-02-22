import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Button, Htag, Input, P, Rating, Search, Tag, Textarea } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
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
			<Input type="text" placeholder="text" />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async (): Promise<{
	props: HomeProps;
}> => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory,
	});

	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
