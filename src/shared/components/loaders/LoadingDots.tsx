import { createStyles, keyframes } from "@mantine/core";

const pulse = keyframes({
  from: { opacity: 1, transform: "scale(1)" },
  to: { opacity: 0.25, transform: "scale(.75)" },
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
  "pulse-container": {
    width: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "pulse-bubble": {
    width: "6.66px",
    height: "6.66px",
    borderRadius: "50%",
    backgroundColor: "#3ff9dc",
  },
  "pulse-bubble-1": { animation: `${pulse} .4s ease 0s infinite alternate` },
  "pulse-bubble-2": { animation: `${pulse} .4s ease .2s infinite alternate` },
  "pulse-bubble-3": { animation: `${pulse} .4s ease .4s infinite alternate` },
}));

export const LoadingDots = () => {
  const { classes } = useStyles();
  return (
    <div className={classes["spinner-box"]}>
      <div className={classes["pulse-container"]}>
        <div
          className={`${classes["pulse-bubble"]} ${classes["pulse-bubble-1"]}`}
        ></div>
        <div
          className={`${classes["pulse-bubble"]} ${classes["pulse-bubble-2"]}`}
        ></div>
        <div
          className={`${classes["pulse-bubble"]} ${classes["pulse-bubble-3"]}`}
        ></div>
      </div>
    </div>
  );
};
