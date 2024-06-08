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
import { Box, Drawer } from '@mui/material';

import ContactListDesktop from './ContactListDesktop';
import ContactFilter from './ContactFilter';
import ContactEdit from './ContactEdit';

const ContactListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <SelectColumnsButton />
    <ExportButton />
  </TopToolbar>
);

const ContactList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate('/contacts');
  }, [navigate]);

  const match = matchPath('/contacts/:id', location.pathname);

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
        filters={ContactFilter}
        perPage={25}
        sort={{ field: 'date', order: 'DESC' }}
        actions={<ContactListActions />}
      >
        <ContactListDesktop />
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
          <ContactEdit
            id={(match).params.id}
            onCancel={handleClose}
          />
        )}
      </Drawer>
    </Box>
  );
};

export default ContactList;