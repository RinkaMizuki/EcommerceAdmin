import React from 'react';
import {
  Create,
  required,
  TabbedForm,
  TextInput,
} from 'react-admin';
import SlideImageInput from './SlideImageInput';

const SliderCreate = () => {

  return (
    <Create
      redirect="list"
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
            label=""
            validate={req}
          />
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  )
};

const req = [required()];

export default SliderCreate;