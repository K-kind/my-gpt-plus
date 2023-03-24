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
  "solar-system": {
    width: "83.33px",
    height: "83.33px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  orbit: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "0.33px solid #ffab91",
    borderRadius: "50%",
  },
  "earth-orbit": {
    width: "55px",
    height: "55px",
    animation: `${spin} 12s linear 0s infinite`,
  },
  "venus-orbit": {
    width: "40px",
    height: "40px",
    animation: `${spin} 7.4s linear 0s infinite`,
  },
  "mercury-orbit": {
    width: "30px",
    height: "30px",
    animation: `${spin} 3s linear 0s infinite`,
  },
  planet: {
    position: "absolute",
    top: "-1.67px",
    width: "3.33px",
    height: "3.33px",
    borderRadius: "50%",
    backgroundColor: "#3ff9dc",
  },
  sun: {
    width: "11.83px",
    height: "11.83px",
    borderRadius: "50%",
    backgroundColor: "rgb(251, 91, 83)",
  },
}));

export const SolarSystem = () => {
  const { classes } = useStyles();
  return (
    <div className={classes["spinner-box"]}>
      <div className={classes["solar-system"]}>
        <div className={`${classes["earth-orbit"]} ${classes["orbit"]}`}>
          <div className={`${classes["planet"]}`}></div>
          <div className={`${classes["venus-orbit"]} ${classes["orbit"]}`}>
            <div className={`${classes["planet"]}`}></div>
            <div className={`${classes["mercury-orbit"]} ${classes["orbit"]}`}>
              <div className={`${classes["planet"]}`}></div>
              <div className={classes["sun"]}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
