import { Datagrid, List, TextField, WrapperField } from "react-admin"
import LinkToRelatedCustomers from "./LinkToRelatedCustomers"
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { Stack } from '@mui/material';

export const SegmentList = () => {
  return (
    <List pagination={null} perPage={null}>
      <Datagrid bulkActionButtons={null}>
        <WrapperField label="Name">
          <Stack sx={{ "flexDirection": "row", "alignItems": "center","gap":"5px" }}>
            <LabelImportantIcon />
            <TextField source="title" />
          </Stack>
        </WrapperField>
        <LinkToRelatedCustomers />
      </Datagrid>
    </List>
  )
}