import {
  Navbar,
  ScrollArea,
  Button,
  Text,
  NavLink,
  Divider,
} from "@mantine/core";
import Link from "next/link";
import {
  IconAdjustments,
  IconList,
  IconPlus,
  IconUser,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { NavChatList } from "@/shared/components/NavChatList";
import { Suspense, useContext } from "react";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { AuthContext } from "@/features/auth/providers/auth";
import { SignOutNavLink } from "@/shared/components/SignOutNavLink";
import { AnonSignOutNavLink } from "@/shared/components/AnonSignOutNavLink";

type Props = {
  spNavbarOpened: boolean;
};

export const AppNavbar = ({ spNavbarOpened }: Props) => {
  const router = useRouter();
  const pageId = router.query.id as string | undefined;
  const { user } = useContext(AuthContext);

  return (
    <Navbar
      width={{ sm: 240, md: 300 }}
      p="xs"
      hiddenBreakpoint="sm"
      hidden={!spNavbarOpened}
    >
      <Navbar.Section mb={4}>
        <Link href="/chats/new" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="outline"
            size="md"
            px={12}
            fz="sm"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <IconPlus stroke={1.5} />
            <Text ml={6}>新しいチャット</Text>
          </Button>
        </Link>
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea}>
        <Suspense fallback={<ContentLoader />}>
          <NavChatList pageId={pageId} />
        </Suspense>
      </Navbar.Section>
      <Divider my="xs" />
      <Navbar.Section grow component={ScrollArea} mah="30%">
        <NavLink
          label="チャット履歴"
          component={Link}
          active={router.pathname === "/chats"}
          href={"/chats"}
          icon={<IconList size="1rem" stroke={1.5} />}
        />
        <NavLink
          label="事前指示管理"
          component={Link}
          active={router.pathname.startsWith("/prompts")}
          href={"/prompts"}
          icon={<IconAdjustments size="1rem" stroke={1.5} />}
        />
        {user!.isAnonymous && (
          <NavLink
            label="アカウント登録"
            component={Link}
            active={router.pathname === "/signup"}
            href={"/signup"}
            icon={<IconUser size="1rem" stroke={1.5} />}
          />
        )}
        {user!.isAnonymous ? <AnonSignOutNavLink /> : <SignOutNavLink />}
      </Navbar.Section>
    </Navbar>
  );
};
