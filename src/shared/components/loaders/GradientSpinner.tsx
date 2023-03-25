import { createStyles, keyframes } from "@mantine/core";

const spin = keyframes({
  from: { transform: "rotate(0)" },
  to: { transform: "rotate(359deg)" },
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
  "circle-border": {
    width: "50px",
    height: "50px",
    padding: "1px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    background: [
      "rgb(63,249,220)",
      "linear-gradient(0deg, rgba(63,249,220,0.1) 33%, rgba(63,249,220,1) 100%)",
    ],
    animation: `${spin} .8s linear 0s infinite`,
  },
  "circle-core": {
    width: "100%",
    height: "100%",
    // backgroundColor: "#1d2630",
    backgroundColor: "#e9ecef",
    borderRadius: "50%",
  },
}));

export const GradientSpinner = () => {
  const { classes } = useStyles();
  return (
    <div className={classes["spinner-box"]}>
      <div className={classes["circle-border"]}>
        <div className={classes["circle-core"]}></div>
      </div>
    </div>
  );
};
