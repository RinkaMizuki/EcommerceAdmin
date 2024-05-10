import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link, useRecordContext } from 'react-admin';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { TableCellRight } from './TableCellRight';

const Basket = () => {
  const record = useRecordContext();



  const calcTotal = (productId) => {
    return record.orderDetails
      ? record.orderDetails?.filter(p => p.productId === productId).reduce((acc, p) => {
        return acc + (1 - p?.discountProduct / 100) * p?.priceProduct * p?.quantityProduct
      }, 0)
      : 0;
  }

  if (!record || !record.orderDetails) return null;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            Order ID
          </TableCell>
          <TableCellRight>
            Price
          </TableCellRight>
          <TableCellRight>
            Discount
          </TableCellRight>
          <TableCellRight>
            Quantity
          </TableCellRight>
          <TableCellRight>
            Total
          </TableCellRight>
        </TableRow>
      </TableHead>
      <TableBody>
        {record.orderDetails.map((item) => (
          <TableRow key={item.productId}>
            <TableCell>
              <Link to={`/products/${item.productId}`}>
                {item.productId}
              </Link>
            </TableCell>
            <TableCellRight>
              {item.priceProduct.toLocaleString(
                "fr-FR",
                {
                  style: 'currency',
                  currency: 'VND',
                }
              )}
            </TableCellRight>
            <TableCellRight sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
              <KeyboardDoubleArrowDownIcon />
              {item.discountProduct}%
            </TableCellRight>
            <TableCellRight>{item.quantityProduct}</TableCellRight>
            <TableCellRight>
              {calcTotal(item.productId).toLocaleString("fr-FR", {
                style: 'currency',
                currency: 'VND',
              })}
            </TableCellRight>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Basket;