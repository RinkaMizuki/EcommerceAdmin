import { Avatar, Box, Typography } from "@mui/material";

const ChatItem = ({ mode }) => {
    return (
        <Box
            sx={{
                marginTop: "15px",
            }}
        >
            <Box
                sx={{
                    boxShadow:
                        "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0) 0px 6px 6px",
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
                        Hehe
                    </Typography>
                    <p
                        style={{
                            fontSize: "13px",
                            color: `${mode === "dark" ? "#d5d5d5" : "#838383"}`,
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
    );
};
export default ChatItem;
