import { Box, Typography, Avatar } from "@mui/material";
import TooltipAction from "./TooltipAction";
import TooltipTime from "./TooltipTime";
import ReplyIcon from "@mui/icons-material/Reply";
import { forwardRef, useCallback, useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatReaction from "./ChatReaction";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

const _validFileExtensions = [".jpg", ".jpeg", ".png"];

const ChatMessage = forwardRef(
  (
    {
      msg,
      newDate,
      currentUser,
      editMessage,
      setMessage,
      setEditMessage,
      setReplyMessage,
      handleScrollToMessage,
    },
    ref
  ) => {
    const [isShowMessagesHistory, setIsShowMessagesHistory] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleZoomChange = useCallback((shouldZoom, imgUrl) => {
      document
        .querySelector("div[data-rmiz-modal-content]")
        .style.setProperty("--bg", `url("${imgUrl}")`, "important");
      setIsZoomed(shouldZoom);
    }, []);

    const convertMillisecondToSecond = (time) =>
      Math.floor(new Date(time).getTime() / 1000);

    const compareNotEqualTime = (aTime, bTime) => {
      return (
        convertMillisecondToSecond(aTime) !== convertMillisecondToSecond(bTime)
      );
    };

    const { sendAt, modifiedAt, originalMessage, isDeleted, messageContent } =
      msg;
    const isEdited = compareNotEqualTime(sendAt, modifiedAt);
    const messageSplit = messageContent.split(".");
    return (
      <div className="mt-2">
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
          //message of Admin
          <div
            className="d-flex flex-row justify-content-end pt-1"
            style={{
              position: "relative",
              alignItems: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {isEdited && !originalMessage && !isDeleted && (
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
                  alignItems: "flex-end",
                }}
              >
                {originalMessage && (
                  <Box
                    sx={{
                      cursor: "pointer",
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
                        {originalMessage.isDeleted
                          ? "You replied to a removed message"
                          : `You replied to
                        ${
                          originalMessage.senderId === currentUser.id
                            ? "yourself"
                            : originalMessage.sender.userName
                        }`}
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
                          whiteSpace: "pre-wrap",
                        }}
                        onClick={() =>
                          handleScrollToMessage(originalMessage.messageId)
                        }
                      >
                        {!originalMessage.isDeleted ? (
                          originalMessage?.messageContent
                        ) : (
                          <i>Message removed</i>
                        )}
                      </p>
                    </Box>
                  </Box>
                )}

                {isShowMessagesHistory && (
                  <ChatHistory messagesHistory={msg.messageHistories} />
                )}
                {!editMessage && !isDeleted ? (
                  <TooltipAction
                    msg={msg}
                    offsetX={-3}
                    setMessage={setMessage}
                    setEditMessage={setEditMessage}
                    setReplyMessage={setReplyMessage}
                  >
                    <div
                      style={{
                        alignSelf: "flex-end",
                      }}
                    >
                      <TooltipTime
                        date={msg?.sendAt}
                        offsetX={-3}
                        offsetY={-10}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            zIndex: 2,
                            alignSelf: "flex-end",
                          }}
                        >
                          {!_validFileExtensions.includes(
                            "." + messageSplit[messageSplit.length - 1]
                          ) ? (
                            <p
                              id={msg.messageId}
                              className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                              style={{
                                whiteSpace: "pre-wrap",
                              }}
                              ref={ref}
                            >
                              {messageContent}
                            </p>
                          ) : (
                            <ControlledZoom
                              IconUnzoom={ZoomOutMapIcon}
                              onZoomChange={(shouldZoom) =>
                                handleZoomChange(shouldZoom, messageContent)
                              }
                              isZoomed={isZoomed}
                            >
                              <img
                                className="me-3 mb-1 message-image"
                                src={`${messageContent}?${Date.now()}`}
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #232323",
                                  overflow: "hidden",
                                  borderRadius: "20px",
                                  maxWidth: "200px",
                                  height: "100%",
                                  objectFit: "fill",
                                }}
                              />
                            </ControlledZoom>
                          )}

                          <ChatReaction reactions={msg.reactions} />
                        </Box>
                      </TooltipTime>
                    </div>
                  </TooltipAction>
                ) : (
                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {!isDeleted ? (
                      <TooltipTime date={msg?.sendAt}>
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <p
                            className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                            style={{
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {messageContent}
                          </p>
                          <ChatReaction reactions={msg.reactions} />
                        </Box>
                      </TooltipTime>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          backgroundColor: "transparent",
                        }}
                      >
                        <p
                          className="small p-2 me-3 mb-1 rounded-3"
                          style={{
                            border: "1px solid #505050",
                            color: "#686868",
                          }}
                        >
                          You unsent a message
                        </p>
                      </Box>
                    )}
                  </span>
                )}
              </Box>
            </Box>

            <Avatar src={msg.sender?.url} alt={msg.sender?.avatar} />
          </div>
        ) : (
          //message of User
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
                    whiteSpace: "pre-wrap",
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
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 2,
                        alignSelf: "flex-end",
                      }}
                    >
                      <p
                        ref={ref}
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{
                          color: "#000000",
                          backgroundColor: "#f5f6f7",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {_validFileExtensions.includes()}
                      </p>
                      <ChatReaction reactions={msg.reactions} />
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
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      alignSelf: "flex-end",
                    }}
                  >
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{
                        color: "#000000",
                        backgroundColor: "#f5f6f7",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {messageContent}
                    </p>
                    <ChatReaction reactions={msg.reactions} />
                  </Box>
                </TooltipTime>
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default ChatMessage;
