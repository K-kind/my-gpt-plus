import { createStyles, keyframes } from "@mantine/core";

const spin3D = keyframes({
  from: { transform: "rotate3d(.5,.5,.5, 360deg)" },
  to: { transform: "rotate3d(0deg)" },
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
  leo: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
  "blue-orbit": {
    width: "55px",
    height: "55px",
    border: "1px solid #91daffa5",
    animation: `${spin3D} 3s linear .2s infinite`,
  },
  "green-orbit": {
    width: "40px",
    height: "40px",
    border: "1px solid #91ffbfa5",
    animation: `${spin3D} 2s linear 0s infinite`,
  },
  "red-orbit": {
    width: "30px",
    height: "30px",
    border: "1px solid #ffca91a5",
    animation: `${spin3D} 1s linear 0s infinite`,
  },
  "white-orbit": {
    width: "20px",
    height: "20px",
    // border: "1px solid #ffffff",
    border: "1px solid #ffab91",
    animation: `${spin3D} 10s linear 0s infinite`,
  },
  w1: { transform: "rotate3D(1, 1, 1, 90deg)" },
  w2: { transform: "rotate3D(1, 2, .5, 90deg)" },
  w3: { transform: "rotate3D(.5, 1, 2, 90deg)" },
}));

export const SpinnerOrbits = () => {
  const { classes } = useStyles();

  return (
    <div className={classes["spinner-box"]}>
      <div className={`${classes["blue-orbit"]} ${classes["leo"]}`}></div>

      <div className={`${classes["green-orbit"]} ${classes["leo"]}`}></div>

      <div className={`${classes["red-orbit"]} ${classes["leo"]}`}></div>

      <div
        className={`${classes["white-orbit"]} ${classes["w1"]} ${classes["leo"]}`}
      ></div>
      <div
        className={`${classes["white-orbit"]} ${classes["w2"]} ${classes["leo"]}`}
      ></div>
      <div
        className={`${classes["white-orbit"]} ${classes["w3"]} ${classes["leo"]}`}
      ></div>
    </div>
  );
};
