import {
  Burger,
  Flex,
  Header,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";
import { useCallback } from "react";

type Props = {
  spNavbarOpened: boolean;
  setSpNavbarOpened: (opened: boolean) => void;
};

export const AppSpHeader = ({ spNavbarOpened, setSpNavbarOpened }: Props) => {
  const theme = useMantineTheme();
  const onClick = useCallback(
    () => setSpNavbarOpened(!spNavbarOpened),
    [setSpNavbarOpened, spNavbarOpened]
  );

  return (
    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
      <Header height={{ base: 40, sm: 0 }} p="md">
        <Flex align="center" h="100%">
          <Burger
            opened={spNavbarOpened}
            onClick={onClick}
            size="sm"
            color={theme.colors.gray[6]}
          />
        </Flex>
      </Header>
    </MediaQuery>
  );
};
