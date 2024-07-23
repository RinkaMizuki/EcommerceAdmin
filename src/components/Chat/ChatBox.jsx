import SendIcon from "@mui/icons-material/Send";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GifBoxIcon from "@mui/icons-material/GifBox";
import { Box, ClickAwayListener, TextField } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiPicker from "emoji-picker-react";
import CancelIcon from "@mui/icons-material/Cancel";
import { forwardRef, useEffect, useRef, useState } from "react";
import { TooltipTitle } from "./TooltipAction";

const ChatBox = forwardRef(
  (
    { setMessage, message, handleSendMessage, editMessage, setBlobs, blobs },
    ref
  ) => {
    const [isShowEmoji, setIsShowEmoji] = useState(false);
    const inputFileRef = useRef(null);
    const { content, files } = message;
    const handleChooseImage = (e) => {
      const arrayFile = Array.from(e.target.files);
      const arrayBlob = arrayFile.map((f) => URL.createObjectURL(f));
      setBlobs(arrayBlob);
      setMessage((prevMessage) => {
        return {
          ...prevMessage,
          files: arrayFile,
        };
      });
    };
    const handleChooseEmoji = (emojiObj, e) =>
      setMessage((prevMessage) => {
        return {
          ...prevMessage,
          content: `${prevMessage.content}${emojiObj.emoji}`,
        };
      });

    const handleRemoveImage = (removedB) => {
      URL.revokeObjectURL(removedB);
      setBlobs((prevBlobs) => prevBlobs.filter((currB) => currB !== removedB));
    };

    useEffect(() => {
      ref.current.style.paddingRight = "50px";
      return () => blobs.forEach((b) => URL.revokeObjectURL(b));
    }, []);

    return (
      <Box
        sx={{
          boxShadow: "0px -1px 3px -1px #111",
          position: "relative",
          minHeight: "65px",
          display: "flex",
          alignItems: "center",
          aside: {
            position: "absolute",
            bottom: "103%",
            right: "70px",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-100%",
            left: "130px",
            width: "100%",
            zIndex: 99999,
            display: "flex",
            gap: "10px",
            alignItems: "center",
            overflow: "overlay",
            maxWidth: "70%",
            paddingY: "10px",
          }}
        >
          {blobs.map((b, index) => (
            <Box
              key={index}
              style={{
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "#4b4b4b",
                  cursor: "pointer",
                  transform: "translate(50%,-50%)",
                }}
                onClick={() => handleRemoveImage(b)}
              >
                <CancelIcon />
              </span>
              <img
                srcSet={b}
                src={b}
                alt={b}
                loading="lazy"
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingY: "5px",
            paddingX: "15px",
            flex: 1,
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
              <TooltipTitle title="More actions">
                <AddCircleIcon
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </TooltipTitle>

              <TooltipTitle title="Images">
                <span
                  style={{
                    marginBottom: "3px",
                  }}
                  onClick={() => inputFileRef.current.click()}
                >
                  <AddPhotoAlternateIcon
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                  <input
                    onChange={handleChooseImage}
                    type="file"
                    name="image"
                    id="image"
                    hidden
                    multiple
                    accept="image/png, image/jpg, image/jpeg"
                    ref={inputFileRef}
                  />
                </span>
              </TooltipTitle>

              <TooltipTitle title="GIF">
                <GifBoxIcon
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </TooltipTitle>
            </Box>
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
                position: "relative",
                flex: 1,
              }}
            >
              <TextField
                inputRef={ref}
                fullWidth
                label="Message"
                id="message-input"
                size="small"
                color="secondary"
                autoFocus={true}
                value={content}
                onKeyDown={(e) => {
                  setIsShowEmoji(false);
                  handleSendMessage(e);
                }}
                onChange={(e) =>
                  setMessage((prevMessage) => {
                    return {
                      ...prevMessage,
                      content: e.target.value.trim(),
                    };
                  })
                }
              />
            </Box>

            <TooltipTitle title="Emojis">
              <span
                onClick={() => setIsShowEmoji(!isShowEmoji)}
                style={{
                  top: "55%",
                  right: "55px",
                  transform: "translateY(-60%)",
                  position: "absolute",
                }}
              >
                <AddReactionIcon
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </span>
            </TooltipTitle>
            <TooltipTitle
              title={
                !editMessage
                  ? !!content?.trim() || files?.length
                    ? "Send a message"
                    : "Send a like"
                  : "Edit"
              }
            >
              <div
                onClick={(e) => {
                  if (!!content.trim() || files?.length) {
                    handleSendMessage(e);
                  }
                }}
                style={{
                  cursor: "pointer",
                }}
                className="text-primary"
              >
                {!editMessage ? (
                  !!content.trim() || files.length ? (
                    <SendIcon />
                  ) : (
                    <ThumbUpIcon />
                  )
                ) : (
                  <CheckCircleIcon />
                )}
              </div>
            </TooltipTitle>
          </Box>
        </Box>
      </Box>
    );
  }
);
export default ChatBox;
