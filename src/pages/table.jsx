import { Helmet } from 'react-helmet-async';

import { TableView } from 'src/sections/table/view';

// ----------------------------------------------------------------------

export default function TablePage() {
  return (
    <>
      <Helmet>
        <title> Tables | DG Restaurant </title>
      </Helmet>

      <TableView />
    </>
  );
}
