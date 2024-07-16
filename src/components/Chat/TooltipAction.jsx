import {
  Box,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
} from "@mui/material";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useRef, useState } from "react";
import { userService } from "../../services/userService";
import { default as ReactionPicker } from "emoji-picker-react";
import { ParticipantContext } from "../../contexts/participantContext";
import { chathubConnection } from "../../services/realtimeService";
import "./Chat.css";

const useStyles = makeStyles(() => ({
  customTooltip: {
    borderRadius: "3px", // Change this value as needed
  },
  customPaper: {
    overflow: "hidden",
  },
}));

export const TooltipTitle = ({
  title,
  children,
  position = "top-start",
  arrow = true,
  offsetX = 0,
  offsetY = 0,
  enterDelay = 200,
  leaveDelay = 200,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Tooltip
      {...props}
      leaveDelay={leaveDelay}
      enterDelay={enterDelay}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [offsetX, offsetY],
              },
            },
          ],
        },
      }}
      classes={{
        tooltip: classes.customTooltip,
      }}
      disableInteractive
      title={title}
      placement={position}
      arrow={arrow}
    >
      {children}
    </Tooltip>
  );
};

const ActionCpn = ({
  msg,
  reverse,
  setMessage,
  morePlacement,
  setEditMessage,
  setReplyMessage,
}) => {
  const [open, setOpen] = useState(false);
  const [isShowReaction, setIsShowReaction] = useState(false);
  const anchorRef = useRef(null);
  const [tooltipTitle, setTooltipTitle] = useState({
    more: "More",
    react: "React",
    reply: "Reply",
  });
  const { participant } = useContext(ParticipantContext);
  const classes = useStyles();
  const currentUser = userService.getUser();

  const handleToggle = () => {
    setIsShowReaction(false);
    setOpen((prevOpen) => !prevOpen);
    setTooltipTitle((prevTitle) => ({ ...prevTitle, more: "" }));
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleRemoveMessage = (message) => {
    chathubConnection.invoke("SendRemoveMessageAsync", currentUser.id, message);
  };

  const handleChooseReaction = (reaction, event) => {
    setIsShowReaction(false);
    const reactionDto = {
      reactionCode: reaction.unified,
      reactionImgUrl: reaction.imageUrl,
      emoji: reaction.emoji,
      messageId: msg.messageId,
      userReactionId: currentUser.id,
    };
    chathubConnection
      .invoke("SendReactMessageAsync", participant?.userId, reactionDto)
      .catch((err) => console.error("Error invoking SendMessageAsync: ", err));
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: !reverse ? "row" : "row-reverse",
        gap: "10px",
        aside: {
          position: "absolute",
          bottom: "30px",
          left: "-140px",
        },
      }}
    >
      {isShowReaction ? (
        <ClickAwayListener
          onClickAway={() => {
            setIsShowReaction(false);
          }}
        >
          <>
            <ReactionPicker
              className="custom-reaction-picker"
              onReactionClick={handleChooseReaction}
              onEmojiClick={handleChooseReaction}
              reactions={["1f44d", "1f606", "1f622", "1f621", "2764-fe0f"]}
              reactionsDefaultOpen={true}
              open={isShowReaction}
              style={{ zIndex: 9999 }}
            />
          </>
        </ClickAwayListener>
      ) : null}
      <TooltipTitle title={tooltipTitle.more}>
        <Box>
          <span
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MoreVertIcon
              sx={{
                cursor: "pointer",
              }}
            />
          </span>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement={morePlacement}
            transition
            disablePortal
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps}>
                <Paper
                  classes={{
                    root: classes.customPaper,
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {currentUser.id === msg.senderId && (
                        <Box>
                          <MenuItem
                            onClick={(e) => {
                              handleClose(e);
                              setReplyMessage(null);
                              setEditMessage(msg);
                              setMessage(msg.messageContent);
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => handleRemoveMessage(msg)}>
                            Remove
                          </MenuItem>
                        </Box>
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      </TooltipTitle>
      <TooltipTitle title={tooltipTitle.reply}>
        <span
          onClick={() => {
            setReplyMessage(msg);
          }}
        >
          <ReplyIcon
            sx={{
              cursor: "pointer",
            }}
          />
        </span>
      </TooltipTitle>

      <TooltipTitle title={tooltipTitle.react}>
        <span
          onClick={() => {
            setIsShowReaction(true);
            setTooltipTitle((prevTitle) => ({ ...prevTitle, react: "" }));
          }}
        >
          <AddReactionIcon
            sx={{
              cursor: "pointer",
            }}
          />
        </span>
      </TooltipTitle>
    </Box>
  );
};

const TooltipAction = ({
  position = "left-end",
  msg,
  children,
  reverse = false,
  morePlacement = "top-end",
  setMessage = () => {},
  setEditMessage,
  setIsCalcHeight,
  setReplyMessage,
  offsetX = 0,
  offsetY = -10,
  enterDelay = 300,
  leaveDelay = 300,
}) => {
  return (
    <Tooltip
      leaveDelay={leaveDelay}
      enterDelay={enterDelay}
      title={
        <ActionCpn
          msg={msg}
          reverse={reverse}
          morePlacement={morePlacement}
          setMessage={setMessage}
          setReplyMessage={setReplyMessage}
          setEditMessage={setEditMessage}
          setIsCalcHeight={setIsCalcHeight}
        />
      }
      placement={position}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [offsetX, offsetY],
              },
            },
          ],
        },
      }}
    >
      {children}
    </Tooltip>
  );
};
export default TooltipAction;
