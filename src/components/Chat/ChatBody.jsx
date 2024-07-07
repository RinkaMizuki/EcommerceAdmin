import { Avatar, Box, Typography } from "@mui/material";
import { memo, useEffect, useRef } from "react";
import TooltipTime from "./TooltipTime";
import "./Chat.css";
import queryString from "query-string";
import { dataProvider, httpClient } from "../../contexts/dataProvider";

const ChatBody = ({
    mode,
    messages,
    setMessages,
    currentUser,
    isUserPreparing,
    toggleScroll,
}) => {
    const areaChatRef = useRef(null);
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

    const fetchMoreMessages = async () => {
        return getList(`conversations/${messages[0].conversationId}/messages`, {
            range: [messages.length, messages.length + 14],
        });
    };

    const handleScrollLoadMessages = async (e) => {
        if (e.target.scrollTop === 0 && messages.length >= 15) {
            const { data, total } = await fetchMoreMessages();
            if (!data.length) {
                areaChatRef.current.removeEventListener(
                    "scroll",
                    handleScrollLoadMessages
                );
            } else {
                setMessages((prevMessage) => [
                    ...data.reverse(),
                    ...prevMessage,
                ]);
            }
        }
    };

    useEffect(() => {
        areaChatRef.current.addEventListener(
            "scroll",
            handleScrollLoadMessages
        );
        return () =>
            areaChatRef.current?.removeEventListener(
                "scroll",
                handleScrollLoadMessages
            );
    }, [messages]);

    useEffect(() => {
        areaChatRef.current.scrollTop = areaChatRef.current.scrollHeight;
    }, [toggleScroll]);

    const userPrepare = messages.find((msg) => msg.senderId != currentUser.id);
    return (
        <Box height="calc(100% - 61px - 63px)" paddingY="10px">
            <Box
                className="card-body"
                ref={areaChatRef}
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
                        background: `${
                            mode === "dark" ? "#d5d5d5" : "#838383"
                        }`,
                    },
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
                        const newDate = filterMessageDateAndTime(
                            messages,
                            index
                        );
                        return (
                            <div key={msg.messageId}>
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
                                    <div className="d-flex flex-row justify-content-end pt-1">
                                        <TooltipTime date={msg?.sendAt}>
                                            <div>
                                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                    {msg.messageContent}
                                                </p>
                                            </div>
                                        </TooltipTime>

                                        <Avatar
                                            src={msg.sender?.url}
                                            alt={msg.sender?.avatar}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="d-flex flex-row justify-content-start pt-1"
                                        key={msg.messageId}
                                    >
                                        <Avatar
                                            src={msg.sender?.url}
                                            alt={msg.sender?.avatar}
                                        />
                                        <TooltipTime
                                            date={msg?.sendAt}
                                            position="right-start"
                                        >
                                            <div>
                                                <p
                                                    className="small p-2 ms-3 mb-1 rounded-3"
                                                    style={{
                                                        color: "#000000",
                                                        backgroundColor:
                                                            "#f5f6f7",
                                                    }}
                                                >
                                                    {msg.messageContent}
                                                </p>
                                            </div>
                                        </TooltipTime>
                                    </div>
                                )}
                            </div>
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
};

export default memo(ChatBody);
