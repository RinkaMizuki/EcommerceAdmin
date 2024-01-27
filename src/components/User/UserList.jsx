import { Datagrid, EmailField, List, TextField, SimpleList, EditButton, Pagination, BooleanField, ArrayField, SingleFieldList, ChipField } from "react-admin"
import { useMediaQuery } from "@mui/material";
import UserBulkActionButtons from "../BulkActionButtons/UserBulkActionButtons";
import "./User.css"
import { UserNameField } from "../Field/UserNameField";
import { UserFilterSidebar } from './UserFilter';


export const UserList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  return (
    <List aside={<UserFilterSidebar />} perPage={6} pagination={<Pagination rowsPerPageOptions={[6, 12, 24, 30]} />} >
      {!isSmall ?
        <Datagrid rowClick="show" bulkActionButtons={<UserBulkActionButtons />}>
          <UserNameField label="Users"></UserNameField>
          <EmailField source="email" />
          <TextField source="role" />
          <BooleanField source="emailConfirm" />
          <BooleanField source="isActive" label="Ban" />
          <ArrayField source="segments">
            <SingleFieldList linkType={false}>
              <ChipField source="title" size="small" />
            </SingleFieldList>
          </ArrayField>
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