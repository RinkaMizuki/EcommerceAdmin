import { AppBar, TitlePortal, UserMenu } from 'react-admin';
import { AvatarField } from '../Field/AvatarField';
import { userService } from '../../services/userService';
import Logo from './Logo';
import { Box, useMediaQuery } from '@mui/material';
import { AppBarToolbar } from '../Layout/AppBarToolbar';
const Profile = () => {
  const data = userService.getUser();
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
    <AppBar
      color="primary"
      userMenu={<UserProfile />}
      toolbar={<AppBarToolbar />}
    >
      <TitlePortal />
      {isLargeEnough && <Logo />}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar>
  );
};