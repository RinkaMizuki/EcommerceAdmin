import { useMemo } from 'react';
import { useGetList } from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { subDays, startOfDay } from 'date-fns';

// import MonthlyRevenue from './MonthlyRevenue';
// import NbNewOrders from './NbNewOrders';
// import PendingOrders from './PendingOrders';
import PendingReviews from './PendingReviews';
import NewCustomers from './NewCustomers';
// import OrderChart from './OrderChart';

const styles = {
  flex: { display: 'flex' },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  leftCol: { flex: 1, marginRight: '0.5em' },
  rightCol: { flex: 1, marginLeft: '0.5em' },
  singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard = () => {
  const isXSmall = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );
  const isSmall = useMediaQuery((theme) =>
    theme.breakpoints.down('lg')
  );
  const aMonthAgo = useMemo(() => subDays(startOfDay(new Date()), 30), []);

  // const { data: orders } = useGetList('orders', {
  //   filter: { date_gte: aMonthAgo.toISOString() },
  //   sort: { field: 'createdAt', order: 'DESC' },
  //   pagination: { page: 1, perPage: 50 },
  // });

  // const aggregation = useMemo(() => {
  //   if (!orders) return {};
  //   const aggregations = orders
  //     .filter(order => order.status !== 'cancelled')
  //     .reduce(
  //       (stats, order) => {
  //         if (order.status !== 'cancelled') {
  //           stats.revenue += order.total;
  //           stats.nbNewOrders++;
  //         }
  //         if (order.status === 'ordered') {
  //           stats.pendingOrders.push(order);
  //         }
  //         return stats;
  //       },
  //       {
  //         revenue: 0,
  //         nbNewOrders: 0,
  //         pendingOrders: [],
  //       }
  //     );
  //   return {
  //     recentOrders: orders,
  //     revenue: aggregations.revenue.toLocaleString(undefined, {
  //       style: 'currency',
  //       currency: 'USD',
  //       minimumFractionDigits: 0,
  //       maximumFractionDigits: 0,
  //     }),
  //     nbNewOrders: aggregations.nbNewOrders,
  //     pendingOrders: aggregations.pendingOrders,
  //   };
  // }, [orders]);

  // const { nbNewOrders, pendingOrders, revenue, recentOrders } = aggregation;
  return isXSmall ? (
    <div>
      <div style={styles.flexColumn}>
        {/* <MonthlyRevenue value={revenue} /> */}
        <VerticalSpacer />
        {/* <NbNewOrders value={nbNewOrders} /> */}
        <VerticalSpacer />
        {/* <PendingOrders orders={pendingOrders} /> */}
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn}>
      <div style={styles.singleCol}>
      </div>
      <div style={styles.flex}>
        {/* <MonthlyRevenue value={revenue} /> */}
        <Spacer />
        {/* <NbNewOrders value={nbNewOrders} /> */}
      </div>
      <div style={styles.singleCol}>
        {/* <OrderChart orders={recentOrders} /> */}
      </div>
      <div style={styles.singleCol}>
        {/* <PendingOrders orders={pendingOrders} /> */}
      </div>
    </div>
  ) : (
    <>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            {/* <MonthlyRevenue value={revenue} /> */}
            <Spacer />
            {/* <NbNewOrders value={nbNewOrders} /> */}
          </div>
          <div style={styles.singleCol}>
            {/* <OrderChart orders={recentOrders} /> */}
          </div>
          <div style={styles.singleCol}>
            {/* <PendingOrders orders={pendingOrders} /> */}
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