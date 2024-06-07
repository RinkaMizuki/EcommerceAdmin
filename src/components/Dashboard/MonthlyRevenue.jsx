import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

import CardWithIcon from './CardWithIcon';

const MonthlyRevenue = (props) => {
  const { value } = props;
  return (
    <CardWithIcon
      to="/orders"
      icon={CurrencyBitcoinIcon}
      title={'Monthly revenue'}
      subtitle={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
    />
  );
};

export default MonthlyRevenue;