import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { products as initialProducts } from 'src/_mock/products'; // Renommez pour éviter les conflits
import Iconify from 'src/components/iconify';

import ProductCard from '../product-card';
import ProductFilters from '../product-filters';
import AddProductModal from '../AddProductModal';
import EditProductModal from '../EditProductModal';
import { CategoriesProvider } from '../CategoriesContext';


// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState(initialProducts); // Ajoutez l'état des produits
  const [editingProduct, setEditingProduct] = useState(null); // Déclaration de l'état pour le produit en cours d'édition
  const [isModalOpen, setIsModalOpen] = useState(false); // Déclaration de l'état pour le modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleFilterChange = (category) => {
    setCategoryFilter(category);
    handleCloseFilter();
  };
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = (productId, updatedData) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, ...updatedData } : product
      )
    );
  };

  const handleDelete = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };
  const filteredProducts = products.filter(
    (product) => categoryFilter === 'All' || product.category === categoryFilter
  );

  return (
    <CategoriesProvider>
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Menu</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAddModal}>
          New item
        </Button>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            onFilterChange={handleFilterChange}
          />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid key={product.id} xs={6} sm={3} md={3} lg={2}>
            <ProductCard
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
      <EditProductModal
        open={isModalOpen}
        onClose={handleCloseModal}
        product={editingProduct}
        onSave={handleSave}
      />
      <AddProductModal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAdd={handleAddProduct}
      />
    </Container>
    </CategoriesProvider>
  );
}
