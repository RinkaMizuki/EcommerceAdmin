import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";
import { Avatar, Box, Typography } from "@mui/material";
import { memo } from "react";

const ChatHeader = ({ conversation }) => {
    console.log(conversation);
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
                        src={conversation.user?.url}
                        alt={conversation.user?.avatar}
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
                            {conversation.user?.userName}
                        </Typography>
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{
                                fontSize: "13px",
                                color: "#b4b4b4",
                            }}
                        >
                            {conversation.user?.email}
                        </Typography>
                    </Box>
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
