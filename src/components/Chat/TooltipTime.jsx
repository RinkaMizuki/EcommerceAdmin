import { Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    zIndex: 2000, // Change this value as needed
  },
}));

const TooltipTime = ({
  children,
  date,
  position = "left",
  offsetX = 0,
  offsetY = -14,
  enterDelay = 300,
  leaveDelay = 300,
}) => {
  const classes = useStyles();
  return (
    <Tooltip
      leaveDelay={leaveDelay}
      enterDelay={enterDelay}
      disableInteractive
      title={new Date(date).toLocaleString()}
      placement={position}
      classes={{
        popper: classes.customTooltip,
      }}
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

export default TooltipTime;
