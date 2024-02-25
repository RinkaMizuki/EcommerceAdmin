import {
  CreateButton,
  EditButton,
  List,
  RecordContextProvider,
  TopToolbar,
  useListContext,
} from 'react-admin';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';

import LinkToRelatedProducts from './LinkToRelatedProducts';
import CategoryItem from './CategoryItem';

export const CategoryList = () => (
  <List
    sort={{ field: 'name', order: 'ASC' }}
    perPage={20}
    pagination={false}
    component="div"
    actions={<ListActions />}
  >
    <CategoryGrid />
  </List>
);
const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
const CategoryGrid = () => {
  const { data, isLoading } = useListContext();
  if (isLoading) {
    return null;
  }

  return (
    <Grid container spacing={2} sx={{ mt: 0 }}>
      {data.map(record => (
        <CategoryItem record={record} key={record.id} />
      ))}
    </Grid>
  );
};
