import { marked } from 'marked';

interface MdTextProps {
  children: string;
  className?: string;
}

const MdText= ({ children, className = '' }: MdTextProps) => {
  return <div className={className} dangerouslySetInnerHTML={{ __html:marked.parse(children) }} />
};

export default MdText;
