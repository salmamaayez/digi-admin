import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete } from '@mui/icons-material';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product, onEdit, onDelete }) {
  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="body2" sx={{ flexGrow: 1, fontSize: '0.875rem' }}>
      {fCurrency(product.price)}
    </Typography>
  );
  const renderIcons = (
    <Stack direction="row" spacing={0}>
      <IconButton size="small" onClick={() => onEdit(product)} sx={{ fontSize: '1rem' }}>
        <Edit sx={{ fontSize: 'inherit' }} />
      </IconButton>
      <IconButton size="small" onClick={() => onDelete(product.id)} sx={{ fontSize: '1rem' }} >
        <Delete  sx={{ fontSize: 'inherit' }}/>
      </IconButton>
    </Stack>
  );
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>{renderImg}</Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>
        <Typography variant="caption" color="text.secondary">
          {product.category}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0}
          sx={{ width: '100%' }}
        >
          {renderPrice}
          {renderIcons}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired, // Fonction pour gérer l'édition du produit
  onDelete: PropTypes.func.isRequired, // Fonction pour gérer la suppression du produit
};
