import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';

import { Box, Modal, Button, TextField, Typography } from '@mui/material';

import TableItem from './TableItem';

const TablesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const TablesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  max-width: 800px;
`;

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 24px;
`;

const Tables = ({ modalOpen, handleClose }) => {
  const [tables, setTables] = useState([
    { id: 1, number: 1 },
    { id: 2, number: 2 },
    { id: 3, number: 3 },
  ]);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!modalOpen) {
      setNewTableNumber(''); // Réinitialiser le champ de l'input quand le modal se ferme
    }
  }, [modalOpen]);

  const handleInputChange = (e) => {
    setNewTableNumber(e.target.value);
  };

  const submitTable = () => {
    if (newTableNumber && !tables.some((table) => table.number === parseInt(newTableNumber, 10))) {
      setTables([...tables, { id: tables.length + 1, number: parseInt(newTableNumber, 10) }]);
      setError('');
      handleCloseModal();
    } else {
      setError('Numéro de table invalide ou déjà existant.');
    }
  };

  const deleteTable = (id) => {
    setTables(tables.filter((table) => table.id !== id));
  };
  const handleCloseModal = () => {
    handleClose(); // Appeler la fonction de fermeture du modal
  };

  return (
    <TablesWrapper>
      <Modal open={modalOpen} onClose={handleClose}>
        <ModalBox>
          <Typography variant="h6" component="h2">
            Add new table
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            type="number"
            label="Number of the table"
            value={newTableNumber}
            onChange={handleInputChange}
            variant="outlined"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              close
            </Button>
            <Button variant="contained" color="primary" onClick={submitTable}>
              Add
            </Button>
          </Box>
        </ModalBox>
      </Modal>
      <TablesList>
        {tables.map((table) => (
          <TableItem key={table.id} table={table} onDelete={deleteTable} />
        ))}
      </TablesList>
    </TablesWrapper>
  );
};
Tables.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Tables;
