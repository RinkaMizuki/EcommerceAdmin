import SendIcon from "@mui/icons-material/Send";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GifBoxIcon from "@mui/icons-material/GifBox";
import { Box, ClickAwayListener, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiPicker from "emoji-picker-react";
import { forwardRef, useEffect, useState } from "react";
import { TooltipTitle } from "./TooltipAction";

const ChatBox = forwardRef(
  ({ setMessage, message, handleSendMessage, editMessage }, ref) => {
    const [isShowEmoji, setIsShowEmoji] = useState(false);

    const handleChooseEmoji = (emojiObj, e) => {
      setMessage((prevText) => `${prevText}${emojiObj.emoji}`);
    };

    useEffect(() => {
      if (ref.current) {
        ref.current.style.paddingRight = "40px";
      }
    }, []);

    return (
      <Box
        sx={{
          boxShadow: "0px -1px 3px -1px #111",
          position: "relative",
          aside: {
            position: "absolute",
            bottom: "103%",
            left: 0,
          },
        }}
      >
        {isShowEmoji ? (
          <ClickAwayListener
            onClickAway={() => {
              setIsShowEmoji(false);
            }}
          >
            <>
              <EmojiPicker
                open={isShowEmoji}
                onEmojiClick={handleChooseEmoji}
                style={{ zIndex: 9999 }}
              />
            </>
          </ClickAwayListener>
        ) : null}

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
              <div onClick={() => setIsShowEmoji(!isShowEmoji)}>
                <AddReactionIcon
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </div>
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
              inputRef={ref}
              fullWidth
              label="Message"
              id="message-input"
              size="small"
              color="secondary"
              autoFocus={true}
              value={message}
              onKeyDown={(e) => {
                setIsShowEmoji(false);
                handleSendMessage(e);
              }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <TooltipTitle
              title={!editMessage ? "Send" : "Edit"}
              offsetX={-10}
              offsetY={-10}
            >
              <div
                onClick={(e) => {
                  setIsShowEmoji(false);
                  handleSendMessage(e);
                }}
                style={{
                  cursor: "pointer",
                  top: "55%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  position: "absolute",
                }}
              >
                {!editMessage ? <SendIcon /> : <CheckCircleIcon />}
              </div>
            </TooltipTitle>
          </Box>
        </Box>
      </Box>
    );
  }
);
export default ChatBox;
