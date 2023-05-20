import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout.tsx';
import { AdminPage, ErrorPage, ProductDetailPage, ProductPage } from '@/pages';

const App: FC = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Layout />}>
				<Route index element={<Navigate to={'product'} />} />
				<Route path={'product'} element={<ProductPage />} />
				<Route path={':id'} element={<ProductDetailPage />} />
				<Route path={'product/admin'} element={<AdminPage />} />
				<Route path={'*'} element={<ErrorPage />} />
			</Route>
		</Routes>
	);
};

export { App };
