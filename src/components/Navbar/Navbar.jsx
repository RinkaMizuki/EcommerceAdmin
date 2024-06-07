import { AppBar, Link, TitlePortal, UserMenu } from 'react-admin';
import { AvatarField } from '../Field/AvatarField';
import { userService } from '../../services/userService';
import Logo from './Logo';
import { Box, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { AppBarToolbar } from '../Layout/AppBarToolbar';
import { useEffect, useRef, useState } from 'react';
import * as signalR from "@microsoft/signalr";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import signalrConnection from "../../services/realtimeService";
import { dataProvider } from '../../contexts/dataProvider';

const Profile = ({ currentAdmin }) => {
  return (
    <AvatarField
      size='35'
      data={currentAdmin}
    />
  )
};
const UserProfile = props => (<UserMenu {...props} icon={<Profile currentAdmin={props.currentAdmin} />} />);

export const Navbar = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  //const [isShowNotifications, setIsShowNotifications] = useState(false);
  const [listOrderNoti, setListOrderNoti] = useState([]);
  const [isNewNoti, setIsNewNoti] = useState(false);


  const currentAdmin = userService.getUser();
  const isLargeEnough = useMediaQuery(theme =>
    theme.breakpoints.up('sm')
  );

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    signalrConnection.on("ReceivedOrder", async (newOrderNoti) => {
      const { data: user } = await dataProvider.getOne('users', { id: newOrderNoti.userId });
      setListOrderNoti(prevNofi => [{ ...newOrderNoti, user }, ...prevNofi])
      setIsNewNoti(true)
    });

    //start signalrConnection to hub and call RFC SendMessage method
    if (signalrConnection.state === signalR.HubConnectionState.Disconnected) {
      signalrConnection.start().then(() => {
        console.log("SignalR connected successfully.");
      }).catch(err => console.log(err))
    }

    return () => {
      if (signalrConnection.state === signalR.HubConnectionState.Connected) {
        signalrConnection.stop().then(() => console.warn("SignalR disconnected successfully."));
      }
    }
  }, [])

  return (
    <AppBar
      color="primary"
      userMenu={<UserProfile currentAdmin={currentAdmin} />}
      toolbar={<AppBarToolbar
        setIsNewNoti={setIsNewNoti}
        isNewNoti={isNewNoti}
        handleClick={handleClick}
        open={open}
      />}
      sx={{
        position: "relative",
      }}
    >
      {
        open && <div>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {listOrderNoti.length ? listOrderNoti.map((od, index) => {
              return (
                <Link to={`/orders/${od.id}`}>
                  <MenuItem alignItems="flex-start" onClick={handleClose}>
                    <ListItemAvatar sx={{
                      cursor: 'pointer'
                    }}
                    >
                      <Avatar alt={od.user.avatar} src={od?.user.url} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        cursor: 'pointer'
                      }}
                      primary={
                        <>
                          <Typography color="text.secondary">
                            You have new order from <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {od?.user.userName}
                            </Typography>
                          </Typography>
                        </>
                      }
                      secondary={

                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Order: {od.id}
                        </Typography>

                      }
                    />
                  </MenuItem>
                  {!(index + 1 === listOrderNoti.length) && <Divider variant="inset" component="li" />}
                </Link>
              )
            }) : <MenuItem
              onClick={handleClose}
              sx={{
                color: "#bcbcbc",
                textAlign: "center",
              }}>You don't have any new order. It will notify if there is a new order !</MenuItem>}
          </Menu>
        </div>
      }
      <TitlePortal />
      {isLargeEnough && <Logo />}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar >
  );
};