import { createStyles, keyframes } from "@mantine/core";

const spin3D = keyframes({
  from: { transform: "rotate3d(.5,.5,.5, 360deg)" },
  to: { transform: "rotate3d(0deg)" },
});

const useStyles = createStyles((theme) => ({
  spinnerBox: {
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  leoBorder1: {
    position: "absolute",
    width: "50px",
    height: "50px",
    padding: "2px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    background: [
      "rgb(63,249,220)",
      "linear-gradient(0deg, rgba(63,249,220,0.1) 33%, rgba(63,249,220,1) 100%)",
    ],
    animation: `${spin3D} 1.8s linear 0s infinite`,
  },
  leoCore1: {
    width: "100%",
    height: "100%",
    // backgroundColor: "#37474faa",
    borderRadius: "50%",
  },
  leoBorder2: {
    position: "absolute",
    width: "50px",
    height: "50px",
    padding: "2px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    background: [
      "rgb(251, 91, 83)",
      "linear-gradient(0deg, rgba(251, 91, 83, 0.1) 33%, rgba(251, 91, 83, 1) 100%)",
    ],
    animation: `${spin3D} 2.2s linear 0s infinite`,
  },
  leoCore2: {
    width: "100%",
    height: "100%",
    // backgroundColor: "#1d2630aa",
    borderRadius: "50%",
  },
}));

export const GradientCirclePlanes = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.spinnerBox}>
      <div className={classes.leoBorder1}>
        <div className={classes.leoCore1}></div>
      </div>
      <div className={classes.leoBorder2}>
        <div className={classes.leoCore2}></div>
      </div>
    </div>
  );
};
