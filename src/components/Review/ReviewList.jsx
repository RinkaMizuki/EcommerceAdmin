import * as React from 'react';
import { useCallback } from 'react';
import {
  CreateButton,
  ExportButton,
  FilterButton,
  List,
  SelectColumnsButton,
  TopToolbar,
} from 'react-admin';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer, useMediaQuery } from '@mui/material';

import ReviewListDesktop from './ReviewListDesktop';
import ReviewFilter from './ReviewFilter';
import ReviewEdit from './ReviewEdit';
import ReviewListMobile from './ReviewListMobile';

const ReviewListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <SelectColumnsButton />
    <ExportButton />
  </TopToolbar>
);

const ReviewList = () => {
  const isXSmall = useMediaQuery(theme =>
    theme.breakpoints.down('sm')
  );
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate('/rates');
  }, [navigate]);

  const match = matchPath('/rates/:id', location.pathname);

  return (
    <Box display="flex">
      <List
        sx={{
          '.RaList-actions': {
            flexDirection: "row"
          },
          flexGrow: 1,
          transition: (theme) =>
            theme.transitions.create(['all'], {
              duration: theme.transitions.duration.enteringScreen,
            }),
          marginRight: !!match ? '400px' : 0,
        }}
        filters={ReviewFilter}
        perPage={25}
        sort={{ field: 'date', order: 'DESC' }}
        actions={<ReviewListActions />}
      >
        {isXSmall ? (
          <ReviewListMobile />
        ) : (
          <ReviewListDesktop
            selectedRow={
              !!match
                ? parseInt((match).params.id, 10)
                : undefined
            }
          />
        )}
      </List>
      <Drawer
        variant="persistent"
        open={!!match}
        anchor="right"
        onClose={handleClose}
        sx={{ zIndex: 100 }}
      >
        {/* To avoid any errors if the route does not match, we don't render at all the component in this case */}
        {!!match && (
          <ReviewEdit
            id={(match).params.id}
            onCancel={handleClose}
          />
        )}
      </Drawer>
    </Box>
  );
};

export default ReviewList;