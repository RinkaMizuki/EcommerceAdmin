import * as React from "react";
import { Fragment, useCallback } from "react";
import {
    AutocompleteInput,
    Count,
    DatagridConfigurable,
    DateField,
    DateInput,
    ExportButton,
    FilterButton,
    List,
    NullableBooleanInput,
    NumberField,
    Pagination,
    ReferenceInput,
    SearchInput,
    SelectColumnsButton,
    TextField,
    TextInput,
    TopToolbar,
    WrapperField,
    useListContext,
} from "react-admin";
import { Divider, Tabs, Tab } from "@mui/material";

import UserReferenceField from "../User/UserReferenceField";
import NbItemsField from "./NbItemsField";
import CustomerField from "./CustomerField";

const ListActions = () => (
    <TopToolbar>
        <FilterButton />
        <SelectColumnsButton />
        <ExportButton />
    </TopToolbar>
);

const OrderList = () => (
    <List
        filterDefaultValues={{ status: "ordered" }}
        perPage={6}
        sort={{ field: "orderDate", order: "DESC" }}
        pagination={<Pagination rowsPerPageOptions={[6, 12, 24, 30]} />}
        filters={orderFilters}
        actions={<ListActions />}
    >
        <TabbedDatagrid />
    </List>
);

const orderFilters = [
    <SearchInput source="q" alwaysOn />,
    <ReferenceInput source="userId" reference="users" label="Users">
        <AutocompleteInput
            label="User"
            optionText={(choice) =>
                choice?.id // the empty choice is { id: '' }
                    ? `${choice.userName}`
                    : ""
            }
            sx={{ minWidth: 200 }}
        />
    </ReferenceInput>,
    <DateInput source="orderedBefore" />,
    <DateInput source="orderedSince" />,
    <TextInput source="minAmount" />,
    <NullableBooleanInput source="returned" />,
];

const tabs = [
    { id: "ordered", name: "ordered" },
    { id: "shipped", name: "shipped" },
    { id: "delivered", name: "delivered" },
    { id: "cancelled", name: "cancelled" },
];

const TabbedDatagrid = () => {
    const listContext = useListContext();
    const { filterValues, setFilters, displayedFilters } = listContext;
    //console.log(filterValues, setFilters);
    const handleChange = useCallback(
        (event, value) => {
            setFilters &&
                setFilters(
                    { ...filterValues, status: value },
                    displayedFilters,
                    false // no debounce, we want the filter to fire immediately
                );
        },
        [displayedFilters, filterValues, setFilters]
    );
    return (
        <Fragment>
            <Tabs
                variant="fullWidth"
                centered
                value={filterValues.status}
                indicatorColor="primary"
                onChange={handleChange}
            >
                {tabs.map((choice) => (
                    <Tab
                        key={choice.id}
                        label={
                            <span>
                                {choice.name} (
                                <Count
                                    resource="orders"
                                    filter={{
                                        ...filterValues,
                                        status: choice.name,
                                    }}
                                ></Count>
                                )
                            </span>
                        }
                        value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider />
            <>
                {filterValues.status === "ordered" && (
                    <DatagridConfigurable rowClick="edit">
                        <DateField source="orderDate" showTime />
                        <TextField source="id" />
                        <WrapperField source="Customer">
                            <CustomerField />
                        </WrapperField>

                        <TextField
                            source="deliveryAddress"
                            sx={{
                                maxWidth: "300px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "block",
                            }}
                        />
                        <WrapperField label="Nb Items">
                            <NbItemsField />
                        </WrapperField>
                        <NumberField
                            source="totalPrice"
                            options={{
                                style: "currency",
                                currency: "VND",
                            }}
                            locales="fr-FR"
                            sx={{ fontWeight: "bold" }}
                        />
                    </DatagridConfigurable>
                )}
                {filterValues.status === "shipped" && (
                    <DatagridConfigurable rowClick="edit">
                        <DateField source="orderDate" showTime />
                        <TextField source="id" />
                        <WrapperField source="Customer">
                            <CustomerField />
                        </WrapperField>

                        <TextField
                            source="deliveryAddress"
                            sx={{
                                maxWidth: "300px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "block",
                            }}
                        />
                        <WrapperField label="Nb Items">
                            <NbItemsField />
                        </WrapperField>
                        <NumberField
                            source="totalPrice"
                            options={{
                                style: "currency",
                                currency: "VND",
                            }}
                            locales="fr-FR"
                            sx={{ fontWeight: "bold" }}
                        />
                    </DatagridConfigurable>
                )}
                {filterValues.status === "delivered" && (
                    <DatagridConfigurable rowClick="edit">
                        <DateField source="orderDate" showTime />
                        <TextField source="id" />
                        <WrapperField source="users">
                            <UserReferenceField />
                        </WrapperField>

                        <TextField
                            source="deliveryAddress"
                            sx={{
                                maxWidth: "300px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "block",
                            }}
                        />
                        <WrapperField label="Nb Items">
                            <NbItemsField />
                        </WrapperField>
                        <NumberField
                            source="totalPrice"
                            options={{
                                style: "currency",
                                currency: "VND",
                            }}
                            locales="fr-FR"
                            sx={{ fontWeight: "bold" }}
                        />
                    </DatagridConfigurable>
                )}
                {filterValues.status === "cancelled" && (
                    <DatagridConfigurable rowClick="edit">
                        <DateField source="orderDate" showTime />
                        <TextField source="id" />
                        <WrapperField source="Users">
                            <UserReferenceField />
                        </WrapperField>

                        <TextField
                            source="deliveryAddress"
                            sx={{
                                maxWidth: "300px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "block",
                            }}
                        />
                        <WrapperField label="Nb Items">
                            <NbItemsField />
                        </WrapperField>
                        <NumberField
                            source="totalPrice"
                            options={{
                                style: "currency",
                                currency: "VND",
                            }}
                            locales="fr-FR"
                            sx={{ fontWeight: "bold" }}
                        />
                    </DatagridConfigurable>
                )}
            </>
        </Fragment>
    );
};

export default OrderList;
