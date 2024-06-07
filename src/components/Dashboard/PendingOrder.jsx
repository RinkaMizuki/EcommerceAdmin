import {
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useReference } from 'react-admin';


export const PendingOrder = (props) => {
  const { order } = props;
  const { referenceRecord: customer, isLoading } = useReference({
    reference: 'users',
    id: order.userId,
  });
  const orderDate = new Date(order.orderDate).toLocaleString('en-GB');
  const itemCount = order.orderDetails.length;
  const customerName = customer ? customer.userName : '';

  const secondaryText = `by ${customerName}, ${itemCount} item${itemCount > 1 ? 's' : ''}`;
  return (
    <ListItem button component={Link} to={`/orders/${order.id}`}>
      <ListItemAvatar>
        {isLoading ? (
          <Avatar />
        ) : (
          <Avatar
            src={customer?.url}
            sx={{ bgcolor: 'background.paper' }}
            alt={customer?.avatar}
          />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={orderDate}
        secondary={secondaryText}
      />
      <ListItemSecondaryAction>
        <Box
          component="span"
          sx={{
            marginRight: '1em',
            color: 'text.primary',
          }}
        >
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
