import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const TablePage = lazy(() => import('src/pages/table'));
export const UserPage = lazy(() => import('src/pages/user'));
export const ProductsPage = lazy(() => import('src/pages/products'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'Waiters', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'table', element: <TablePage /> },
      ],
    },
  ]);

  return routes;
}
