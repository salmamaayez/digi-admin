import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Restaurant | DG Restaurant </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
