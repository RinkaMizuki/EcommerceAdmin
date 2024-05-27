import { Layout } from 'react-admin';
import { Navbar } from '../Navbar/Navbar';

import { MyMenu } from '../Menu/MyMenu';

export const LayoutDefault = props => <Layout
  {...props}
  appBar={Navbar}
  menu={MyMenu}
  sx={{
    '& .RaLayout-appFrame': {
      marginTop: "0",
    },
    '& .RaSidebar-fixed': {
      marginLeft: "5px",
      marginTop: "-10px"
    },
    '& .MuiPaper-rounded': {
      overflow: "hidden"
    },
    '& .MuiTypography-h6 > .RaConfigurable-root:nth-of-type(2)': {
      display: "none"
    },
    '& .MuiStack-root > .MuiTypography-body2': {
      marginTop: "2px"
    },
    '& .RaLayout-contentWithSidebar': {
      marginTop: "10px"
    }
  }}
/>;