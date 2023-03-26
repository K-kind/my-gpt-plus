import { PromptDeleteButton } from "@/features/prompts/components/PromptDeleteButton";
import { Prompt } from "@/features/prompts/types/prompt";
import { format } from "@/shared/utils/date";
import { Box, Table } from "@mantine/core";
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {prompts.map((prompt) => (
          <tr key={prompt.id}>
            <td style={{ padding: 0 }}>
              <Box
                component={Link}
                href={`/prompt/${prompt.id}`}
                p={10}
                h="100%"
                sx={(theme) => ({
                  display: "block",
                  textDecoration: "none",
                  "&:hover": { backgroundColor: theme.colors.blue[0] },
                })}
                c="blue"
              >
                {prompt.title}
              </Box>
            </td>
            <td>{format(prompt.createdAt, "yyyy/MM/dd hh:mm")}</td>
            <td>
              <PromptDeleteButton prompt={prompt} prompts={prompts} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
