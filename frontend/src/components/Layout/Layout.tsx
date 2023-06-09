import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header/Header.tsx';

const Layout: FC = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export { Layout };