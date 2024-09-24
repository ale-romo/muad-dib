import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "src/components/ui/hover-card";
import { Button } from "src/components/ui/button"

const Worksheet = ({ titles }: { titles: string[]}) => (
  <HoverCard open>
    <HoverCardTrigger asChild>
      <Button asChild>
        <a href="worksheets" target="_blank" className="">Download Worksheet</a>
      </Button>
    </HoverCardTrigger>
    <HoverCardContent>
      <h2>How is my organization addressing this</h2>
      <div className="">
        {titles.map((title, i) => <div className="border flex items-stretch text-[8px] border-black border-b-0 last:border-b" key={i}>
          <span className="w-6 border-r border-black"></span>
          <span className="w-6 border-r border-black"></span>
          <span className="p-1">{title}</span>
        </div>)}
      </div>
    </HoverCardContent>
  </HoverCard>
);
export default Worksheet;
