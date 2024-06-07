import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';

import {
  ReferenceField,
  FunctionField,
  useGetList,
  useTranslate,
  useIsDataLoaded,
} from 'react-admin';

import queryString from 'query-string';

import CardWithIcon from './CardWithIcon';
import StarRatingField from '../Review/StarRatingField';

const PendingReviews = () => {
  const translate = useTranslate();
  const { data: reviews, total, isLoading } = useGetList('rates', {
    filter: { status: 'pending' },
    sort: { field: 'createdAt', order: 'DESC' },
    pagination: { page: 1, perPage: 100 },
  });

  const isCustomerDataLoaded = useIsDataLoaded(
    ['users', 'getMany', { ids: [String(reviews?.[0]?.userId)] }],
    { enabled: !isLoading && reviews && reviews.length > 0 }
  );
  const display = isLoading || !isCustomerDataLoaded ? 'none' : 'block';

  return (
    <CardWithIcon
      to={{
        pathname: '/rates',
        search: queryString.stringify({
          filter: JSON.stringify({ status: 'pending' }),
        }),
      }}
      icon={CommentIcon}
      title={translate('Pending reviews')}
      subtitle={total}
    >
      <List sx={{ display }}>
        {reviews?.map((record) => (
          <ListItem
            key={record.id}
            button
            component={Link}
            to={`/rates/${record.id}`}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <ReferenceField
                record={record}
                source="userId"
                reference="users"
                link={false}
              >
                <FunctionField
                  render={customer => (
                    <Avatar
                      src={customer.url}
                      alt={customer.avatar}
                      sx={{
                        bgcolor: 'background.paper',
                      }}
                    />
                  )}
                />
              </ReferenceField>
            </ListItemAvatar>

            <ListItemText
              primary={<StarRatingField record={record} />}
              secondary={record.content}
              sx={{
                overflowY: 'hidden',
                height: '4em',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                paddingRight: 0,
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/rates"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: 'primary.main' }}>
          {translate('See All reviews')}
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default PendingReviews;