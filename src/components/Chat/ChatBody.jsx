import { Avatar, Box } from "@mui/material";
import { memo, useEffect, useRef } from "react";
import TooltipTime from "./TooltipTime";
import "./Chat.css";

const ChatBody = ({ mode, messages, currentUser, isUserPreparing }) => {
    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, lastMessageRef.current]);

    const userPrepare = messages.find((msg) => msg.senderId != currentUser.id);

    return (
        <Box height="calc(100% - 61px - 63px)" paddingY="10px">
            <Box
                className="card-body"
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
                }}
            >
                <Box
                    sx={{
                        paddingX: "5px",
                    }}
                >
                    {messages.map((msg, index) => {
                        return msg?.senderId === currentUser.id ? (
                            <div
                                className="d-flex flex-row justify-content-end pt-1"
                                key={msg.messageId}
                                ref={
                                    index === messages.length - 1
                                        ? lastMessageRef
                                        : null
                                }
                            >
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
                                ref={
                                    index === messages.length - 1
                                        ? lastMessageRef
                                        : null
                                }
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
                                                backgroundColor: "#f5f6f7",
                                            }}
                                        >
                                            {msg.messageContent}
                                        </p>
                                    </div>
                                </TooltipTime>
                            </div>
                        );
                    })}
                    {isUserPreparing && (
                        <div
                            className="d-flex flex-row align-items-center justify-content-start pt-1 gap-3"
                            ref={lastMessageRef}
                        >
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
