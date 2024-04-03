import React from 'react';
import {
  Edit,
  required,
  TabbedForm,
  TextInput,
  useRecordContext,
} from 'react-admin';
import SlideImageInput from './SlideImageInput';

const RichTextInput = React.lazy(() =>
  import('ra-input-rich-text').then(module => ({
    default: module.RichTextInput,
  }))
);

const SliderTitle = () => {
  const record = useRecordContext();
  return record ? <span>Slider "{record.title}"</span> : null;
};

const SliderEdit = () => {

  return (
    <Edit
      title={<SliderTitle />}
    >
      <TabbedForm>
        <TabbedForm.Tab
          label="Slide Show"
          sx={{
            "& .RaFileInput-removeButton button": {
              top: "-18px !important",
              right: "-18px !important",
              zIndex: "999"
            },
          }}
        >
          <SlideImageInput />
        </TabbedForm.Tab>

        <TabbedForm.Tab
          label="Detail"
          path="detail"
          sx={{ maxWidth: '40em' }}
        >
          <TextInput
            source="title"
            label="Title"
            validate={req}
          />
          <TextInput
            source="description"
            label="Description"
            fullWidth
            validate={req}
          />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  )
};

const req = [required()];

export default SliderEdit;