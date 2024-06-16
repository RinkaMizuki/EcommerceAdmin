import SendIcon from "@mui/icons-material/Send";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GifBoxIcon from "@mui/icons-material/GifBox";
import { Box, TextField } from "@mui/material";

const ChatBox = ({ setMessage, message, handleSendMessage }) => {
    return (
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
    );
};
export default ChatBox;
