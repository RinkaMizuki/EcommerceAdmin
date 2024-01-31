import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useRecordContext } from 'react-admin';
import queryString from 'query-string';

import ProductIcon from '@mui/icons-material/Collections';

const LinkToRelatedProducts = () => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <Button
      size="small"
      color="primary"
      component={Link}
      to={{
        pathname: '/products',
        search: queryString.stringify({
          filter: JSON.stringify({ category: record.id }),
        }),
      }}
      sx={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <ProductIcon sx={{ paddingRight: '0.5em' }} />
      Products
    </Button>
  );
};

export default LinkToRelatedProducts;