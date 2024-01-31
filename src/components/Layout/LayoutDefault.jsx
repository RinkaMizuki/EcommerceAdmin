import { Layout } from 'react-admin';
import { Navbar } from '../Navbar/Navbar';

import { MyMenu } from '../Menu/MyMenu';

export const LayoutDefault = props => <Layout
  {...props}
  appBar={Navbar}
  menu={MyMenu}
  sx={{
    '& .css-12r8yl0-MuiDrawer-docked-RaSidebar-root .MuiPaper-root': {
      width: "200px"
    },
    '& .css-83fbe1-MuiDrawer-docked-RaSidebar-root .MuiPaper-root': {
      width: "200px"
    }
  }}
/>;