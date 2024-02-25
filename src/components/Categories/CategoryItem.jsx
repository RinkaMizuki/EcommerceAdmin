import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import LinkToRelatedProducts from "./LinkToRelatedProducts";
import { EditButton, RecordContextProvider } from "react-admin";

const CategoryItem = ({ record }) => {
  return (
    <RecordContextProvider value={record}>
      <Grid
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={2}
        item
      >
        <Card>
          <CardMedia
            image={record.products[0]?.url}
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
      {record?.listProductCategoryChild.length > 0 && (
        record?.listProductCategoryChild.map((subCategory) => {
          return (
            <CategoryItem key={subCategory.id} record={subCategory} />
          )
        })
      )}
    </RecordContextProvider>
  )
};

export default CategoryItem;
