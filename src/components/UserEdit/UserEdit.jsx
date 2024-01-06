import {
  Edit, SimpleForm, TextInput, DateInput, required, SelectInput, PasswordInput, BooleanInput, Toolbar, DeleteButton, SaveButton
} from 'react-admin';
import PreviewAvatarField from '../Field/PreviewAvatarField';
import { MuiColorInput } from 'mui-color-input'
import { useState } from 'react';
export const UserEdit = () => {
  const [value, setValue] = useState('#ffffff')

  const handleChange = (newValue) => {
    setValue(newValue);
  }
  const MyToolbar = () => (
    <Toolbar>
      <SaveButton
        type="button"
      />
      <DeleteButton />
    </Toolbar>
  );
  return (
    <Edit>
      <SimpleForm toolbar={<MyToolbar />}>
        <TextInput source="id" disabled />
        <TextInput source="userName" label="User Name" validate={required()} />
        <TextInput source="email" label="Email Address" validate={required()} />
        <TextInput source="phone" label="Phone Number" />
        <SelectInput source="role" choices={[
          { id: "admin", name: "Admin" },
          { id: "member", name: "Member" }
        ]} validate={required()} />
        <PasswordInput source="password" label="Reset Password" />
        <DateInput label="Birth Date" source="birthDate" defaultValue={new Date()} />
        <MuiColorInput value={value} onChange={handleChange}/>

        <BooleanInput label="Ban" source="isActive" />
        <BooleanInput label="Confirm Email" source="emailConfirm" />
        <PreviewAvatarField />
      </SimpleForm>
    </Edit>
  );
}
