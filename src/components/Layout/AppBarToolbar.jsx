import { LoadingIndicator, LocalesMenuButton, ToggleThemeButton } from 'react-admin';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const AppBarToolbar = ({ setIsShowNotifications, isShowNotifications }) => (
  <div style={{ display: "flex", alignItems: "center", position: "relative" }} onClick={() => setIsShowNotifications(!isShowNotifications)}>
    <NotificationsIcon sx={{
      marginRight: "10px",
      cursor: "pointer"
    }} />
    <ToggleThemeButton />
    <LoadingIndicator />
    {/* <LocalesMenuButton /> */}
  </div>
);
