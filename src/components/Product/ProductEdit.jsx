import * as React from 'react';
import {
  Datagrid,
  DateField,
  Edit,
  EditButton,
  Pagination,
  ReferenceManyField,
  ReferenceManyCount,
  required,
  TabbedForm,
  TextField,
  TextInput,
  useRecordContext,
  Labeled,
} from 'react-admin';

import { ProductEditDetail } from './ProductEditDetail';
import UserReferenceField from '../User/UserReferenceField';
import StarRatingField from '../Review/StarRatingField';
import CreateRelatedReviewButton from './CreateRelatedReviewButton';
import ThumbnailProductInput from '../Field/ThumbnailProductInput';
import PreviewProductPhoto from '../Field/PreviewProductPhoto';

const RichTextInput = React.lazy(() =>
  import('ra-input-rich-text').then(module => ({
    default: module.RichTextInput,
  }))
);

const ProductTitle = () => {
  const record = useRecordContext();
  return record ? <span>Product "{record.reference}"</span> : null;
};

const ProductEdit = () => (
  <Edit title={<ProductTitle />}>
    <TabbedForm>
      <TabbedForm.Tab
        label="Image"
        sx={{
          "& .css-1x7atgs-MuiStack-root-RaLabeled-root-RaFileInput-root-RaImageInput-root .RaFileInput-removeButton button, & .css-nrohbu-MuiStack-root-RaLabeled-root-RaFileInput-root-RaImageInput-root .RaFileInput-removeButton button, & .css-chtx3r-MuiStack-root-RaLabeled-root-RaFileInput-root-RaImageInput-root .RaFileInput-removeButton button": {
            top: "-18px",
            right: "-18px",
            zIndex: "999"
          },
        }}
      >
        <ThumbnailProductInput />
        <PreviewProductPhoto />
      </TabbedForm.Tab>
      <TabbedForm.Tab
        label="Details"
        path="details"
        sx={{ maxWidth: '40em' }}
      >
        <ProductEditDetail />
      </TabbedForm.Tab>
      <TabbedForm.Tab
        label="Description"
        path="description"
        sx={{ maxWidth: '40em' }}
      >
        <RichTextInput source="description" label="" validate={req} />
      </TabbedForm.Tab>
      <TabbedForm.Tab
        label="Reviews"
        path="reviews"
      >
        <ReferenceManyField
          reference="rates"
          target="productId"
          pagination={<Pagination />}
        >
          <Datagrid
            sx={{
              width: '100%',
              '& .column-comment': {
                maxWidth: '20em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
            }}
          >
            <DateField source="createdAt" />
            <UserReferenceField />
            <StarRatingField />
            <TextField source="content" />
            <TextField source="status" />
            <EditButton />
          </Datagrid>
          <CreateRelatedReviewButton />
        </ReferenceManyField>
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);

const CounterRate = () => {
  const record = useRecordContext();

  return <span>{record.productRates.length}</span>
}

const req = [required()];

export default ProductEdit;