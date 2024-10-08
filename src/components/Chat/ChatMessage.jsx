import { Box, Typography, Avatar } from "@mui/material";
import TooltipAction from "./TooltipAction";
import TooltipTime from "./TooltipTime";
import ReplyIcon from "@mui/icons-material/Reply";
import { forwardRef, useCallback, useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatReaction from "./ChatReaction";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-medium-image-zoom/dist/styles.css";
import AttachmentIcon from "@mui/icons-material/Attachment";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { useEffect } from "react";
import { MESSAGE_TYPE } from "./ChatList";

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
      setMessageState,
      handleScrollToMessage,
    },
    ref
  ) => {
    const [isShowMessagesHistory, setIsShowMessagesHistory] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [imgUrl, setImgUrl] = useState("");

    const handleZoomChange = useCallback((shouldZoom) => {
      setIsZoomed(shouldZoom);
    }, []);

    useEffect(() => {
      if (isZoomed) {
        const imgContainerElm = document.querySelector(
          "dialog[open] div[data-rmiz-modal-content]"
        );
        const convertedUrl = imgUrl.replace(/ /g, "%20");
        imgContainerElm.style.setProperty("--bg", `url(${convertedUrl})`);
      }
    }, [isZoomed, imgUrl]);

    const convertMillisecondToSecond = (time) =>
      Math.floor(new Date(time).getTime() / 1000);

    const compareNotEqualTime = (aTime, bTime) => {
      return (
        convertMillisecondToSecond(aTime) !== convertMillisecondToSecond(bTime)
      );
    };

    const {
      sendAt,
      modifiedAt,
      originalMessage,
      isDeleted,
      messageContent,
      messageType,
    } = msg;
    const isEdited = compareNotEqualTime(sendAt, modifiedAt);

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
                {originalMessage && !isDeleted && (
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
                      {originalMessage.messageType !== MESSAGE_TYPE.IMAGE ? (
                        <p
                          className="small p-2 me-3 mb-1 rounded-3"
                          style={{
                            backgroundColor: "#494949",
                            color: "#cbcbcb",
                            fontSize: "13px",
                            whiteSpace: "pre-wrap",
                          }}
                          onClick={() => {
                            handleScrollToMessage(originalMessage.messageId);
                          }}
                        >
                          {!originalMessage.isDeleted ? (
                            originalMessage.messageType ===
                            MESSAGE_TYPE.TEXT ? (
                              originalMessage?.messageContent
                            ) : (
                              <>
                                <i>Attachment</i>
                                <AttachmentIcon
                                  sx={{
                                    marginLeft: "5px",
                                    fontSize: "14px",
                                    transform: "rotate(-45deg)",
                                  }}
                                />
                              </>
                            )
                          ) : (
                            <i>Message removed</i>
                          )}
                        </p>
                      ) : !originalMessage.isDeleted ? (
                        <LazyLoadImage
                          onClick={() => {
                            handleScrollToMessage(originalMessage.messageId);
                          }}
                          effect="blur"
                          className="me-3 mb-1 message-image"
                          src={`${originalMessage.messageContent}`}
                          style={{
                            cursor: "pointer",
                            border: "1px solid #232323",
                            overflow: "hidden",
                            borderRadius: "20px",
                            maxWidth: "100px",
                            height: "100%",
                            objectFit: "fill",
                          }}
                        />
                      ) : (
                        <p
                          className="small p-2 me-3 mb-1 rounded-3"
                          style={{
                            backgroundColor: "#494949",
                            color: "#cbcbcb",
                            fontSize: "13px",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          <i>Message removed</i>
                        </p>
                      )}
                    </Box>
                  </Box>
                )}

                {isShowMessagesHistory && (
                  <ChatHistory messagesHistory={msg.messageHistories} />
                )}
                {!isDeleted ? (
                  <TooltipAction
                    msg={msg}
                    offsetX={-3}
                    setMessage={setMessage}
                    setEditMessage={setEditMessage}
                    setMessageState={setMessageState}
                    setReplyMessage={setReplyMessage}
                    disableHoverListener={editMessage}
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
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <ChatMessageImage
                            ref={ref}
                            senderId={msg.senderId}
                            messageType={messageType}
                            messageId={msg.messageId}
                            currentUser={currentUser}
                            messageContent={messageContent}
                            handleZoomChange={handleZoomChange}
                            isZoomed={isZoomed}
                            setImgUrl={setImgUrl}
                            reactions={msg.reactions}
                          />
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
            <TooltipAction
              msg={msg}
              position="right-start"
              reverse={true}
              morePlacement="top-start"
              setEditMessage={setEditMessage}
              setMessageState={setMessageState}
              setReplyMessage={setReplyMessage}
              disableHoverListener={editMessage}
            >
              <Box>
                <ChatMessageItem
                  msg={msg}
                  ref={ref}
                  currentUser={currentUser}
                />
              </Box>
            </TooltipAction>
          </div>
        )}
      </div>
    );
  }
);

const ChatMessageImage = forwardRef(
  (
    {
      senderId,
      messageId,
      messageType,
      messageContent,
      handleZoomChange,
      currentUser,
      isZoomed,
      setImgUrl,
      reactions,
    },
    ref
  ) => {
    return (
      <>
        {messageType === MESSAGE_TYPE.TEXT ? (
          <p
            data={senderId === currentUser.id ? "admin" : "user"}
            id={messageId}
            className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
            style={{
              whiteSpace: "pre-wrap",
            }}
            ref={ref}
          >
            {messageContent}
          </p>
        ) : messageType === MESSAGE_TYPE.AUDIO ? (
          <audio
            ref={ref}
            id={messageId}
            data={senderId === currentUser.id ? "admin" : "user"}
            src={`data:audio/wav;base64,${messageContent}`}
            controls
            style={{
              borderRadius: "20px",
              marginRight: "15px",
              width: "250px",
              height: "41px",
            }}
          />
        ) : messageType === MESSAGE_TYPE.VIDEO ? (
          <video
            ref={ref}
            id={messageId}
            data={senderId === currentUser.id ? "admin" : "user"}
            src={messageContent}
            controls
            style={{
              cursor: "pointer",
              border: "1px solid #232323",
              overflow: "hidden",
              marginRight: "15px",
              borderRadius: "20px",
              maxWidth: "200px",
              height: "100%",
            }}
          />
        ) : (
          <ControlledZoom
            IconUnzoom={ZoomOutMapIcon}
            onZoomChange={(shouldZoom) => {
              handleZoomChange(shouldZoom);
              setImgUrl(messageContent);
            }}
            isZoomed={isZoomed}
          >
            <div ref={ref} id={messageId}>
              <LazyLoadImage
                visibleByDefault={true}
                data={senderId === currentUser.id ? "admin" : "user"}
                effect="blur"
                className="me-3 mb-1 message-image"
                src={`${messageContent}`}
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
            </div>
          </ControlledZoom>
        )}

        <ChatReaction reactions={reactions} type={messageType} />
      </>
    );
  }
);

const ChatMessageItem = forwardRef(({ msg, currentUser }, ref) => {
  return (
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
            data={msg.senderId === currentUser.id ? "admin" : "user"}
            id={msg.messageId}
            className="small p-2 ms-3 mb-1 rounded-3"
            style={{
              color: "#000000",
              backgroundColor: "#f5f6f7",
              whiteSpace: "pre-wrap",
            }}
          >
            {msg.messageContent}
          </p>
          <ChatReaction reactions={msg.reactions} />
        </Box>
      </TooltipTime>
    </span>
  );
});

export default ChatMessage;
