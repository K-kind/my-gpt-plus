import styled from "@emotion/styled";
import { Flex, Text } from "@mantine/core";
import { IconClipboard, IconClipboardCheck } from "@tabler/icons-react";
import { CodeComponent } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useClipboard } from "@mantine/hooks";

export const CodeBlock: CodeComponent = (options) => {
  const clipboard = useClipboard({ timeout: 700 });

  const { inline, className, children } = options;
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || "");
  const lang = match?.[1];

  return (
    <CodeBlockWrapper>
      <Flex
        justify="space-between"
        align="center"
        sx={{ borderRadius: "6px 6px 0 0", marginTop: "6.5px" }}
        bg="#343541"
        c="gray.4"
        fz="xs"
        px="md"
        py={6}
      >
        <span>{lang}</span>
        <Flex
          align="center"
          sx={{ cursor: "pointer" }}
          onClick={() => clipboard.copy(children[0])}
        >
          {clipboard.copied ? (
            <IconClipboardCheck size={16} />
          ) : (
            <IconClipboard size={16} />
          )}
          <Text ml={4}>{clipboard.copied ? "コピーしました！" : "コピー"}</Text>
        </Flex>
      </Flex>
      <SyntaxHighlighter style={vscDarkPlus} language={lang}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </CodeBlockWrapper>
  );
};

const CodeBlockWrapper = styled.div`
  > pre {
    border-radius: 0 0 6px 6px;
    margin-top: 0 !important;
  }
`;
