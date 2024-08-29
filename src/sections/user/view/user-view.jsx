import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users} from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import AddUserModal from '../AddUserModal'; 
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [usersList, setUsersList] = useState(users);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = usersList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

const handleAddUser = (newUser) => {
  // Vérifiez que newUser contient toutes les informations nécessaires avant d'ajouter
  if (newUser.name && newUser.Email && newUser.Tel && newUser.Password) {
    setUsersList((prevUsers) => [...prevUsers, { id: prevUsers.length + 1, ...newUser }]);
    setIsModalOpen(false);
  } else {
    alert('Please complete all fields');
  }
};

  const dataFiltered = applyFilter({
    inputData: usersList,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleDeleteUsers = () => {
    const remainingUsers = usersList.filter((user) => !selected.includes(user.name));
    setUsersList(remainingUsers);
    setSelected([]);
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Waiters</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenModal}>
          Add Waiter
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onDeleteUsers={handleDeleteUsers}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
<UserTableHead
  order={order}
  orderBy={orderBy}
  rowCount={usersList.length}
  numSelected={selected.length}
  onRequestSort={handleSort}
  onSelectAllClick={handleSelectAllClick}
  headLabel={[
    { id: 'name', label: 'Name' },
    { id: 'Email', label: 'Email' },
    { id: 'Tel', label: 'n°Tel' },
    { id: 'Password', label: 'Password', align: 'center' },
    { id: '' },
  ]}
/>
<TableBody>
  {dataFiltered
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => (
      <UserTableRow
        key={row.id}
        name={row.name}
        Tel={row.Tel}
        Email={row.Email}
        Password={row.Password}
        selected={selected.indexOf(row.name) !== -1}
        handleClick={(event) => handleClick(event, row.name)}
        onDeleteUsers={handleDeleteUsers}
      />
    ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, usersList.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={usersList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {isModalOpen && (
        <AddUserModal onAddUser={handleAddUser} onClose={handleCloseModal} />
      )}
    </Container>
  );
}

