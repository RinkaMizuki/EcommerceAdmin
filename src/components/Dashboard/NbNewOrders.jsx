import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CardWithIcon from './CardWithIcon';

const NbNewOrders = (props) => {
  const { value } = props;
  return (
    <CardWithIcon
      to="/orders"
      icon={ShoppingCartIcon}
      title={'New orders'}
      subtitle={value}
    />
  );
};

export default NbNewOrders;