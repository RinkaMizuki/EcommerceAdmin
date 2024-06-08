import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import LinkToRelatedProducts from "./LinkToRelatedProducts";
import { EditButton, RecordContextProvider } from "react-admin";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css"


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
        <Card sx={{
          "& > .lazy-load-image-background": {
            width: "100%"
          }
        }}
        >
          <LazyLoadImage
            src={record.products[0]?.url}
            alt={record.image}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "150px",
              display: "block"
            }}
            effect='blur'
          />
          <CardContent sx={{ paddingBottom: '0.5em' }}>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis"
              }}
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
      {
        record?.listProductCategoryChild.length > 0 && (
          record?.listProductCategoryChild.map((subCategory) => {
            return (
              <CategoryItem key={subCategory.id} record={subCategory} />
            )
          })
        )
      }
    </RecordContextProvider >
  )
};

export default CategoryItem;
