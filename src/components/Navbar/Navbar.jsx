import { AppBar, UserMenu } from 'react-admin';
import { AvatarField } from '../Field/AvatarField';
import { tokenService } from '../../services/tokenService';
import { useCallback, useState } from 'react';


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

export const Navbar = () => <AppBar color="primary" userMenu={<UserProfile />} />;