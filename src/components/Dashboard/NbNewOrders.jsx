import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

const NbNewOrders = (props) => {
  const { value } = props;
  const translate = useTranslate();
  return (
    <CardWithIcon
      to="/orders"
      icon={ShoppingCartIcon}
      title={translate('New orders')}
      subtitle={value}
    />
  );
};

export default NbNewOrders;