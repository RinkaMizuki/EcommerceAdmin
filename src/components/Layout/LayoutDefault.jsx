import { Layout } from 'react-admin';

import { Navbar } from '../Navbar/Navbar';

export const LayoutDefault = props => <Layout {...props} appBar={Navbar} />;