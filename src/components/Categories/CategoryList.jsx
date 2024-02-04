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
        <RecordContextProvider key={record.id} value={record}>
          <Grid
            key={record.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            item
          >
            <Card>
              <CardMedia
                image={record.product?.url}
                sx={{ height: 140 }}
              />
              <CardContent sx={{ paddingBottom: '0.5em' }}>
                <Typography
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  {record.title}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  '.MuiCardActions-spacing': {
                    display: 'flex',
                    justifyContent: 'space-around',
                  },
                }}
              >
                <LinkToRelatedProducts />
                <EditButton />
              </CardActions>
            </Card>
          </Grid>
        </RecordContextProvider>
      ))}
    </Grid>
  );
};
