import { Navbar, ScrollArea, Button } from "@mantine/core";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { NavChatList } from "@/shared/components/NavChatList";
import { Suspense } from "react";
import { ContentLoader } from "@/shared/components/ContentLoader";

export const AppNavbar = () => {
  const router = useRouter();
  const pageId = router.query.id as string | undefined;

  return (
    <Navbar width={{ base: 300 }}>
      <Navbar.Section mb="sm">
        <Link href="/chats/new" style={{ textDecoration: "none" }}>
          <Button leftIcon={<IconPlus />} fullWidth variant="outline" size="md">
            新しいチャット
          </Button>
        </Link>
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea}>
        <Suspense fallback={<ContentLoader />}>
          <NavChatList pageId={pageId} />
        </Suspense>
      </Navbar.Section>
    </Navbar>
  );
};
