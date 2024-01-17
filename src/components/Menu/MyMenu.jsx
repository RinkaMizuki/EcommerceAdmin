import { Menu } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';

export const MyMenu = () => (
  <Menu>
    <Menu.DashboardItem />
    <Menu.ResourceItem name="users" />
    <Menu.Item to="/segments" primaryText="Segments" leftIcon={<LabelIcon />} />
  </Menu>
);