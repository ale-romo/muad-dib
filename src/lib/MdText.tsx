import { marked } from 'marked';

interface MdTextProps {
  text: string;
  className?: string;
}

marked.setOptions({
  breaks: true,
})

const MdText= ({ text, className = '' }: MdTextProps) => {
  return <div className={className} dangerouslySetInnerHTML={{ __html:marked.parse(text) }} />
};

export default MdText;
