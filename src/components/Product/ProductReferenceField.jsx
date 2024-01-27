import * as React from 'react';
import { ReferenceField, TextField } from 'react-admin';

const ProductReferenceField = (
  props
) => (
  <ReferenceField
    label="Product"
    source="productId"
    reference="products"
    {...props}
  >
    <TextField source="title" />
  </ReferenceField>
);

export default ProductReferenceField;