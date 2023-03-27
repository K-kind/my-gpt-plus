import { PromptDefaultCheck } from "@/features/prompts/components/PromptDefaultCheck";
import { PromptDeleteButton } from "@/features/prompts/components/PromptDeleteButton";
import { Prompt } from "@/features/prompts/types/prompt";
import { format } from "@/shared/utils/date";
import { Box, Button, Flex, Table } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";

type Props = {
  prompts: Prompt[];
};

export const PromptListTable = ({ prompts }: Props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th style={{ width: "50%" }}>タイトル</th>
          <th style={{ width: "180px" }}>作成日時</th>
          <th style={{ width: "90px" }}>デフォルト</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {prompts.map((prompt) => (
          <tr key={prompt.id}>
            <td>{prompt.title}</td>
            <td>{format(prompt.createdAt, "yyyy/MM/dd HH:mm")}</td>
            <td>
              <Box ml="sm">
                <PromptDefaultCheck prompt={prompt} />
              </Box>
            </td>
            <td>
              <Flex align="center">
                <Button
                  size="xs"
                  variant="subtle"
                  px={5.08}
                  component={Link}
                  href={`/prompts/${prompt.id}/edit`}
                  mr="xs"
                >
                  <IconPencil size="1.125rem" />
                </Button>
                <PromptDeleteButton prompt={prompt} prompts={prompts} />
              </Flex>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
