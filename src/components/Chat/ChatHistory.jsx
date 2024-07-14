import { Box } from "@mui/material";

const ChatHistory = ({ messagesHistory }) => {
  return messagesHistory.map((msg) => (
    <Box
      key={msg.messageHistoryId}
      sx={{
        alignSelf: "flex-end",
        position: "relative",
        zIndex: 2,
        filter: "brightness(70%)",
      }}
    >
      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
        {msg.messageHistoryContent}
      </p>
    </Box>
  ));
};

export default ChatHistory;
