import { Avatar, Box, Button } from '@mui/material';
import CustomerIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import {
  ListBase,
  WithListContext,
  SimpleList,
  useTranslate,
} from 'react-admin';
import { subDays } from 'date-fns';

import CardWithIcon from './CardWithIcon';

const NewCustomers = () => {
  const translate = useTranslate();

  const aMonthAgo = subDays(new Date(), 30);
  aMonthAgo.setDate(aMonthAgo.getDate() - 30);
  aMonthAgo.setHours(0);
  aMonthAgo.setMinutes(0);
  aMonthAgo.setSeconds(0);
  aMonthAgo.setMilliseconds(0);

  return (
    <ListBase
      resource="users"
      filter={{
        hasOrdered: true,
      }}
      sort={{
        field: "createdAt",
        order: "DESC",
      }}
      perPage={100}
      disableSyncWithLocation
    >
      <CardWithIcon
        to="/users/create"
        icon={CustomerIcon}
        title={translate('New customers')}
        subtitle={
          <WithListContext render={({ total }) => <>{total}</>} />
        }
      >
        <SimpleList
          primaryText="%{userName}"
          leftAvatar={customer => (
            <Avatar
              src={customer.url}
              alt={customer.avatar}
            />
          )}
        />
        <Box flexGrow={1}>&nbsp;</Box>
        <Button
          sx={{ borderRadius: 0 }}
          component={Link}
          to="/users"
          size="small"
          color="primary"
        >
          <Box p={1} sx={{ color: 'primary.main' }}>
            {translate('All customers')}
          </Box>
        </Button>
      </CardWithIcon>
    </ListBase>
  );
};

export default NewCustomers;
