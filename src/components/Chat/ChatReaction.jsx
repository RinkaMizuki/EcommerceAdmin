import { Box, Typography } from "@mui/material";
import { TooltipTitle } from "./TooltipAction";

const ChatReaction = ({ reactions }) => {
  return (
    <Box
      sx={{
        bgcolor: "#242526",
        borderRadius: "10px",
        position: "absolute",
        bottom: "-15px",
        right: "10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {reactions.map((react) => {
        return (
          <TooltipTitle
            arrow={false}
            offsetY={-12}
            offsetX={-15}
            title={react.userReaction?.userName}
            key={react.reactionId}
          >
            <span
              style={{
                cursor: "pointer",
              }}
            >
              {react.emoji}
            </span>
          </TooltipTitle>
        );
      })}
      {reactions.length > 1 && (
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            minHeight: "16px",
            minWidth: "16px",
          }}
        >
          {reactions.length}
        </Typography>
      )}
    </Box>
  );
};

export default ChatReaction;
