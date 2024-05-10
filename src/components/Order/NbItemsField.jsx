import { FunctionField } from 'react-admin';

const NbItemsField = () => (
  <FunctionField render={record => record.orderDetails.length} />
)

export default NbItemsField;
