import { Layout } from 'react-admin';
import { Navbar } from '../Navbar/Navbar';

import { MyMenu } from '../Menu/MyMenu';

export const LayoutDefault = props => <Layout {...props} appBar={Navbar} menu={MyMenu} />;