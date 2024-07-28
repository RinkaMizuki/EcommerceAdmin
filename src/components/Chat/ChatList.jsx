import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useLogout, useTheme, useNotify } from "react-admin";
import { useDebounce } from "use-debounce";
import messageSound from "../../assets/sounds/messageSound.ogg";
import Divider from "@mui/material/Divider";
import ChatItem from "./ChatItem";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { chathubConnection } from "../../services/realtimeService";
import * as signalR from "@microsoft/signalr";
import { userService } from "../../services/userService";
import ChatHeader from "./ChatHeader";
import ChatBody, { LIMIT } from "./ChatBody";
import ChatBox from "./ChatBox";
import { dataProvider } from "../../contexts/dataProvider";
import ChatAction, { REPLY_HEIGHT } from "./ChatAction";
import ConverSearch from "./ConverSearch";
import { useNavigate, useParams } from "react-router-dom";
import { ParticipantContext } from "../../contexts/participantContext";

export const MESSAGE_TYPE = {
  TEXT: "text",
  IMAGE: "image",
  AUDIO: "audio",
  ICON: "icon",
};

export const MESSAGE_STATE = {
  ADD: "add",
  LOAD: "load",
  REP: "rep",
};

const TITLE = document.title;

const useIsTabActive = () => {
  const [isTabVisible, setIsTabVisible] = useState(true);

  const handleVisibilityChange = useCallback(() => {
    setIsTabVisible(document.visibilityState === "visible");
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isTabVisible;
};

const ChatList = () => {
  const isActive = useIsTabActive();
  const mode = useTheme()[0];
  const [message, setMessage] = useState({
    content: "",
    files: [],
    type: "text",
  });
  const [blobs, setBlobs] = useState([]);
  const [replyMessage, setReplyMessage] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [searchParticipants, setSearchParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [usersStatus, setUsersStatus] = useState([]);
  const [search, setSearch] = useState("");
  const [messageAudio] = useState(new Audio(messageSound));
  const [isShowSearchConver, setIsShowSearchConver] = useState(false);
  const [messageState, setMessageState] = useState(MESSAGE_STATE.ADD);
  const [editMessage, setEditMessage] = useState(null);
  const [userPreparing, setUserPreparing] = useState({
    isPreparing: false,
    converPrepareId: "",
  });
  const [isPreparing, setIsPreparing] = useState(false);
  const [toggleActive, setToggleActive] = useState(!isActive);
  const [messageNoti, setMessageNoti] = useState({
    isNoti: false,
    userName: "",
  });
  const [searchDebounce] = useDebounce(search, 500);
  const areaChatRef = useRef(null);
  const bodyChatWrapperRef = useRef(null);
  const inputMessageRef = useRef(null);
  const hasAdjustedHeight = useRef(false);
  const { participant, setParticipant, setImgLoading } =
    useContext(ParticipantContext);
  const { getList, create } = dataProvider;
  const logout = useLogout();
  const navigate = useNavigate();
  const params = useParams();
  const notify = useNotify();

  const currentUser = userService.getUser();

  const handleGetListParticipants = () => {
    if (chathubConnection.state === signalR.HubConnectionState.Connected) {
      chathubConnection
        .invoke("GetListParticipantAsync", currentUser?.id)
        .catch((err) =>
          console.error("Error invoking GetListParticipantAsync: ", err)
        );
    }
  };

  useEffect(() => {
    let timeOutId;
    if (!isActive && messageNoti?.isNoti) {
      if (!toggleActive) {
        document.title = `${messageNoti?.userName || ""} messaged you`;
      } else {
        document.title = TITLE;
      }
      timeOutId = setTimeout(() => {
        setToggleActive(!toggleActive);
      }, 1500);
    } else {
      document.title = TITLE;
      setMessageNoti(null);
    }

    return () => {
      window.clearTimeout(timeOutId);
    };
  }, [isActive, toggleActive, messageNoti]);

  useEffect(() => {
    if (searchDebounce) {
      getList("conversations", {
        filter: {
          q: searchDebounce,
          adminId: currentUser?.id,
        },
      })
        .then(({ data, total }) => {
          setSearchParticipants(data);
        })
        .catch((err) => console.log(err));
    } else {
      setSearchParticipants([]);
    }
  }, [searchDebounce]);

  useEffect(() => {
    chathubConnection.on("ReceiveMessage", (newMessage) => {
      if (newMessage.senderId !== currentUser.id) {
        const notiParticipant = participants.find(
          (p) => p.conversationId === newMessage.conversationId
        );
        if (notiParticipant.conversationId === params?.conversationId) {
          chathubConnection.invoke("SendUpdateConversation", {
            ...notiParticipant.conversation,
            isSeen: true,
          });
        } else {
          if (notiParticipant.conversation?.isSeen) {
            chathubConnection.invoke("SendUpdateConversation", {
              ...notiParticipant.conversation,
              isSeen: false,
            });
          }
        }
        if (!notiParticipant?.conversation?.isMute) {
          setMessageNoti({
            isNoti: true,
            userName: newMessage.sender.userName,
          });
          messageAudio
            .play()
            .catch((error) => console.error("Play audio error: " + error));
        } else {
          console.log(notiParticipant, "is muted");
        }
      }
      if (params?.conversationId === newMessage.conversationId) {
        setMessages((prevMessages) => {
          return [...prevMessages, newMessage];
        });
      }
      handleGetListParticipants();
    });
    return () => chathubConnection.off("ReceiveMessage");
  }, [participants, params?.conversationId]);

  useEffect(() => {
    chathubConnection.on("ReceiveMessagesImage", (listMessagesImage) => {
      setImgLoading(false);
      setMessages((prevMessages) => {
        return [...prevMessages, ...listMessagesImage];
      });
    });

    chathubConnection.on("ReceiveUpdateConversation", (conversation) => {
      setParticipant((prevPar) => {
        return {
          ...prevPar,
          conversation,
        };
      });
      setParticipants((prevPar) =>
        prevPar.map((p) =>
          p.conversationId === conversation.conversationId
            ? { ...p, conversation }
            : p
        )
      );
    });

    chathubConnection.on("ReceiveUpdateMessage", (updateMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((m) => {
          if (m.messageId === updateMessage.messageId) {
            return { ...m, ...updateMessage };
          } else if (
            m?.originalMessage?.messageId === updateMessage.messageId
          ) {
            return {
              ...m,
              originalMessage: {
                ...m.originalMessage,
                ...updateMessage,
              },
            };
          } else {
            return m;
          }
        })
      );
    });
    chathubConnection.on("ReceiveRemoveMessage", (messageDeletedId) => {
      setMessages((prevMessages) =>
        prevMessages.map((m) => {
          if (m.messageId == messageDeletedId) {
            return { ...m, isDeleted: true };
          } else if (m?.originalMessage?.messageId === messageDeletedId) {
            return {
              ...m,
              originalMessage: {
                ...m.originalMessage,
                isDeleted: true,
              },
            };
          } else {
            return m;
          }
        })
      );
    });

    chathubConnection.on("ReceiveParticipants", (participantList) => {
      setParticipants(participantList);
    });

    chathubConnection.on("ReceiveNewParticipant", (newParticipant) => {
      setParticipants((prevList) => [...prevList, newParticipant]);
    });

    chathubConnection.on("ReceiveListUserStatus", (userIds) => {
      setUsersStatus(userIds);
    });

    if (chathubConnection.state === signalR.HubConnectionState.Disconnected) {
      chathubConnection
        .start()
        .then(() => {
          console.log("ChatHub connected successfully.");
        })
        .catch((err) => {
          console.log(err);
          if (err.status === 403) {
            logout();
          }
        });
    }

    return () => {
      if (chathubConnection.state === signalR.HubConnectionState.Connected) {
        chathubConnection
          .stop()
          .then(() => console.warn("ChatHub disconnected successfully."));
      }
    };
  }, []);

  //listen error invoked method from server
  useEffect(() => {
    handleGetListParticipants();

    chathubConnection.on(
      "ReceiveEditMessageError",
      (errorCode, errorMessage) => {
        notify(`${errorMessage}`, {
          type: "error",
        });
      }
    );
  }, []);

  useEffect(() => {
    if (!message.content) {
      setIsPreparing(false);
    } else {
      setIsPreparing(true);
    }
  }, [message]);

  useEffect(() => {
    if (
      chathubConnection.state === signalR.HubConnectionState.Connected &&
      isPreparing
    ) {
      chathubConnection
        .invoke(
          "SendMessagePreparingAsync",
          participant?.userId,
          isPreparing,
          participant?.conversationId
        )
        .catch((err) =>
          console.error("Error invoking SendMessagePreparingAsync: ", err)
        );
    } else if (
      chathubConnection.state === signalR.HubConnectionState.Connected &&
      !isPreparing
    ) {
      chathubConnection
        .invoke(
          "SendMessagePreparingAsync",
          participant?.userId,
          isPreparing,
          participant?.conversationId
        )
        .catch((err) =>
          console.error("Error invoking SendMessagePreparingAsync: ", err)
        );
    }
  }, [isPreparing]);

  useEffect(() => {
    chathubConnection.on("ReceivePreparing", (isPrepare, conversationId) => {
      setUserPreparing((prev) => {
        return {
          ...prev,
          isPreparing: isPrepare,
          converPrepareId: conversationId,
        };
      });
    });
    return () => chathubConnection.off("ReceivePreparing");
  }, [participant]);

  useEffect(() => {
    if (participant != null) {
      chathubConnection
        .invoke(
          "GetMessagesAsync",
          `[0, ${LIMIT - 1}]`,
          participant?.conversationId
        )
        .catch((err) =>
          console.error("Error invoking GetMessagesAsync: ", err)
        );
      chathubConnection.on("ReceiveMessages", (listMessages) => {
        setMessages(() => listMessages.slice().reverse());
      });
    }
  }, [participant]);

  useEffect(() => {
    setEditMessage(null);
    setReplyMessage(null);
    setMessage({
      content: "",
      files: [],
      type: MESSAGE_TYPE.TEXT,
    });
  }, [params?.conversationId]);

  useEffect(() => {
    if (
      (replyMessage != null || editMessage != null) &&
      !hasAdjustedHeight.current
    ) {
      const chatBodyElm = bodyChatWrapperRef.current;
      const chatBodyChildElm = chatBodyElm.children[0];

      const currentChildHeight = chatBodyChildElm.clientHeight;
      chatBodyChildElm.style.maxHeight = `${
        currentChildHeight - REPLY_HEIGHT
      }px`;
      const currentParentHeight = chatBodyElm.clientHeight;
      chatBodyElm.style.height = `${currentParentHeight - REPLY_HEIGHT}px`;
      hasAdjustedHeight.current = true;

      const messageActionId = replyMessage?.messageId || editMessage?.messageId;
      if (messageActionId === messages[messages.length - 1]?.messageId) {
        setTimeout(() => {
          areaChatRef.current.scrollTop = areaChatRef.current.scrollHeight;
        }, 0);
      }
    } else if (
      (replyMessage == null || editMessage == null) &&
      hasAdjustedHeight.current
    ) {
      if (editMessage || replyMessage) return;
      const chatBodyElm = bodyChatWrapperRef?.current;
      if (chatBodyElm) {
        const chatBodyChildElm = chatBodyElm.children[0];
        const currentChildHeight = chatBodyChildElm.clientHeight;
        chatBodyChildElm.style.maxHeight = `${
          currentChildHeight + REPLY_HEIGHT
        }px`;

        const currentParentHeight = chatBodyElm.clientHeight;
        chatBodyElm.style.height = `${currentParentHeight + REPLY_HEIGHT}px`;
        hasAdjustedHeight.current = false;
      }
    }

    inputMessageRef.current?.focus();
  }, [replyMessage, editMessage]);
  const handleSendMessage = async (e) => {
    const { content, files, type } = message;
    if (content || files.length) {
      if (e.type === "click" || (e.type === "keydown" && e.keyCode === 13)) {
        if (!editMessage) {
          const messageDto = {
            messageId: null,
            senderId: currentUser.id,
            conversationId: participant?.conversationId,
            messageContent: content,
            messageType: type,
            originalMessageId: replyMessage ? replyMessage.messageId : null,
          };
          if (content) {
            chathubConnection
              .invoke("SendMessageAsync", participant?.userId, {
                ...messageDto,
                messageType: files.length ? MESSAGE_TYPE.TEXT : type,
              })
              .catch((err) =>
                console.error("Error invoking SendMessageAsync: ", err)
              );
            setMessage({
              content: "",
              files: [],
              type: "text",
            });
          }
          if (files.length) {
            localStorage.setItem("imageLoad", files.length);
            setImgLoading(true);
            setBlobs([]);
            setMessage({
              content: "",
              files: [],
              type: "text",
            });
            const messageImageDto = {
              messageDto,
              messageType: MESSAGE_TYPE.IMAGE,
              images: files,
            };
            try {
              await create(
                `conversations/${participant.conversationId}/images?receiveId=${participant?.userId}`,
                {
                  data: { messageImageDto },
                }
              );
            } catch (err) {
              console.error("Error creating", err);
            }
          }
          replyMessage && setReplyMessage(null);
          setMessageState(MESSAGE_STATE.ADD);
        } else {
          const messageDto = {
            ...editMessage,
            messageContent: message.content,
            messageType: MESSAGE_TYPE.TEXT,
          };
          chathubConnection
            .invoke("SendEditMessageAsync", participant?.userId, messageDto)
            .catch((err) =>
              console.error("Error invoking SendEditMessageAsync: ", err)
            )
            .finally(() => {
              setMessageState(MESSAGE_STATE.REP);
              setEditMessage(null);
            });
          setMessage({
            content: "",
            files: [],
            type: "text",
          });
        }
      }
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: "10px",
        boxShadow:
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        borderRadius: "5px",
      }}
    >
      <Grid
        item
        xs={4}
        bgcolor={`${mode === "dark" ? "#2B3033 " : "#ffffff"}`}
        borderRadius="5px"
        paddingRight="18px"
        paddingBottom="18px"
        sx={{
          borderTopRightRadius: "unset",
          borderBottomRightRadius: "unset",
        }}
      >
        <ConverSearch
          search={search}
          setSearch={setSearch}
          isShowSearchConver={isShowSearchConver}
          setIsShowSearchConver={setIsShowSearchConver}
        />
        <Box
          sx={{
            "::-webkit-scrollbar": {
              borderRadius: "15px",
              width: "8px",
              background: "unset",
            },
            "::-webkit-scrollbar-track": {
              borderRadius: "15px",
            },
            "::-webkit-scrollbar-thumb": {
              borderRadius: "15px",
              boxShadow: "none",
              background: `${mode === "dark" ? "#d5d5d5" : "#838383"}`,
            },
            maxHeight: "500px",
            height: "500px",
            overflow: "overlay",
            scrollbarGutter: "stable both-edges",
            position: "relative",
            overflowX: "hidden",
          }}
        >
          {participants
            .sort(
              (a, b) =>
                new Date(b.conversation?.lastMessage?.sendAt) -
                new Date(a.conversation?.lastMessage?.sendAt)
            )
            .map((p) => {
              return (
                <Fragment key={p.conversationId}>
                  <Box sx={{ position: "relative", zIndex: 50 }}>
                    <ChatItem
                      p={p}
                      mode={mode}
                      isShowSearchConver={isShowSearchConver}
                      isActive={usersStatus.includes(p.userId)}
                      currentUser={currentUser}
                      setParticipant={setParticipant}
                      setMessageState={setMessageState}
                    />
                    <Divider />
                  </Box>
                </Fragment>
              );
            })}
          {isShowSearchConver &&
            (searchParticipants.length ? (
              <Box
                sx={{
                  width: "100%",
                  position: "absolute",
                  minHeight: "100%",
                  zIndex: 100,
                  top: 0,
                  bgcolor: "#2B3033",
                }}
              >
                {searchParticipants.map((p) => {
                  return (
                    <div
                      key={p.conversationId}
                      onClick={() => {
                        setIsShowSearchConver(false);
                        setSearchParticipants([]);
                        navigate(`/converses/${p.conversation.conversationId}`);
                      }}
                      style={{
                        borderRadius: "5px",
                        cursor: "pointer",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                      className="conversation-item"
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
                            backgroundColor: "#8d8d8d",
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
                      </Box>
                    </div>
                  );
                })}
              </Box>
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 100,
                  top: 0,
                  minHeight: "100%",
                  width: "100%",
                  bgcolor: "#2B3033",
                }}
              ></Box>
            ))}
        </Box>
      </Grid>
      <Grid
        item
        xs={8}
        bgcolor={`${mode === "dark" ? "#2B3033 " : "#ffffff"}`}
        borderRadius="5px"
        sx={{
          borderTopLeftRadius: "unset",
          borderBottomLeftRadius: "unset",
          borderLeft: "1px solid #393939",
          padding: "0 !important",
        }}
      >
        {participant ? (
          <>
            <ChatHeader
              participant={participant}
              isActive={usersStatus.includes(participant?.user?.userId)}
            />
            <ChatBody
              ref={{ bodyChatWrapperRef, areaChatRef }}
              mode={mode}
              message={message}
              messages={messages}
              messageState={messageState}
              userPreparing={userPreparing}
              editMessage={editMessage}
              participant={participant}
              currentUser={currentUser}
              setMessage={setMessage}
              setMessages={setMessages}
              setEditMessage={setEditMessage}
              setReplyMessage={setReplyMessage}
              setMessageState={setMessageState}
            />
            {(replyMessage || editMessage) && (
              <ChatAction
                mode={mode}
                currentUser={currentUser}
                editMessage={editMessage}
                setMessage={setMessage}
                replyMessage={replyMessage}
                setEditMessage={setEditMessage}
                setReplyMessage={setReplyMessage}
              />
            )}
            <ChatBox
              ref={inputMessageRef}
              message={message}
              blobs={blobs}
              editMessage={editMessage}
              handleSendMessage={handleSendMessage}
              setBlobs={setBlobs}
              setMessage={setMessage}
            />
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};
export default ChatList;
