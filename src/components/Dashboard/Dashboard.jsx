import { useGetList } from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { format, startOfMonth, endOfMonth } from 'date-fns';

import PendingReviews from './PendingReviews';
import PendingOrders from './PendingOrders';
import NewCustomers from './NewCustomers';
import NbNewOrders from './NbNewOrders';
import MonthlyRevenue from './MonthlyRevenue';
import OrderChart from './OrderChart';
import NbCancelOrders from './NbCancelOrders';
import NbReturnOrders from './NbReturnOrders';

const styles = {
  flex: { display: 'flex' },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  leftCol: { flex: 1, marginRight: '0.5em', flexBasis: '10%' },
  rightCol: { flex: 1, marginLeft: '0.5em' },
  singleCol: { marginTop: '1em', marginBottom: '1em' },
};

export const FORMAT_DATE = 'yyyy-MM-dd';

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard = () => {
  const isXSmall = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );
  const isSmall = useMediaQuery((theme) =>
    theme.breakpoints.down('lg')
  );

  const formatShortDate = (date) => {
    return format(date, FORMAT_DATE);
  }

  const currDate = new Date();
  const nowDate = formatShortDate(currDate);
  const sinceDate = formatShortDate(startOfMonth(currDate));
  const beforeDate = formatShortDate(endOfMonth(currDate));

  const { data: orders = [] } = useGetList('orders', {
    filter: {
      orderedSince: sinceDate,
      orderedBefore: beforeDate
    },
    sort: { field: 'OrderDate', order: 'DESC' },
    pagination: { page: 1, perPage: 50 },
  });
  const { pendingOrders, cancelledOrders, donedOrders, returnedOrders } = orders?.reduce((acc, order) => {
    if (order.status === 'pending') {
      acc.pendingOrders.push(order);
    } else if (order.status === 'cancelled') {
      acc.cancelledOrders.push(order);
    } else if (order.returned) {
      acc.returnedOrders.push(order);
    } else {
      acc.donedOrders.push(order);
    }
    return acc;
  }, { pendingOrders: [], cancelledOrders: [], donedOrders: [], returnedOrders: [] });
  console.log(cancelledOrders)
  const revenue = donedOrders?.reduce((acc, order) => {
    return acc + order.totalPrice
  }, 0)
  return isXSmall ? (
    <div>
      <div style={styles.flexColumn}>
        <MonthlyRevenue value={revenue} />
        <VerticalSpacer />
        <NbNewOrders value={donedOrders.length} />
        <VerticalSpacer />
        <NbCancelOrders value={cancelledOrders.length} />
        <VerticalSpacer />
        <NbReturnOrders value={returnedOrders.length} />
        <VerticalSpacer />
        <PendingOrders orders={pendingOrders} />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn}>
      <div style={styles.singleCol}>
      </div>
      <div style={styles.flex}>
        <MonthlyRevenue value={revenue} />
        <Spacer />
        <NbNewOrders value={donedOrders.length} />
        <Spacer />
        <NbCancelOrders value={cancelledOrders.length} />
        <Spacer />
        <NbReturnOrders value={returnedOrders.length} />
      </div>
      <div style={styles.singleCol}>
        <OrderChart orders={donedOrders} />
      </div>
      <div style={styles.singleCol}>
        <PendingOrders orders={pendingOrders} />
      </div>
    </div>
  ) : (
    <>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <MonthlyRevenue value={revenue} />
            <Spacer />
            <NbNewOrders value={donedOrders.length} />
          </div>
          <div style={{ ...styles.flex, marginTop: "20px" }}>
            <NbCancelOrders value={cancelledOrders.length} />
            <Spacer />
            <NbReturnOrders value={returnedOrders.length} />
          </div>
          <div style={styles.singleCol}>
            <OrderChart orders={donedOrders} />
          </div>
          <div style={styles.singleCol}>
            <PendingOrders orders={pendingOrders} />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <PendingReviews />
            <Spacer />
            <NewCustomers />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;