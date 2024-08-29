import React from 'react';
import PropTypes from 'prop-types';

import { Delete as DeleteIcon, TableRestaurant as TableRestaurantIcon } from '@mui/icons-material';

import './TableItem.css'; // Importez le fichier CSS

const TableItem = ({ table, onDelete }) => 
 (
    <div className="table-wrapper">
      <p className="table-number">Table {table.number}</p>
      <TableRestaurantIcon className="table-icon" />
      <DeleteIcon className="trash-icon" onClick={() => onDelete(table.id)} />
    </div>
  );

TableItem.propTypes = {
  table: PropTypes.shape({
    number: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TableItem;
