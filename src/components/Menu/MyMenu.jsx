import { Menu, MenuItemLink, useSidebarState } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ReviewsIcon from '@mui/icons-material/Reviews';
import GroupIcon from '@mui/icons-material/Group';
import { Box } from '@mui/material';
import { useState } from 'react';
import SubMenu from './SubMenu';
export const MyMenu = ({ dense = false }) => {

  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true,
  });

  const [open] = useSidebarState();

  const handleToggle = (menu) => {
    setState(state => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: theme =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Menu.DashboardItem />
      <SubMenu
        handleToggle={() => handleToggle('menuCatalog')}
        isOpen={state.menuCatalog}
        name="Catalog"
        icon={<ProductionQuantityLimitsIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/products"
          state={{ _scrollToTop: true }}
          primaryText="Products"
          leftIcon={<ProductionQuantityLimitsIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/categories"
          state={{ _scrollToTop: true }}
          primaryText="Categories"
          leftIcon={<BookmarkIcon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle('menuCustomers')}
        isOpen={state.menuCustomers}
        name="Customers"
        icon={<GroupIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/users"
          state={{ _scrollToTop: true }}
          primaryText="Customers"
          leftIcon={<GroupIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/segments"
          state={{ _scrollToTop: true }}
          primaryText="Segments"
          leftIcon={<LabelIcon />}
          dense={dense}
        />
      </SubMenu>
      <Menu.Item to="/rates" primaryText="Rates" leftIcon={<ReviewsIcon />} />

    </Box>
  )
};