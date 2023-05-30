import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface SyntaxHighlighterProps {
  language: string;
  children: string;
}

const SyntaxHighlighterComponent: React.FC<SyntaxHighlighterProps> = ({
  language,
  children,
}) => {
  return (
    <SyntaxHighlighter language={language} style={tomorrow}>
      {children}
    </SyntaxHighlighter>
  );
};

export default SyntaxHighlighterComponent;