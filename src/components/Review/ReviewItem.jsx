import { Fragment } from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  useCreatePath,
  ReferenceField,
  FunctionField,
  TextField,
  useRecordContext,
} from 'react-admin';
import { AvatarField } from '../Field/AvatarField';


export const ReviewItem = () => {
  const record = useRecordContext();
  const createPath = useCreatePath();
  if (!record) {
    return null;
  }
  return (
    <MuiLink
      to={createPath({
        resource: 'rates',
        type: 'edit',
        id: record.id,
      })}
      component={Link}
      underline="none"
      color="inherit"
    >
      <ListItem button>
        <ListItemAvatar>
          <ReferenceField
            source="userId"
            reference="users"
            link={true}
          >
            <AvatarField size="40" />
          </ReferenceField>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Fragment>
              <ReferenceField
                source="userId"
                reference="users"
                link={false}
              >
                <FunctionField
                  render={record =>
                    `${record.userName}`
                  }
                  variant="subtitle1"
                />
              </ReferenceField>{' '}
              on{' '}
              <ReferenceField
                source="productId"
                reference="products"
                link={false}
              >
                <TextField
                  source="title"
                  variant="subtitle1"
                />
              </ReferenceField>
            </Fragment>
          }
          secondary={record.content}
          secondaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    </MuiLink>
  );
};