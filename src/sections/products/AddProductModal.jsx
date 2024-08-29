import PropTypes from 'prop-types';
import {useRef, useState,  useContext } from 'react';

import { Upload } from '@mui/icons-material';
import { Box, Stack, Modal, Button, Select,MenuItem,TextField, Typography,  InputLabel, FormControl  } from '@mui/material';

import { CategoriesContext } from './CategoriesContext';

export default function AddProductModal({ open, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const fileInputRef = useRef(null);
  const { categories, addCategory } = useContext(CategoriesContext)|| { categories: [], addCategory: () => {} };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleOpenFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      category,
      cover: imagePreview,
    };
    onAdd(newProduct);
    onClose();
  };

   const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === 'Other') {
      setIsAddingCategory(true);
    } else {
      setCategory(selectedCategory);
      setIsAddingCategory(false);
    }
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory) {
      addCategory(newCategory);
      setCategory(newCategory);
      setIsAddingCategory(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: '90%', // Largeur relative pour la réactivité
          maxWidth: 500, // Largeur maximale pour les grands écrans
          bgcolor: 'background.paper',
          p: 4,
          mx: 'auto',
          mt: 8,
          borderRadius: 1,
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" component="h2" mb={2} textAlign="center">
          Add New Product
        </Typography>
        <TextField
          fullWidth
          label="Product Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={isAddingCategory ? newCategory : category}
            onChange={handleCategoryChange}
            displayEmpty
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        {isAddingCategory && (
          <TextField
            fullWidth
            label="New Category"
            margin="normal"
            value={newCategory}
            onChange={handleNewCategoryChange}
            onBlur={handleAddCategory} // Optionnel : ajouter automatiquement la nouvelle catégorie quand l'utilisateur quitte le champ
          />
        )}
        <Stack spacing={2} mt={2} width="100%">
          <Typography variant="subtitle2" textAlign="center">
            Product Image
          </Typography>
          <Button
            variant="outlined"
            component="span"
            startIcon={<Upload />}
            fullWidth
            onClick={handleOpenFileDialog}
          >
            Upload Image
          </Button>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="Product Preview"
              sx={{
                width: '100px',
                height: '95px',
                mt: 2,
                borderRadius: 1,
                boxShadow: 1,
                display: 'block',
                margin: '0 auto',
              }}
            />
          )}
        </Stack>
        <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end" width="100%">
          <Button onClick={onClose} variant="outlined" fullWidth>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" fullWidth>
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

AddProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
