import * as React from 'react';
import {
  BulkDeleteButton,
  DatagridConfigurable,
  DateField,
  TextField,
  WrapperField,
} from 'react-admin';

import ProductReferenceField from '../Product/ProductReferenceField';
import UserReferenceField from '../User/UserReferenceField';
import StarRatingField from './StarRatingField';
import rowSx from './rowSx';

import BulkAcceptButton from './BulkAcceptButton';
import BulkRejectButton from './BulkRejectButton';

const ReviewsBulkActionButtons = () => (
  <>
    <BulkAcceptButton />
    <BulkRejectButton />
    <BulkDeleteButton />
  </>
);

const ReviewListDesktop = ({ selectedRow }) => (
  <DatagridConfigurable
    rowClick="edit"
    rowSx={rowSx(selectedRow)}
    bulkActionButtons={<ReviewsBulkActionButtons />}
    sx={{
      '& .RaDatagrid-thead': {
        borderLeftColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftStyle: 'solid',
      },
      '& .column-comment': {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    }}
  >
    <DateField source="createdAt"/>
    <WrapperField source="Users">
      <UserReferenceField link={false} />
    </WrapperField>
    <WrapperField source="Products">
      <ProductReferenceField link={false} />
    </WrapperField>
    <WrapperField source="Stars">
      <StarRatingField size="small" />
    </WrapperField>
    <TextField source="content" />
    <TextField source="status" />
  </DatagridConfigurable>
);

export default ReviewListDesktop;