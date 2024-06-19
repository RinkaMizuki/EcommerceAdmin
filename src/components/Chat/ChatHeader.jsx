import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";
import { Avatar, Box, Typography } from "@mui/material";
import { memo } from "react";
import { Link } from "react-admin";

const ChatHeader = ({ participant, isActive }) => {
    return (
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
                    paddingY: "5px",
                    paddingX: "10px",
                }}
            >
                <Box
                    sx={{
                        borderRadius: "5px",
                        cursor: "pointer",
                        padding: "5px",
                        ":hover": {
                            bgcolor: "#4e4e4e85",
                        },
                    }}
                >
                    <Link
                        to={`/users/${participant.user?.userId}`}
                        sx={{
                            gap: "5px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            src={participant.user?.url}
                            alt={participant.user?.avatar}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h4"
                                sx={{
                                    lineHeight: 1,
                                }}
                            >
                                {participant.user?.userName}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h6"
                                sx={{
                                    fontSize: "13px",
                                    color: "#b4b4b4",
                                }}
                            >
                                <span
                                    style={{
                                        display: "inline-block",
                                        marginRight: "5px",
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        boxSizing: "unset",
                                        backgroundColor: `${
                                            isActive ? "#4daa57" : "#8d8d8d"
                                        }`,
                                    }}
                                ></span>
                                {isActive ? "Active" : "Inactive"}
                            </Typography>
                        </Box>
                    </Link>
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
    );
};
export default memo(ChatHeader);
