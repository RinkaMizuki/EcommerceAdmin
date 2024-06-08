import CardWithIcon from "./CardWithIcon";
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

const NbCancelOrders = (props) => {
  const { value } = props;
  return (
    <CardWithIcon
      to="/orders"
      icon={MoneyOffIcon}
      title={'Cancel orders of month'}
      subtitle={value || "0"}
    />
  );
};

export default NbCancelOrders;
