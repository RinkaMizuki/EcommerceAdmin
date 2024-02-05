import {
  Datagrid,
  DateField,
  Edit,
  EditButton,
  Pagination,
  ReferenceManyField,
  required,
  TabbedForm,
  TextField,
  useRecordContext,
  SaveButton,
  Toolbar,
} from 'react-admin';
import React, { useRef, useState } from "react";
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
  return record ? <span>Product "{record.title}"</span> : null;
};

const SaveToolbar = ({ saveable, onSaveColor }) => (
  <Toolbar>
    <SaveButton alwaysEnable={saveable} onClick={onSaveColor} />
  </Toolbar>
);

const ProductEdit = () => {

  const [isSaveale, setIsSaveable] = useState(false);
  const editDetailRef = useRef();

  const handleSaveColorChange = () => {
    editDetailRef.current?.handleSaveColorChange();
  };

  return (
    <Edit
      title={<ProductTitle />}
    >
      <TabbedForm
        toolbar={<SaveToolbar saveable={isSaveale} onSaveColor={handleSaveColorChange} />}
      >
        <TabbedForm.Tab
          label="Image"
          sx={{
            "& .RaFileInput-removeButton button": {
              top: "-18px !important",
              right: "-18px !important",
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
          <ProductEditDetail onSaveable={setIsSaveable} ref={editDetailRef} />
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
  )
};

const req = [required()];

export default ProductEdit;