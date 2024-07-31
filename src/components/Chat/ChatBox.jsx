import SendIcon from "@mui/icons-material/Send";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GifBoxIcon from "@mui/icons-material/GifBox";
import { Box, ClickAwayListener, TextField } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiPicker from "emoji-picker-react";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { forwardRef, useEffect, useRef, useState } from "react";
import { TooltipTitle } from "./TooltipAction";
import { MESSAGE_TYPE } from "./ChatList";
import { useNotify } from "react-admin";

const ChatBox = forwardRef(
  (
    { setMessage, message, handleSendMessage, editMessage, setBlobs, blobs },
    ref
  ) => {
    const [isShowEmoji, setIsShowEmoji] = useState(false);
    const [toggleVoice, setToggleVoice] = useState(false);
    const notify = useNotify();
    const inputFileRef = useRef(null);
    const mediaStream = useRef(null);
    const mediaRecorder = useRef(null);
    const chunks = useRef([]);

    const { content, files } = message;
    const handleChooseImage = (e) => {
      const files = e.target.files;
      if (files.length > 5) {
        notify("Only 5 files accepted.", {
          type: "warning",
        });
        return;
      }
      const arrayFile = Array.from(files);
      const arrayBlob = arrayFile.map((f) => URL.createObjectURL(f));

      setBlobs(arrayBlob);
      setMessage((prevMessage) => {
        return {
          content:
            prevMessage.type === MESSAGE_TYPE.AUDIO ? "" : prevMessage.content,
          files: arrayFile,
          type: MESSAGE_TYPE.IMAGE,
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

    const startRecording = async () => {
      try {
        setToggleVoice(true);
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaStream.current = stream;
        mediaRecorder.current = new MediaRecorder(stream);
        let recordingTimeout; // To store the timeout ID

        //Listen record push data to state
        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.current.push(e.data);
          }
        };

        //Listen when stop recording and create blob
        mediaRecorder.current.onstop = () => {
          clearTimeout(recordingTimeout); // Clear the timeout if recording stops before 5 seconds
          const recordedBlob = new Blob(chunks.current, { type: "audio/wav" });
          const reader = new FileReader();
          reader.readAsDataURL(recordedBlob);
          reader.onloadend = () => {
            const base64AudioMessage = reader.result.split(",")[1];
            setMessage((prevMessage) => ({
              ...prevMessage,
              content: base64AudioMessage,
              type: MESSAGE_TYPE.AUDIO,
            }));
          };
          chunks.current = [];
        };

        mediaRecorder.current.start();

        // Stop recording limit 10s seconds
        recordingTimeout = setTimeout(() => {
          if (mediaRecorder.current.state !== "inactive") {
            mediaRecorder.current.stop();
            setToggleVoice(false);
          }
        }, 10000); // 10,000 milliseconds = 10 seconds
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    const stopRecording = () => {
      if (
        mediaRecorder.current &&
        mediaRecorder.current.state === "recording"
      ) {
        mediaRecorder.current.stop();
        setToggleVoice(false);
      }
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };

    useEffect(() => {
      if (ref?.current) {
        ref.current.style.paddingRight = "50px";
      }
      return () => {
        if (mediaRecorder.current?.state === "recording") {
          mediaRecorder.current.stop();
        }
        blobs.forEach((b) => URL.revokeObjectURL(b));
      };
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
        {isShowEmoji ? (
          <ClickAwayListener
            onClickAway={() => {
              setIsShowEmoji(false);
            }}
          >
            <Box>
              <EmojiPicker
                open={isShowEmoji}
                onEmojiClick={handleChooseEmoji}
                style={{ zIndex: 9999 }}
              />
            </Box>
          </ClickAwayListener>
        ) : null}
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
              <TooltipTitle title="Voice" offsetY={-1}>
                <span
                  onClick={(e) => {
                    if (toggleVoice) {
                      stopRecording(e);
                    } else {
                      setBlobs([]);
                      setMessage({
                        content: "",
                        files: [],
                        type: "audio",
                      });
                      startRecording();
                    }
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {!toggleVoice ? <KeyboardVoiceIcon /> : <CancelIcon />}
                </span>
              </TooltipTitle>

              {!toggleVoice ? (
                <>
                  <TooltipTitle title="Images" offsetY={-2}>
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
                        accept="image/png, image/jpg, image/jpeg, video/*"
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
                </>
              ) : null}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                flex: 1,
              }}
            >
              {message.type === MESSAGE_TYPE.AUDIO && !toggleVoice && (
                <span
                  style={{
                    position: "absolute",
                    left: "80px",
                    zIndex: "9999",
                    transform: "translateY(2px)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setBlobs([]);
                    setMessage({
                      type: "text",
                      content: "",
                      files: [],
                    });
                  }}
                >
                  <CancelIcon />
                </span>
              )}
              {!toggleVoice ? (
                <TextField
                  inputRef={ref}
                  fullWidth
                  label="Message"
                  id="message-input"
                  size="small"
                  color="secondary"
                  autoFocus={true}
                  disabled={message.type === MESSAGE_TYPE.AUDIO}
                  value={
                    message.type !== MESSAGE_TYPE.AUDIO ? content : "Audio 🔉"
                  }
                  onKeyDown={(e) => {
                    setIsShowEmoji(false);
                    handleSendMessage(e);
                  }}
                  onChange={(e) =>
                    setMessage((prevMessage) => {
                      return {
                        ...prevMessage,
                        content: e.target.value,
                      };
                    })
                  }
                />
              ) : (
                <audio
                  controls
                  style={{
                    width: "100%",
                    height: "41px",
                  }}
                />
              )}
            </Box>

            {!toggleVoice && (
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
            )}
            <TooltipTitle
              title={
                !editMessage
                  ? !!content?.trim() || files?.length
                    ? "Send a message"
                    : "Send a like"
                  : "Edit"
              }
            >
              {!toggleVoice && (
                <div
                  onClick={(e) => {
                    if (!!content.trim() || files?.length || toggleVoice) {
                      stopRecording();
                      handleSendMessage(e);
                    }
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                  className="text-primary"
                >
                  {!editMessage ? (
                    !!content.trim() || blobs.length ? (
                      <SendIcon />
                    ) : (
                      <ThumbUpIcon />
                    )
                  ) : (
                    <CheckCircleIcon />
                  )}
                </div>
              )}
            </TooltipTitle>
          </Box>
        </Box>
      </Box>
    );
  }
);
export default ChatBox;
