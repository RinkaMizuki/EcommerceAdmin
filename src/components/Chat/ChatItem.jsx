import { Avatar, Box, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MESSAGE_STATE } from "./ChatList";

const ChatItem = ({
  p,
  mode,
  isActive,
  currentUser,
  isShowSearchConver,
  setParticipant,
  setMessageState,
}) => {
  const navigate = useNavigate();
  const params = useParams();

  const { messageContent, sendAt, sender, isDeleted } =
    p.conversation?.lastMessage;

  const formatDate = (date) => {
    if (date) {
      return format(parseISO(date), "MMMM d");
    }
    return "";
  };

  useEffect(() => {
    if (params?.conversationId === p?.conversation?.conversationId) {
      setParticipant(p);
    }
  }, [params?.conversationId]);

  return (
    <Box
      sx={{
        marginTop: "15px",
      }}
    >
      <div
        onClick={() => {
          if (params?.conversationId !== p.conversationId) {
            setMessageState(MESSAGE_STATE.ADD);
            navigate(`/converses/${p.conversation.conversationId}`);
          }
        }}
        style={{
          boxShadow: `${
            params?.conversationId === p?.conversation?.conversationId &&
            !isShowSearchConver
              ? "rgba(0, 0, 0, 0.19) 0px 10px 10px, rgba(0, 0, 0, 0) 0px 6px 6px"
              : "none"
          }`,
          borderRadius: "5px",
          cursor: "pointer",
          padding: "15px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
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
              border: `3px solid ${mode === "dark" ? "#2B3033" : "#ffffff"}`,
              boxSizing: "unset",
              backgroundColor: `${isActive ? "#4daa57" : "#8d8d8d"}`,
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
            overflow: "hidden",
          }}
        >
          <Typography fontWeight="600" fontSize="15px">
            {p.user?.userName}
          </Typography>
          <p
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "calc(100% - 20px)",
              fontSize: "13px",
              color: `${mode === "dark" ? "#d5d5d5" : "#838383"}`,
            }}
          >
            {sender?.userId === currentUser?.id
              ? `You ${!isDeleted ? `: ${messageContent}` : "unsent a message"}`
              : `${
                  !isDeleted
                    ? messageContent
                    : `${sender.userName} unsent a message`
                }`}
          </p>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",
            }}
          >
            {formatDate(sendAt)}
          </Typography>
        </Box>
      </div>
    </Box>
  );
};
export default memo(ChatItem);

{
  /* <div
    style={{
      alignSelf: "flex-end",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "13px",
      height: "13px",
      backgroundColor: "#0866ff",
      borderRadius: "50%",
      marginTop: "5px",
    }}
    ></div> */
}
