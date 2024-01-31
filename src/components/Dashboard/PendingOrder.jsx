import {
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslate, useReference } from 'react-admin';


export const PendingOrder = (props) => {
  const { order } = props;
  const translate = useTranslate();
  const { referenceRecord: customer, isLoading } = useReference({
    reference: 'customers',
    id: order.customer_id,
  });

  return (
    <ListItem button component={Link} to={`/orders/${order.id}`}>
      <ListItemAvatar>
        {isLoading ? (
          <Avatar />
        ) : (
          <Avatar
            src={customer?.avatar}
            sx={{ bgcolor: 'background.paper' }}
            alt={customer?.userName}
          />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={new Date(order.date).toLocaleString('en-GB')}
        secondary={translate('Order items', {
          smart_count: order.basket.length,
          nb_items: order.basket.length,
          customer_name: customer
            ? customer?.userName
            : '',
        })}
      />
      <ListItemSecondaryAction>
        <Box
          component="span"
          sx={{
            marginRight: '1em',
            color: 'text.primary',
          }}
        >
          {order.total}$
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
