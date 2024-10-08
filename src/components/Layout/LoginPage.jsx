import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Form, required, TextInput, useLogin, useNotify } from "react-admin";

import Box from "@mui/material/Box";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const login = useLogin();
  const boxRef = useRef(null);

  const handleSubmit = (auth) => {
    setLoading(true);
    login(auth).catch((error) => {
      setLoading(false);
      notify(
        typeof error === "string"
          ? error
          : typeof error === "undefined" || !error.message
          ? "Sign in error"
          : error.message,
        {
          type: "error",
          messageArgs: {
            _:
              typeof error === "string"
                ? error
                : error && error.message
                ? error.message
                : undefined,
          },
        }
      );
      setTimeout(() => {
        window.location.reload();
      }, 300);
    });
  };

  useEffect(() => {
    fetch("https://api.unsplash.com/photos/random", {
      headers: {
        Authorization: `Client-ID SDynFX-uXY-s89Epbp-VNjF4qpMRgyNGyb0O1A0MuOA`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.urls.raw;
        boxRef.current.style.backgroundImage = `url(${imageUrl})`;
      });
  }, []);
  return (
    <Form onSubmit={handleSubmit}>
      <Box
        ref={boxRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Card sx={{ minWidth: 300, marginTop: "6em" }}>
          <Box
            sx={{
              margin: "1em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <LockIcon />
            </Avatar>
          </Box>
          <Box
            sx={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            ADMIN
          </Box>
          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                autoFocus
                source="username"
                label="Username or Email"
                disabled={loading}
                validate={required()}
                fullWidth
                resettable
              />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                source="password"
                label="Password"
                type="password"
                disabled={loading}
                validate={required()}
                fullWidth
                resettable
              />
            </Box>
          </Box>
          <CardActions sx={{ padding: "0 1em 1em 1em" }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading && <CircularProgress size={25} thickness={2} />}
              {!loading && "Sign in"}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Form>
  );
};

export default LoginPage;
