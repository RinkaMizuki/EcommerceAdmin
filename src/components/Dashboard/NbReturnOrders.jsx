import CardWithIcon from "./CardWithIcon";
import RecyclingIcon from '@mui/icons-material/Recycling';

const NbReturnOrders = (props) => {
  const { value } = props;
  return (
    <CardWithIcon
      to="/orders"
      icon={RecyclingIcon}
      title={'Return orders of month'}
      subtitle={value || "0"}
    />
  );
};

export default NbReturnOrders;
