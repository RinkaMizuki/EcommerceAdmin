import * as React from 'react';
import { Create, ImageField, ImageInput, SaveButton, TabbedForm, Toolbar } from 'react-admin';
import { ProductEditDetail } from './ProductEditDetail';

const RichTextInput = React.lazy(() =>
  import('ra-input-rich-text').then(module => ({
    default: module.RichTextInput,
  }))
);
const SaveToolbar = ({ saveable, onSaveColor }) => (
  <Toolbar>
    <SaveButton alwaysEnable={saveable} onClick={onSaveColor} />
  </Toolbar>
);

const ProductCreate = () => {

  const [isSaveale, setIsSaveable] = React.useState(false);
  const editDetailRef = React.useRef();

  const handleSaveColorChange = () => {
    editDetailRef.current?.handleSaveColorChange();
  };

  return (
    <Create redirect="list">
      <TabbedForm
        toolbar={<SaveToolbar saveable={isSaveale} onSaveColor={handleSaveColorChange} />}
      >
        <TabbedForm.Tab
          label="Image"
          sx={{ maxWidth: '40em' }}
        >
          <ImageInput
            label="Product photos"
            accept="image/png,image/svg+xml,image/jpg,image/jpeg"
            source="files"
            multiple
          >
            <ImageField
              source="src"
              title="title"
            />
          </ImageInput>
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
        >
          <RichTextInput source="description" label="" />
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  )
};

export default ProductCreate;