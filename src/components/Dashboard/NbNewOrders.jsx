import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CardWithIcon from './CardWithIcon';

const NbNewOrders = (props) => {
  const { formatShortDate, nowDate, value } = props;
  const ordersToday = value.filter(od => formatShortDate(od.orderDate) == nowDate).length
  return (
    <CardWithIcon
      to="/orders"
      icon={ShoppingCartIcon}
      title={'New orders of today'}
      subtitle={ordersToday || "0"}
    />
  );
};

export default NbNewOrders;