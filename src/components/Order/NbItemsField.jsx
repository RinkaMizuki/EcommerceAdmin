import { FunctionField } from 'react-admin';

const NbItemsField = () => (
  <FunctionField render={record =>
    record.orderDetails?.reduce((acc, item) => {
      return acc += item.quantityProduct;
    }, 0)
  } />
)

export default NbItemsField;
