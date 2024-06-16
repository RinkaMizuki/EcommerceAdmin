import { Avatar, Box, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { memo } from "react";

const ChatItem = ({ mode, p, setConversation }) => {
    const formatDate = (date) => {
        return format(parseISO(date), "MMMM d");
    };
    return (
        <Box
            sx={{
                marginTop: "15px",
            }}
        >
            <div
                onClick={() => {
                    setConversation(p);
                }}
                style={{
                    // boxShadow:
                    //     "rgba(0, 0, 0, 0.19) 0px 10px 10px, rgba(0, 0, 0, 0) 0px 6px 6px",
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
                    <Avatar src={p.user?.url} alt={p.user?.avatar} />
                    <div
                        style={{
                            bottom: "0",
                            right: "0",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            border: `3px solid ${
                                mode === "dark" ? "#2B3033" : "#ffffff"
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
                        {p.user?.userName}
                    </Typography>
                    <p
                        style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "calc(100% - 20px)",
                            fontSize: "13px",
                            color: `${mode === "dark" ? "#d5d5d5" : "#838383"}`,
                        }}
                    >
                        {p.conversation?.lastestMessage}
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
                        {formatDate(p.conversation?.lastestSend)}
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
            </div>
        </Box>
    );
};
export default memo(ChatItem);
