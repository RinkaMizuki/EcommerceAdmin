import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLogout, useTheme } from "react-admin";
import Divider from "@mui/material/Divider";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";
import SendIcon from "@mui/icons-material/Send";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GifBoxIcon from "@mui/icons-material/GifBox";
import ChatItem from "./ChatItem";
import { useEffect, useState } from "react";
import { chathubConnection } from "../../services/realtimeService";
import * as signalR from "@microsoft/signalr";
import { userService } from "../../services/userService";

const ChatList = () => {
    const mode = useTheme()[0];
    const [message, setMessage] = useState("");
    const logout = useLogout();

    useEffect(() => {
        chathubConnection.on("ReceiveMessage", (newMessage) => {
            console.log(newMessage);
        });

        if (
            chathubConnection.state === signalR.HubConnectionState.Disconnected
        ) {
            chathubConnection
                .start()
                .then(() => {
                    console.log("ChatHub connected successfully.");
                })
                .catch((err) => {
                    console.log(err);
                    if (err.status === 403) {
                        logout();
                    }
                });
        }

        return () => {
            if (
                chathubConnection.state === signalR.HubConnectionState.Connected
            ) {
                chathubConnection
                    .stop()
                    .then(() =>
                        console.warn("ChatHub disconnected successfully.")
                    );
            }
        };
    }, []);

    const handleSendMessage = () => {
        if (message) {
            const currentUser = userService.getUser();
            chathubConnection.invoke(
                "SendMessageToRandomAdmin",
                currentUser.userName
            );
            setMessage("");
        }
    };

    return (
        <Grid
            container
            spacing={2}
            sx={{
                marginTop: "10px",
                boxShadow:
                    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                borderRadius: "5px",
            }}
        >
            <Grid
                item
                xs={4}
                bgcolor={`${mode === "dark" ? "#2B3033 " : "#ffffff"}`}
                borderRadius="5px"
                paddingRight="18px"
                paddingBottom="18px"
                sx={{
                    borderTopRightRadius: "unset",
                    borderBottomRightRadius: "unset",
                }}
            >
                <Box
                    sx={{
                        marginBottom: "10px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{
                                cursor: "default",
                            }}
                        >
                            Messages
                        </Typography>
                        <div
                            style={{
                                cursor: "pointer",
                                width: "25px",
                                height: "25px",
                            }}
                        >
                            <svg
                                className="svg-icon"
                                style={{
                                    verticalAlign: "middle",
                                    fill: "currentColor",
                                    overflow: "hidden",
                                }}
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z" />
                                <path d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z" />
                            </svg>
                        </div>
                    </Box>
                    <Box
                        sx={{
                            position: "relative",
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Search"
                            id="outlined-size-small"
                            size="small"
                        />
                        <SearchIcon
                            sx={{
                                position: "absolute",
                                top: "55%",
                                transform: "translateY(-50%)",
                                right: "5%",
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        "::-webkit-scrollbar": {
                            borderRadius: "15px",
                            width: "8px",
                            background: "unset",
                        },
                        "::-webkit-scrollbar-track": {
                            borderRadius: "15px",
                        },
                        "::-webkit-scrollbar-thumb": {
                            borderRadius: "15px",
                            boxShadow: "none",
                            background: `${
                                mode === "dark" ? "#d5d5d5" : "#838383"
                            }`,
                        },
                        maxHeight: "500px",
                        height: "500px",
                        overflow: "overlay",
                        scrollbarGutter: "stable both-edges",
                        overflowX: "hidden",
                    }}
                >
                    <ChatItem mode={mode} />
                    <Box>
                        <Box
                            sx={{
                                borderRadius: "5px",
                                cursor: "pointer",
                                padding: "15px",
                                display: "flex",
                                alignItems: "center",
                                gap: "15px",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                }}
                            >
                                <Avatar
                                    src="https://mui.com/static/images/avatar/2.jpg"
                                    alt="Hehe"
                                />
                                <div
                                    style={{
                                        bottom: "0",
                                        right: "0",
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        border: `3px solid ${
                                            mode === "dark"
                                                ? "#2B3033"
                                                : "#ffffff"
                                        }`,
                                        boxSizing: "unset",
                                        backgroundColor: "#4daa57",
                                        position: "absolute",
                                    }}
                                ></div>
                            </Box>
                            <Box
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography fontWeight="600" fontSize="15px">
                                    Hehe
                                </Typography>
                                <p
                                    style={{
                                        fontSize: "13px",
                                        color: `${
                                            mode === "dark"
                                                ? "#d5d5d5"
                                                : "#838383"
                                        }`,
                                    }}
                                >
                                    Hello Hehe, How are you today ?
                                </p>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "3px",
                                    alignSelf: "flex-end",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "13px",
                                    }}
                                >
                                    Dec 08
                                </Typography>
                                <div
                                    style={{
                                        display: "flex",
                                        alignSelf: "flex-end",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "13px",
                                        height: "13px",
                                        backgroundColor: "#0866ff",
                                        borderRadius: "50%",
                                    }}
                                ></div>
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                </Box>
            </Grid>
            <Grid
                item
                xs={8}
                bgcolor={`${mode === "dark" ? "#2B3033 " : "#ffffff"}`}
                borderRadius="5px"
                sx={{
                    borderTopLeftRadius: "unset",
                    borderBottomLeftRadius: "unset",
                    borderLeft: "1px solid #393939",
                    padding: "0 !important",
                }}
            >
                {/* Header chat area */}
                <Box
                    sx={{
                        boxShadow: "0px 2px 3px -1px #111",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingY: "10px",
                            paddingX: "15px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            <Avatar
                                src="https://mui.com/static/images/avatar/2.jpg"
                                alt="Hehe"
                            />
                            <Typography variant="h6" component="h6">
                                Hehe
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    ":hover": {
                                        bgcolor: "#4e4e4e85",
                                    },
                                }}
                            >
                                <CallIcon
                                    sx={{
                                        color: "#00a838",
                                        cursor: "pointer",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    ":hover": {
                                        bgcolor: "#4e4e4e85",
                                    },
                                }}
                            >
                                <VideocamIcon
                                    sx={{
                                        color: "#00a838",
                                        cursor: "pointer",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                    ":hover": {
                                        bgcolor: "#4e4e4e85",
                                    },
                                }}
                            >
                                <InfoIcon
                                    sx={{
                                        borderRadius: "50%",
                                        color: "#00a838",
                                        cursor: "pointer",
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {/* Body chat area */}
                <Box>
                    <Box
                        className="card-body"
                        sx={{
                            "::-webkit-scrollbar": {
                                borderRadius: "15px",
                                width: "8px",
                                background: "unset",
                            },
                            "::-webkit-scrollbar-track": {
                                borderRadius: "15px",
                            },
                            "::-webkit-scrollbar-thumb": {
                                borderRadius: "15px",
                                boxShadow: "none",
                                background: `${
                                    mode === "dark" ? "#d5d5d5" : "#838383"
                                }`,
                            },
                            maxHeight: "511px",
                            position: "relative",
                            overflow: "overlay",
                            scrollbarGutter: "stable both-edges",
                            overflowX: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                paddingX: "5px",
                            }}
                        >
                            <div className="d-flex flex-row justify-content-start">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                    alt="avatar 1"
                                    style={{
                                        width: "45px",
                                        height: "100%",
                                    }}
                                />
                                <div>
                                    <p
                                        className="small p-2 ms-3 mb-1 rounded-3"
                                        style={{
                                            color: "#000000",
                                            backgroundColor: "#f5f6f7",
                                        }}
                                    >
                                        Hi
                                    </p>
                                    <p
                                        className="small p-2 ms-3 mb-1 rounded-3"
                                        style={{
                                            color: "#000000",
                                            backgroundColor: "#f5f6f7",
                                        }}
                                    >
                                        How are you ...???
                                    </p>
                                    <p
                                        className="small p-2 ms-3 mb-1 rounded-3"
                                        style={{
                                            color: "#000000",
                                            backgroundColor: "#f5f6f7",
                                        }}
                                    >
                                        What are you doing tomorrow? Can we come
                                        up a bar?
                                    </p>
                                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                                        23:58
                                    </p>
                                </div>
                            </div>

                            <div className="divider d-flex align-items-center mb-4">
                                <p
                                    className="text-center mx-3 mb-0"
                                    style={{
                                        color: "#a2aab7",
                                    }}
                                >
                                    Today
                                </p>
                            </div>

                            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                                <div>
                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                        Hiii, I'm good.
                                    </p>
                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                        How are you doing?
                                    </p>
                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                        Long time no see! Tomorrow office. will
                                        be free on sunday.
                                    </p>
                                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                                        00:06
                                    </p>
                                </div>
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                    alt="avatar 1"
                                    style={{
                                        width: "45px",
                                        height: "100%",
                                    }}
                                />
                            </div>
                            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                                <div>
                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                        Hiii, I'm good.
                                    </p>
                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                        How are you doing?
                                    </p>
                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                        Long time no see! Tomorrow office. will
                                        be free on sunday.
                                    </p>
                                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                                        00:06
                                    </p>
                                </div>
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                    alt="avatar 1"
                                    style={{
                                        width: "45px",
                                        height: "100%",
                                    }}
                                />
                            </div>
                            <div className="d-flex flex-row justify-content-start">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                    alt="avatar 1"
                                    style={{
                                        width: "45px",
                                        height: "100%",
                                    }}
                                />
                                <div>
                                    <p
                                        className="small p-2 ms-3 mb-1 rounded-3"
                                        style={{
                                            color: "#000000",
                                            backgroundColor: "#f5f6f7",
                                        }}
                                    >
                                        Hi
                                    </p>
                                    <p
                                        className="small p-2 ms-3 mb-1 rounded-3"
                                        style={{
                                            color: "#000000",
                                            backgroundColor: "#f5f6f7",
                                        }}
                                    >
                                        How are you ...???
                                    </p>
                                    <p
                                        className="small p-2 ms-3 mb-1 rounded-3"
                                        style={{
                                            color: "#000000",
                                            backgroundColor: "#f5f6f7",
                                        }}
                                    >
                                        What are you doing tomorrow? Can we come
                                        up a bar?
                                    </p>
                                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                                        23:58
                                    </p>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Box>
                {/* Chat box area */}
                <Box
                    sx={{
                        boxShadow: "0px -1px 3px -1px #111",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingY: "5px",
                            paddingX: "15px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flex: 1,
                                gap: "15px",
                                position: "relative",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <AddCircleIcon
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                />
                                <AddReactionIcon
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                />
                                <AddPhotoAlternateIcon
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                />
                                <GifBoxIcon
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                />
                            </Box>
                            <TextField
                                fullWidth
                                label="Message"
                                id="message-input"
                                size="small"
                                color="secondary"
                                autoFocus={true}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <div
                                onClick={handleSendMessage}
                                style={{
                                    cursor: "pointer",
                                    top: "55%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    position: "absolute",
                                }}
                            >
                                <SendIcon />
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};
export default ChatList;
