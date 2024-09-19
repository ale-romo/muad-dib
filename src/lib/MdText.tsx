import { marked } from 'marked';

interface MdTextProps {
  text: string;
  className?: string;
}

const MdText= ({ text, className = '' }: MdTextProps) => {
  return <div className={className} dangerouslySetInnerHTML={{ __html:marked.parse(text) }} />
};

export default MdText;
