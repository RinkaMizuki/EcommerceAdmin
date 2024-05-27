import { AppBar, TitlePortal, UserMenu } from 'react-admin';
import { AvatarField } from '../Field/AvatarField';
import { userService } from '../../services/userService';
import Logo from './Logo';
import { Box, useMediaQuery } from '@mui/material';
import { AppBarToolbar } from '../Layout/AppBarToolbar';
import { useEffect, useState } from 'react';
import * as signalR from "@microsoft/signalr";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { getAccessToken, refreshAuth } from '../../services/tokenService';
import { jwtDecode } from 'jwt-decode';
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

  const [isShowNotifications, setIsShowNotifications] = useState(false);

  const accessTokenFactory = async () => {
    let token = getAccessToken();
    // Kiểm tra xem token đã hết hạn chưa
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp < Date.now() / 1000) {
      // Nếu token đã hết hạn, làm mới token
      await refreshAuth();
      token = getAccessToken();
    }
    // Trả về token mới hoặc cũ tùy thuộc vào tình trạng làm mới token
    console.log(token);
    return token
  };

  useEffect(() => {

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/admin/orderhub`, {
        accessTokenFactory: async () => await accessTokenFactory(),
        withCredentials: true,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveMessage", data => {
      console.log(data);
    });

    connection.start()
      .then(() => connection.invoke("SendMessage", "Ayaka ne", "Hello kaka"))
      .catch(err => console.log('Error connecting to SignalR', err));
    return () => {
      if (connection.state === signalR.HubConnectionState.Connected) {
        connection.stop();
      }
    }
  }, [])

  return (
    <AppBar
      color="primary"
      userMenu={<UserProfile />}
      toolbar={<AppBarToolbar
        setIsShowNotifications={setIsShowNotifications}
        isShowNotifications={isShowNotifications}
      />}
      sx={{
        position: "relative",
      }}
    >
      {isShowNotifications && <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: "absolute",
          top: "40px",
          borderRadius: "5px",
          right: '10%'
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Brunch this weekend?
                </Typography>
              </>
            }
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Summer BBQ
                </Typography>
              </>
            }
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Summer BBQ
                </Typography>
              </>
            }
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </>
            }
          />
        </ListItem>
      </List>}
      <TitlePortal />
      {isLargeEnough && <Logo />}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar>
  );
};