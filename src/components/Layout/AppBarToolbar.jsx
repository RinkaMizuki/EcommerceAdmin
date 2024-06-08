import { LoadingIndicator, LocalesMenuButton, ToggleThemeButton } from 'react-admin';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./Layout.css";
import { Button } from '@mui/material';

export const AppBarToolbar = ({ setIsNewNoti, isNewNoti, handleClick, open }) => (
  <div style={{ display: "flex", alignItems: "center", position: "relative" }} >

    <Button
      color='inherit'
      sx={{
        minWidth: "unset",
      }}
      id="fade-button"
      aria-controls={open ? 'fade-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={(e) => {
        handleClick(e)
        setIsNewNoti(false);
      }}
    >
      {!isNewNoti ? <NotificationsIcon sx={{
        cursor: "pointer"
      }} />
        : <NotificationsActiveIcon sx={{
          marginRight: "10px",
          cursor: "pointer",
          animation: "shake 0.5s ease-in-out 0.5s infinite"
        }} />}
    </Button>
    <ToggleThemeButton />
    <LoadingIndicator />
    {/* <LocalesMenuButton /> */}
  </div>
);
