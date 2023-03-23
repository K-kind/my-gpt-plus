import { Flex, Loader } from "@mantine/core";

type Props = {
  height?: string | number;
};

export const ContentLoader = ({ height }: Props) => {
  return (
    <Flex justify="center" align="center" h={height}>
      <Loader />
    </Flex>
  );
};
