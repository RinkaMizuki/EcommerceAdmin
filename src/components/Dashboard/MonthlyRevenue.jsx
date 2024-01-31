import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

const MonthlyRevenue = (props) => {
  const { value } = props;
  const translate = useTranslate();
  return (
    <CardWithIcon
      to="/orders"
      icon={CurrencyBitcoinIcon}
      title={translate('Monthly revenue')}
      subtitle={value}
    />
  );
};

export default MonthlyRevenue;