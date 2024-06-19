import { Avatar, Box, Tooltip } from "@mui/material";
import { memo, useEffect, useRef } from "react";
import TooltipTime from "./TooltipTime";

const ChatBody = ({ mode, messages, currentUser }) => {
    const lastMessageRef = useRef(null);

    useEffect(() => {
        // Cuộn tới tin nhắn cuối cùng khi danh sách tin nhắn thay đổi
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

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
                    {/* <div className="d-flex flex-row justify-content-start">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                            alt="avatar 1"
                            style={{
                                width: "45px",
                                height: "100%",
                            }}
                        />
                        <div>
                            <p
                                className="small p-2 ms-3 mb-1 rounded-3"
                                style={{
                                    color: "#000000",
                                    backgroundColor: "#f5f6f7",
                                }}
                            >
                                Hi
                            </p>
                            <p
                                className="small p-2 ms-3 mb-1 rounded-3"
                                style={{
                                    color: "#000000",
                                    backgroundColor: "#f5f6f7",
                                }}
                            >
                                How are you ...???
                            </p>
                            <p
                                className="small p-2 ms-3 mb-1 rounded-3"
                                style={{
                                    color: "#000000",
                                    backgroundColor: "#f5f6f7",
                                }}
                            >
                                What are you doing tomorrow? Can we come up a
                                bar?
                            </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted">
                                23:58
                            </p>
                        </div>
                    </div>

                    <div className="divider d-flex align-items-center mb-4">
                        <p
                            className="text-center mx-3 mb-0"
                            style={{
                                color: "#a2aab7",
                            }}
                        >
                            Today
                        </p>
                    </div>

                    <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                        <div>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                Hiii, I'm good.
                            </p>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                How are you doing?
                            </p>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                Long time no see! Tomorrow office. will be free
                                on sunday.
                            </p>
                            <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                                00:06
                            </p>
                        </div>
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                            alt="avatar 1"
                            style={{
                                width: "45px",
                                height: "100%",
                            }}
                        />
                    </div>
                    <div className="d-flex flex-row justify-content-start">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                            alt="avatar 1"
                            style={{
                                width: "45px",
                                height: "100%",
                            }}
                        />
                        <div>
                            <p
                                className="small p-2 ms-3 mb-1 rounded-3"
                                style={{
                                    color: "#000000",
                                    backgroundColor: "#f5f6f7",
                                }}
                            >
                                Hi
                            </p>
                            <p
                                className="small p-2 ms-3 mb-1 rounded-3"
                                style={{
                                    color: "#000000",
                                    backgroundColor: "#f5f6f7",
                                }}
                            >
                                How are you ...???
                            </p>
                            <p
                                className="small p-2 ms-3 mb-1 rounded-3"
                                style={{
                                    color: "#000000",
                                    backgroundColor: "#f5f6f7",
                                }}
                            >
                                What are you doing tomorrow? Can we come up a
                                bar?
                            </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted">
                                23:58
                            </p>
                        </div>
                    </div> */}
                </Box>
            </Box>
        </Box>
    );
};

export default memo(ChatBody);
