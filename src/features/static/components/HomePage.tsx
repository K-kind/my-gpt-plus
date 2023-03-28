import { LetsPlayButton } from "@/features/static/components/LetsPlayButton";
import { ItemWithTitle } from "@/shared/components/ItemWithTitle";
import { Card, Container, Image, List } from "@mantine/core";

export const HomePage = () => {
  return (
    <Container>
      <ItemWithTitle title="このサイトについて">
        <p>
          このサイトは、ChatGPTを少しだけ便利にしたWebアプリです。
          <br />
          無料で、ログインなしでもご利用いただけます。
          <br />
          （※個人開発のため、回数制限導入や、場合によりサービス終了の可能性があります）
        </p>
      </ItemWithTitle>

      <ItemWithTitle title="独自のメリット">
        <List>
          <List.Item>質問の事前指示のセット・管理ができる</List.Item>
          <List.Item>チャット履歴を確認できる</List.Item>
          <List.Item>高速なGPT-3.5（Turbo）モデルを使用</List.Item>
        </List>
      </ItemWithTitle>

      <ItemWithTitle title="アプリ画面">
        <Card withBorder maw={500}>
          <Image radius="md" src="/images/app_demo.gif" alt="アプリデモ" />
        </Card>
      </ItemWithTitle>

      <LetsPlayButton />
    </Container>
  );
};
