import { Box, Typography, Avatar } from "@mui/material";
import TooltipAction from "./TooltipAction";
import TooltipTime from "./TooltipTime";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState } from "react";
import ChatHistory from "./ChatHistory";

const ChatMessage = ({
  msg,
  newDate,
  currentUser,
  editMessage,
  setMessage,
  setEditMessage,
  setReplyMessage,
}) => {
  const [isShowMessagesHistory, setIsShowMessagesHistory] = useState(false);

  const convertMillisecondToSecond = (time) =>
    Math.floor(new Date(time).getTime() / 1000);

  const compareNotEqualTime = (aTime, bTime) => {
    return (
      convertMillisecondToSecond(aTime) !== convertMillisecondToSecond(bTime)
    );
  };

  const { sendAt, modifiedAt, originalMessage } = msg;
  const isEdited = compareNotEqualTime(sendAt, modifiedAt);

  return (
    <div>
      {newDate && (
        <Typography
          sx={{
            textAlign: "center",
            color: "#8a8d91",
            fontSize: "14px",
            marginY: "10px",
          }}
        >
          {newDate}
        </Typography>
      )}
      {msg?.senderId === currentUser.id ? (
        <div
          className="d-flex flex-row justify-content-end pt-1"
          style={{
            position: "relative",
            alignItems: "flex-end",
          }}
        >
          {!editMessage ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {isEdited && !originalMessage && (
                <Typography
                  onClick={() =>
                    setIsShowMessagesHistory(!isShowMessagesHistory)
                  }
                  component="p"
                  sx={{
                    alignSelf: "flex-end",
                    cursor: "pointer",
                    textAlign: "end",
                    marginRight: "20px",
                    fontSize: "13px",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  className="text-primary"
                >
                  {isShowMessagesHistory ? "Hide edits" : " Edited"}
                </Typography>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {originalMessage && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      marginBottom: "-10px",
                      position: "relative",
                      zIndex: "1",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#cbcbcb",
                        fontSize: "13px",
                        marginRight: "1rem",
                      }}
                    >
                      <ReplyIcon
                        sx={{
                          fontSize: "20px",
                        }}
                      />
                      <span>
                        You replied to{" "}
                        {originalMessage.senderId === currentUser.id
                          ? "yourself"
                          : originalMessage.sender.userName}
                      </span>
                      {isEdited && (
                        <Typography
                          onClick={() =>
                            setIsShowMessagesHistory(!isShowMessagesHistory)
                          }
                          component="p"
                          sx={{
                            alignSelf: "flex-end",
                            cursor: "pointer",
                            textAlign: "end",
                            fontSize: "13px",
                            marginLeft: "4px",
                            ":hover": {
                              textDecoration: "underline",
                            },
                          }}
                          className="text-primary"
                        >
                          {isShowMessagesHistory ? "Hide edits" : "• Edited"}
                        </Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        zIndex: 1,
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      <p
                        className="small p-2 me-3 mb-1 rounded-3"
                        style={{
                          backgroundColor: "#494949",
                          color: "#cbcbcb",
                          fontSize: "13px",
                        }}
                      >
                        {originalMessage?.messageContent}
                      </p>
                    </Box>
                  </Box>
                )}

                {isShowMessagesHistory && (
                  <ChatHistory messagesHistory={msg.messageHistories} />
                )}
                <TooltipAction
                  msg={msg}
                  offsetX={-3}
                  setMessage={setMessage}
                  setEditMessage={setEditMessage}
                  setReplyMessage={setReplyMessage}
                >
                  <Box
                    sx={{
                      alignSelf: "flex-end",
                    }}
                  >
                    <TooltipTime date={msg?.sendAt} offsetX={-3} offsetY={-10}>
                      <Box
                        sx={{
                          position: "relative",
                          zIndex: 2,
                          alignSelf: "flex-end",
                        }}
                      >
                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                          {msg.messageContent}
                        </p>
                      </Box>
                    </TooltipTime>
                  </Box>
                </TooltipAction>
              </Box>
            </Box>
          ) : (
            <span
              style={{
                position: "relative",
                zIndex: 2,
              }}
            >
              <TooltipTime date={msg?.sendAt}>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                    {msg.messageContent}
                  </p>
                </Box>
              </TooltipTime>
            </span>
          )}
          <Avatar src={msg.sender?.url} alt={msg.sender?.avatar} />
        </div>
      ) : (
        <div
          className="d-flex flex-row justify-content-start pt-1"
          style={{
            position: "relative",
            marginTop: originalMessage ? "50px" : "unset",
          }}
          key={msg.messageId}
        >
          <Avatar src={msg.sender?.url} alt={msg.sender?.avatar} />
          {originalMessage && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                left: "55px",
                top: "-100%",
                color: "#cbcbcb",
                fontSize: "13px",
              }}
            >
              <ReplyIcon
                sx={{
                  fontSize: "20px",
                }}
              />
              <span>
                {msg.sender?.userName} replied to{" "}
                {originalMessage.senderId === currentUser.id
                  ? currentUser.userName
                  : "themself"}
              </span>
            </Box>
          )}
          {originalMessage && (
            <Box
              sx={{
                position: "absolute",
                top: "-50%",
                left: "55px",
                zIndex: 1,
              }}
            >
              <p
                className="small p-2 me-3 mb-1 rounded-3"
                style={{
                  backgroundColor: "#494949",
                  color: "#cbcbcb",
                  fontSize: "13px",
                }}
              >
                {originalMessage?.messageContent}
              </p>
            </Box>
          )}
          {!editMessage ? (
            <TooltipAction
              msg={msg}
              position="right-start"
              reverse={true}
              morePlacement="top-start"
              setEditMessage={setEditMessage}
              setReplyMessage={setReplyMessage}
            >
              <span
                style={{
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <TooltipTime
                  date={msg?.sendAt}
                  position="left-end"
                  offsetY={-25}
                  offsetX={-3}
                >
                  <Box>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{
                        color: "#000000",
                        backgroundColor: "#f5f6f7",
                      }}
                    >
                      {msg.messageContent}
                    </p>
                  </Box>
                </TooltipTime>
              </span>
            </TooltipAction>
          ) : (
            <span
              style={{
                position: "relative",
                zIndex: 2,
              }}
            >
              <TooltipTime
                date={msg?.sendAt}
                position="left-end"
                offsetY={-25}
                offsetX={-3}
              >
                <Box>
                  <p
                    className="small p-2 ms-3 mb-1 rounded-3"
                    style={{
                      color: "#000000",
                      backgroundColor: "#f5f6f7",
                    }}
                  >
                    {msg.messageContent}
                  </p>
                </Box>
              </TooltipTime>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
