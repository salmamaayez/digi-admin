import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import {
  Box,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

const imageStyle = {
  maxWidth: '150px', // Ajustez cette valeur selon vos besoins
  maxHeight: '150px', // Ajustez cette valeur selon vos besoins
  objectFit: 'contain', // Maintient les proportions de l'image
  display: 'block',
  margin: '0 auto',
};

function EditProductModal({ open, onClose, product, onSave }) {
  const [formData, setFormData] = useState({ name: '', price: '', category: '' });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
      });
    }
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(product.id, formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '80vh', // Ajustez la hauteur maximale de la modale
        },
      }}
    >
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent
        sx={{
          maxHeight: '60vh', // Hauteur maximale de la zone de contenu
          overflowY: 'auto', // Permet le défilement vertical
        }}
      >
        {product && product.cover && (
          <Box component="img" src={product.cover} alt="Product" sx={imageStyle} />
        )}
        <TextField
          margin="dense"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

EditProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default EditProductModal;
