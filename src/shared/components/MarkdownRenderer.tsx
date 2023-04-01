import { CodeBlock } from "@/shared/components/CodeBlock";
import ReactMarkdown from "react-markdown";
import styled from "@emotion/styled";

type Props = {
  children: string;
};

export const MarkdownRenderer = ({ children }: Props) => {
  return (
    <StyledWrapper>
      <ReactMarkdown
        components={{
          code: CodeBlock,
        }}
      >
        {children}
      </ReactMarkdown>
    </StyledWrapper>
  );
};

const StyledWrapper = styled("div")`
  > p:first-of-type {
    margin-top: 0;
  }
  > p:last-of-type {
    margin-bottom: 0;
  }
  p {
    line-height: 28px;
    white-space: pre-wrap;
  }
`;
