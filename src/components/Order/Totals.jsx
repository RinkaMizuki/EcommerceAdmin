import * as React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useRecordContext, useTranslate } from 'react-admin';

import { TableCellRight } from './TableCellRight';

const Totals = () => {
  const record = useRecordContext();

  return (
    <Table sx={{ minWidth: '35em' }}>
      <TableBody>
        <TableRow>
          <TableCell>
            Sub Total
          </TableCell>
          <TableCellRight>
            {record?.totalPrice.toLocaleString("fr-FR", {
              style: 'currency',
              currency: 'VND',
            })}
          </TableCellRight>
        </TableRow>
        <TableRow>
          <TableCell>
            Free Ship
          </TableCell>
          <TableCellRight>
            {"0".toLocaleString("fr-FR", {
              style: 'currency',
              currency: 'VND',
            })}
          </TableCellRight>
        </TableRow>
        <TableRow>
          <TableCell>
            Voucher
          </TableCell>
          <TableCellRight>
            -{"0"?.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'VND',
            })}
          </TableCellRight>
        </TableRow>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>
            Total
          </TableCell>
          <TableCellRight sx={{ fontWeight: 'bold' }}>
            {record?.totalPrice.toLocaleString("fr-FR", {
              style: 'currency',
              currency: 'VND',
            })}
          </TableCellRight>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Totals;