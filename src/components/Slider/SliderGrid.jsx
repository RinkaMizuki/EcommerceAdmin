import * as React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useCreatePath, useListContext, TextField } from 'react-admin';
import { Link } from 'react-router-dom';

const SliderGrid = () => {
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
  if (xl) return 8;
  if (lg) return 6;
  if (md) return 4;
  if (sm) return 3;
  return 2;
};

const times = (nbChildren, fn) =>
  Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = () => {
  const { perPage } = useListContext();
  return (
    <ImageList rowHeight={300} cols={3} sx={{ m: 0 }}>
      {times(perPage - 6, key => (
        <ImageListItem key={key}>
          <Box bgcolor="grey.300" height="100%" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

const LoadedGridList = () => {
  const { data } = useListContext();
  const createPath = useCreatePath();
  if (!data) return null;

  return (
    <ImageList rowHeight={300} cols={3} sx={{ m: 0, marginTop: "30px" }}>
      {data.map(record => (
        <ImageListItem
          component={Link}
          key={record.id}
          to={createPath({
            resource: 'sliders',
            id: record.id,
            type: 'edit',
          })}
        >
          <img src={record.url} alt={record.image} style={{ height: "100%" }} />
          <ImageListItemBar
            title={record.title}
            subtitle={
              <span>
                <TextField
                  record={record}
                  color="inherit"
                  sx={{
                    display: 'block',
                    fontSize: '1em',
                    textAlign: 'center'
                  }}
                  source="description"
                ></TextField>
              </span>
            }
            sx={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default SliderGrid;