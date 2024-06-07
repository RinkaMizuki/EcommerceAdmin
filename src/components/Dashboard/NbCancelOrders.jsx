import CardWithIcon from "./CardWithIcon";
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

const NbCancelOrders = (props) => {
  const { value } = props;
  return (
    <CardWithIcon
      to="/orders"
      icon={MoneyOffIcon}
      title={'Cancel orders'}
      subtitle={value}
    />
  );
};

export default NbCancelOrders;
