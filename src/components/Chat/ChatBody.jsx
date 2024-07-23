import { Avatar, Box } from "@mui/material";
import { createRef, forwardRef, memo, useEffect, useState } from "react";
import "./Chat.css";
import { dataProvider } from "../../contexts/dataProvider";
import { MESSAGE_STATE } from "./ChatList";
import ChatMessage from "./ChatMessage";

export const LIMIT = 15;

const ChatBody = forwardRef(
  (
    {
      mode,
      messages,
      currentUser,
      editMessage,
      messageState,
      isUserPreparing,
      setMessage,
      setMessages,
      setReplyMessage,
      setMessageState,
      setEditMessage,
    },
    ref
  ) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [messageRefs, setMessageRefs] = useState([]);

    const { bodyChatWrapperRef, areaChatRef } = ref;
    const { getList } = dataProvider;

    const groupMessageDateAndTime = (dateTime) => {
      const dt = new Date(parseInt(new Date(dateTime).getTime()));

      const todayDate = new Date();
      const today = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate()
      );
      const yesterday = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate() - 1
      );
      let difference = "";

      const aDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
      const startOfWeek = new Date(todayDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of current week (Sunday)

      if (aDate.getTime() === today.getTime()) {
        difference = "Today";
      } else if (aDate.getTime() === yesterday.getTime()) {
        difference = "Yesterday";
      } else if (aDate >= startOfWeek && aDate <= today) {
        // Within the current week, show day and time
        difference = dt.toLocaleDateString("en-US", {
          weekday: "short",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      } else {
        // Outside the current week, show full date and time
        difference = dt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      }

      return difference;
    };

    const filterMessageDateAndTime = (messages, index) => {
      let newDate = "";
      const currentDate = new Date(messages[index].sendAt);

      if (index === 0) {
        newDate = groupMessageDateAndTime(messages[index].sendAt);
      } else {
        const previousDate = new Date(messages[index - 1]?.sendAt);
        const isSameAsPrevious =
          currentDate.toDateString() === previousDate.toDateString();

        if (!isSameAsPrevious) {
          newDate = groupMessageDateAndTime(messages[index].sendAt);
        }
      }
      return newDate;
    };

    const fetchMoreMessages = async (beforeDate) => {
      //get last scroll position before fetching more messages
      const currentScrollPosition = areaChatRef.current.scrollHeight;
      setScrollPosition(currentScrollPosition);
      setMessageState(MESSAGE_STATE.LOAD);
      return getList(`conversations/${messages[0].conversationId}/messages`, {
        beforeDate,
        limit: LIMIT,
      });
    };

    const handleScrollLoadMessages = async (e) => {
      if (e.target.scrollTop === 0 && messages.length >= LIMIT) {
        try {
          setIsLoading(true);
          const lastMessageDate = messages[0]?.sendAt;
          const { data, total } = await fetchMoreMessages(lastMessageDate);
          if (!data.length) {
            areaChatRef.current.removeEventListener(
              "scroll",
              handleScrollLoadMessages
            );
          } else {
            setMessages((prevMessage) => [
              ...data.slice().reverse(),
              ...prevMessage,
            ]);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    const handleScrollToMessage = (messageId) => {
      let messageElement = null;
      messageRefs.forEach((m) => {
        if (m?.current?.id === messageId) {
          messageElement = m;
        } else {
          if (m.current) {
            const child = m?.current?.children[0]?.children[0];
            if (child) {
              child.style.border = "unset !important";
            } else {
              m.current.style.border = "unset !important";
            }
          }
        }
      });
      //message was already render in UI
      if (messageElement?.current) {
        messageElement.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        const child = messageElement.current?.children[0]?.children[0];
        if (child) {
          child.style.border = "2px solid #fff";
        } else {
          messageElement.current.style.border = "2px solid #fff";
        }
      }
    };

    useEffect(() => {
      const refs = Array.from({ length: messages.length }).map(() =>
        createRef()
      );
      setMessageRefs(refs);
    }, [messages]);

    const userPrepare = messages.find((msg) => msg.senderId != currentUser.id);

    useEffect(() => {
      if (areaChatRef.current && messageState === MESSAGE_STATE.LOAD) {
        areaChatRef.current.scrollTop =
          areaChatRef.current.scrollHeight - scrollPosition;
      } else if (areaChatRef.current && messageState === MESSAGE_STATE.ADD) {
        areaChatRef.current.scrollTop = areaChatRef.current.scrollHeight;
      }
      areaChatRef.current.addEventListener("scroll", handleScrollLoadMessages);
      return () =>
        areaChatRef.current?.removeEventListener(
          "scroll",
          handleScrollLoadMessages
        );
    }, [messages, messageState]);

    return (
      <Box
        height="calc(100% - 61px - 63px)"
        paddingY="10px"
        ref={bodyChatWrapperRef}
      >
        <Box
          className="card-body"
          ref={areaChatRef}
          sx={{
            "::-webkit-scrollbar": {
              borderRadius: "15px",
              width: "7px",
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
            height: "100%",
            maxHeight: "511px",
            position: "relative",
            overflow: "overlay",
            scrollbarGutter: "stable both-edges",
            overflowX: "hidden",
            overscrollBehavior: "contain",
          }}
        >
          <Box
            sx={{
              paddingX: "5px",
            }}
          >
            {messages.map((msg, index) => {
              const newDate = filterMessageDateAndTime(messages, index);
              return (
                <ChatMessage
                  messageRefs={messageRefs}
                  ref={messageRefs[index]}
                  key={msg.messageId}
                  msg={msg}
                  newDate={newDate}
                  currentUser={currentUser}
                  editMessage={editMessage}
                  setMessage={setMessage}
                  setEditMessage={setEditMessage}
                  setReplyMessage={setReplyMessage}
                  setMessageState={setMessageState}
                  handleScrollToMessage={handleScrollToMessage}
                />
              );
            })}
            {isUserPreparing && (
              <div className="d-flex flex-row align-items-center justify-content-start pt-1 gap-3">
                <Avatar
                  src={userPrepare?.sender?.url}
                  alt={userPrepare?.sender?.avatar}
                />
                <div className="is-typing">
                  <div className="jump1"></div>
                  <div className="jump2"></div>
                  <div className="jump3"></div>
                </div>
              </div>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
);

export default memo(ChatBody);
