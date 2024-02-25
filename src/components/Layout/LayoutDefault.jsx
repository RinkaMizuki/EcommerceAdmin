import { Layout } from 'react-admin';
import { Navbar } from '../Navbar/Navbar';

import { MyMenu } from '../Menu/MyMenu';

export const LayoutDefault = props => <Layout
  {...props}
  appBar={Navbar}
  menu={MyMenu}
  sx={{
    '& .MuiBox-root': {
      marginLeft: "5px"
    },
    '& .MuiPaper-rounded': {
      overflow: "hidden"
    },
    '& .MuiTypography-h6 > .RaConfigurable-root:nth-of-type(2)': {
      display: "none"
    },
    '& .MuiStack-root > .MuiTypography-body2' : {
      marginTop: "2px"
    }
  }}
/>;