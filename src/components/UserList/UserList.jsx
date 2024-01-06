import { Datagrid, EmailField, List, SearchInput, TextInput, TextField, SimpleList, EditButton, Pagination, BooleanField } from "react-admin"
import { useMediaQuery } from "@mui/material";
import UserBulkActionButtons from "../BulkActionButtons/UserBulkActionButtons";
import "./UserList.css"
import { UserNameField } from "../Field/UserNameField";

export const UserList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  const userFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput label="Email" source="email" />,
  ];

  return (
    <List filters={userFilters} perPage={6} pagination={<Pagination rowsPerPageOptions={[6, 12, 24, 30]} />} >
      {!isSmall ?
        <Datagrid rowClick="show" bulkActionButtons={<UserBulkActionButtons />}>
          <UserNameField label="User"></UserNameField>
          <EmailField source="email" />
          <TextField source="role" />
          <BooleanField source="emailConfirm" />
          <BooleanField source="isActive" label="Ban" />
          <EditButton />
        </Datagrid> :
        <SimpleList
          primaryText={(record) => record.userName}
          tertiaryText={(record) => record.email}
          secondaryText={(record) => record.role}
        />
      }
    </List>
  )
}