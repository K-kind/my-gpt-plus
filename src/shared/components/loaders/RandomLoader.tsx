import { GradientCirclePlanes } from "@/shared/components/loaders/GradientCirclePlanes";
import { GradientSpinner } from "@/shared/components/loaders/GradientSpinner";
import { LoadingDots } from "@/shared/components/loaders/LoadingDots";
import { SolarSystem } from "@/shared/components/loaders/SolarSystem";
import { SpinnerOrbits } from "@/shared/components/loaders/SpinnerOrbits";
import { SpinningSquare } from "@/shared/components/loaders/SpinningSquare";
import { ThreeQuarterSpinner } from "@/shared/components/loaders/ThreeQuarterSpinner";
import { useMemo, useState } from "react";

const components = [
  SpinnerOrbits,
  GradientCirclePlanes,
  GradientSpinner,
  SpinningSquare,
  LoadingDots,
  SolarSystem,
  ThreeQuarterSpinner,
];

export const RandomLoader = () => {
  const [randomNumber] = useState(Math.floor(Math.random() * 7));
  const RandomComponent = useMemo(
    () => components[randomNumber],
    [randomNumber]
  );
  return <RandomComponent />;
};
