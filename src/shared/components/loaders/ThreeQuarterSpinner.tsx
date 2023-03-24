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
  "three-quarter-spinner": {
    width: "33.33px",
    height: "33.33px",
    border: "2px solid #fb5b53",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: `${spin} .5s linear 0s infinite`,
  },
}));

export const ThreeQuarterSpinner = () => {
  const { classes } = useStyles();
  return (
    <div className={classes["spinner-box"]}>
      <div className={classes["three-quarter-spinner"]}></div>
    </div>
  );
};
