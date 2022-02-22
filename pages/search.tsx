import axios from 'axios';
import { GetStaticProps } from 'next';
import { MenuItem } from '../interfaces/menu.interface';
import { withLayout } from '../layout/Layout';
import { API } from '../helpers/api';

function Search() {
	return <>Search</>;
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps = async () => {
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
