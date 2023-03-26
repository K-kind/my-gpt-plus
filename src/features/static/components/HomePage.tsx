import { LetsPlayButton } from "@/features/static/components/LetsPlayButton";
import { ItemWithTitle } from "@/shared/components/ItemWithTitle";
import { Container, List } from "@mantine/core";

export const HomePage = () => {
  return (
    <Container>
      <ItemWithTitle title="このサイトについて">
        <p>
          このサイトは、ChatGPTを少しだけ便利にしたWebアプリです。
          <br />
          無料で、ログインなしでもご利用いただけます。（※個人開発のため、都合により回数制限などを導入する可能性があります）
        </p>
      </ItemWithTitle>

      <ItemWithTitle title="独自のメリット">
        <List>
          <List.Item>
            プロンプトとは別に、メタ情報のセット・管理が可能
          </List.Item>
          <List.Item>チャット履歴を確認できる</List.Item>
          <List.Item>GPT-4モデルに対応予定（API許可が下り次第）</List.Item>
        </List>
      </ItemWithTitle>

      <LetsPlayButton />
    </Container>
  );
};
