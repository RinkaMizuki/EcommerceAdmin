import * as React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useCreatePath, NumberField, useListContext } from 'react-admin';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css"

const GridList = () => {
  const { isLoading } = useListContext();
  return isLoading ? <LoadingGridList /> : <LoadedGridList />;
};

const useColsForWidth = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const xl = useMediaQuery(theme.breakpoints.up('xl'));
  // there are all dividers of 24, to have full rows on each page
  if (xl) return 6;
  if (lg) return 5;
  if (md) return 3;
  if (sm) return 2;
  return 2;
};

const times = (nbChildren, fn) =>
  Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = () => {
  const { perPage } = useListContext();
  const cols = useColsForWidth();
  return (
    <ImageList rowHeight={180} cols={cols} sx={{ m: 0 }}>
      {times(perPage, key => (
        <ImageListItem key={key}>
          <Box bgcolor="grey.300" height="100%" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

const LoadedGridList = () => {
  const { data } = useListContext();
  const cols = useColsForWidth();
  const createPath = useCreatePath();
  if (!data) return null;

  return (
    <ImageList rowHeight={180} cols={cols} sx={{ m: 0 }}>
      {data.map(record => (
        <ImageListItem
          component={Link}
          key={record.id}
          to={createPath({
            resource: 'products',
            id: record.id,
            type: 'edit',
          })}
          sx={{
            "& > .lazy-load-image-background": {
              height: "100%"
            }
          }}
        >
          <LazyLoadImage
            src={record.url}
            alt={record.image}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              display: "block"
            }}
            effect='blur'
          />
          <ImageListItemBar
            title={record.title}
            subtitle={
              <span>
                <NumberField
                  source="price"
                  record={record}
                  color="inherit"
                  sx={{
                    display: 'block',
                    fontSize: '1em',
                    textAlign: 'center'
                  }}
                  locales="fr-FR"
                  options={{
                    style: 'currency',
                    currency: 'VND',
                  }}
                />
              </span>
            }
            sx={{
              textAlign: 'center',
              background:
                'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
            }}
          />
        </ImageListItem>
      ))
      }
    </ImageList >
  );
};

export default GridList;