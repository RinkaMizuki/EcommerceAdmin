import { List, TextField, SimpleList, EditButton, Pagination, BooleanField, ArrayField, SingleFieldList, ChipField, TopToolbar, CreateButton, ExportButton, SelectColumnsButton, DatagridConfigurable, NumberField } from "react-admin"
import { useMediaQuery } from "@mui/material";


export const CouponList = () => {

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  const CouponListActions = () => (
    <TopToolbar>
      <CreateButton />
      <SelectColumnsButton />
      <ExportButton />
    </TopToolbar>
  );
  return (
    <List
      perPage={6}
      pagination={<Pagination
        rowsPerPageOptions={[6, 12, 24, 30]} />
      }
      actions={<CouponListActions />}
    >
      {!isSmall ?
        <DatagridConfigurable>
          <TextField source="couponCode" />
          <BooleanField source="isActive" label="Active" />
          <NumberField
            textAlign="center"
            source="discountPercent"
          />
          <ArrayField source="couponConditions">
            <SingleFieldList linkType={false}>
              <ChipField source="condition.attribute" size="small" />
              <ChipField source="condition.operator" size="small" />
              <ChipField source="value" size="small" /> |
            </SingleFieldList>
          </ArrayField>
          <EditButton />
        </DatagridConfigurable> :
        <SimpleList
          primaryText={(record) => record.couponCode}
          tertiaryText={(record) => record.isActive}
          secondaryText={(record) => record.discountPercent}
        />
      }
    </List>
  )
}