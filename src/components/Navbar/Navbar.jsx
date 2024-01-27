import { AppBar, TitlePortal, UserMenu } from 'react-admin';
import { AvatarField } from '../Field/AvatarField';
import { tokenService } from '../../services/tokenService';
import Logo from './Logo';
import { Box, useMediaQuery } from '@mui/material';

const Profile = () => {
  const data = tokenService.getUser();
  return (
    <AvatarField
      size='35'
      data={data}
    />
  )
};
const UserProfile = props => (<UserMenu {...props} icon={<Profile />} />);

export const Navbar = () => {
  const isLargeEnough = useMediaQuery(theme =>
    theme.breakpoints.up('sm')
  );
  return (
    <AppBar color="secondary" userMenu={<UserProfile />}>
      <TitlePortal />
      {isLargeEnough && <Logo />}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar>
  );
};