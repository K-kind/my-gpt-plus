import { createStyles, keyframes } from "@mantine/core";

const configureClockwise = keyframes({
  "0%": { transform: "rotate(0)" },
  "25%": { transform: "rotate(90deg)" },
  "50%": { transform: "rotate(180deg)" },
  "75%": { transform: "rotate(270deg)" },
  "100%": { transform: "rotate(360deg)" },
});
const configureXclockwise = keyframes({
  "0%": { transform: "rotate(45deg)" },
  "25%": { transform: "rotate(-45deg)" },
  "50%": { transform: "rotate(-135deg)" },
  "75%": { transform: "rotate(-225deg)" },
  "100%": { transform: "rotate(-315deg)" },
});

const useStyles = createStyles((theme) => ({
  "spinner-box": {
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  "configure-border-1": {
    width: "38.33px",
    height: "38.33px",
    padding: "1.4px",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fb5b53",
    animation: `${configureClockwise} 3s ease-in-out 0s infinite alternate`,
  },
  "configure-border-2": {
    width: "38.33px",
    height: "38.33px",
    padding: "1.4px",
    left: "-38.33px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgb(63,249,220)",
    transform: "rotate(45deg)",
    animation: `${configureXclockwise} 3s ease-in-out 0s infinite alternate`,
  },
  "configure-core": {
    width: "100%",
    height: "100%",
    backgroundColor: "#e9ecef",
    // backgroundColor: "#1d2630",
  },
}));

export const SpinningSquare = () => {
  const { classes } = useStyles();
  return (
    <div className={classes["spinner-box"]}>
      <div className={classes["configure-border-1"]}>
        <div className={classes["configure-core"]}></div>
      </div>
      <div className={classes["configure-border-2"]}>
        <div className={classes["configure-core"]}></div>
      </div>
    </div>
  );
};
