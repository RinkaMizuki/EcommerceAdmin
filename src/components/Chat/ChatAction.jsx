import { Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TooltipTitle } from "./TooltipAction";
import { MESSAGE_TYPE } from "./ChatList";

export const REPLY_HEIGHT = 50;

const ChatAction = ({
  mode,
  currentUser,
  editMessage,
  replyMessage,
  setMessage,
  setEditMessage,
  setReplyMessage,
}) => {
  const { messageContent, senderId, sender } = replyMessage ?? {};
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: `${REPLY_HEIGHT}px`,
        padding: "2px 14px 0px",
        bgcolor: `${mode === "dark" ? "#2B3033" : "#ffffff"}`,
        borderTop: `1px solid ${mode === "dark" ? "#4f4f4f " : "#cbcbcb"}`,
      }}
    >
      <div>
        <Typography
          component="h6"
          variant="h6"
          sx={{
            fontWeight: "400",
            fontSize: " 13px",
          }}
        >
          {replyMessage
            ? senderId === currentUser?.id
              ? "Replying to yourself"
              : `Replying to ${sender?.userName}`
            : "Edit message"}
        </Typography>
        {replyMessage && (
          <Typography
            component="h6"
            variant="h6"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: "400",
              fontSize: " 12px",
              color: "#ccc",
            }}
          >
            {replyMessage.messageType !== MESSAGE_TYPE.IMAGE
              ? messageContent
              : "Image"}
          </Typography>
        )}
      </div>
      <TooltipTitle title="Cancel" position="top-start" offsetY={-14}>
        <div
          onClick={() => {
            replyMessage && setReplyMessage(null);
            editMessage && setEditMessage(null);
            setMessage({
              content: "",
              files: [],
            });
          }}
        >
          <CloseIcon
            sx={{
              cursor: "pointer",
              fontSize: "20px",
            }}
          />
        </div>
      </TooltipTitle>
    </Box>
  );
};
export default ChatAction;
