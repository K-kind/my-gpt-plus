import {
  Navbar,
  ScrollArea,
  Button,
  Text,
  NavLink,
  Divider,
} from "@mantine/core";
import Link from "next/link";
import { IconList, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { NavChatList } from "@/shared/components/NavChatList";
import { Suspense } from "react";
import { ContentLoader } from "@/shared/components/ContentLoader";

export const AppNavbar = () => {
  const router = useRouter();
  const pageId = router.query.id as string | undefined;

  return (
    <Navbar width={{ base: 300 }} p="xs">
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
      <Navbar.Section grow component={ScrollArea} mah="50%">
        <Suspense fallback={<ContentLoader />}>
          <NavChatList pageId={pageId} />
        </Suspense>
      </Navbar.Section>
      <Divider my="xs" />
      <Navbar.Section>
        <NavLink
          label="チャット履歴"
          component={Link}
          active={router.pathname === "/chats"}
          href={"/chats"}
          icon={<IconList size="1rem" stroke={1.5} />}
        />
      </Navbar.Section>
    </Navbar>
  );
};
