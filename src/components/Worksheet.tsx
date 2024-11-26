import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "src/components/ui/hover-card";
import { Button } from "src/components/ui/button"
export const WorkSheetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 311.07 313.23">
    <defs>
      <style>
        {`
          .cls-1 {
            fill: none;
          }
          .cls-1, .cls-2 {
            stroke: #000;
            stroke-miterlimit: 10;
            stroke-width: 5px;
          }
        `}
      </style>
    </defs>
    <g>
      <polyline className="cls-1" points="2.5 75.82 2.5 310.73 308.57 310.73 308.57 75.82"/>
      <line className="cls-1" x1="31.11" y1="289.65" x2="111.3" y2="289.65"/>
      <line className="cls-1" x1="148.57" y1="289.65" x2="190.36" y2="289.65"/>
      <polyline className="cls-1" points="111.3 106.69 111.3 148.48 282.97 148.48 282.97 96.52"/>
      <line className="cls-1" x1="237.79" y1="96.52" x2="237.79" y2="148.48"/>
      <line className="cls-1" x1="207.3" y1="122.5" x2="207.3" y2="148.48"/>
      <line className="cls-1" x1="163.25" y1="96.52" x2="163.25" y2="148.48"/>
      <line className="cls-1" x1="138.41" y1="122.5" x2="138.41" y2="148.48"/>
      <polyline className="cls-1" points="80.81 87.49 80.81 255.77 31.11 255.77"/>
      <line className="cls-1" x1="80.81" y1="239.96" x2="55.96" y2="239.96"/>
      <line className="cls-1" x1="80.81" y1="207.21" x2="63.86" y2="207.21"/>
      <line className="cls-1" x1="80.81" y1="181.23" x2="39.02" y2="181.23"/>
      <line className="cls-1" x1="80.81" y1="148.48" x2="55.96" y2="148.48"/>
      <line className="cls-1" x1="80.81" y1="122.5" x2="63.86" y2="122.5"/>
      <rect className="cls-1" x="22.64" y="20.71" width="20.61" height="20.61"/>
      <rect className="cls-1" x="53.7" y="20.71" width="20.61" height="20.61"/>
      <rect className="cls-1" x="84.76" y="20.71" width="20.61" height="20.61"/>
      <rect className="cls-1" x="111.3" y="170.92" width="20.61" height="20.61"/>
      <rect className="cls-1" x="111.3" y="235.16" width="20.61" height="20.61"/>
      <rect className="cls-2" x="111.3" y="203.04" width="20.61" height="20.61"/>
      <rect className="cls-2" x="149.06" y="170.92" width="20.61" height="20.61"/>
      <rect className="cls-2" x="149.06" y="235.16" width="20.61" height="20.61"/>
      <rect className="cls-1" x="149.06" y="203.04" width="20.61" height="20.61"/>
      <rect className="cls-1" x="186.83" y="170.92" width="20.61" height="20.61"/>
      <rect className="cls-2" x="186.83" y="235.16" width="20.61" height="20.61"/>
      <rect className="cls-2" x="186.83" y="203.04" width="20.61" height="20.61"/>
      <rect className="cls-1" x="224.59" y="170.92" width="20.61" height="20.61"/>
      <rect className="cls-1" x="224.59" y="235.16" width="20.61" height="20.61"/>
      <rect className="cls-2" x="224.59" y="203.04" width="20.61" height="20.61"/>
      <rect className="cls-2" x="262.36" y="170.92" width="20.61" height="20.61"/>
      <rect className="cls-1" x="262.36" y="235.16" width="20.61" height="20.61"/>
      <rect className="cls-1" x="262.36" y="203.04" width="20.61" height="20.61"/>
      <rect className="cls-1" x="2.5" y="2.5" width="306.07" height="64.75"/>
    </g>
  </svg>
);

const Worksheet = ({ questions }: { questions: string[]}) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Button asChild>
        <a href="worksheets" target="_blank" className="">Download XLS Worksheet</a>
      </Button>
    </HoverCardTrigger>
    <HoverCardContent className="flex flex-col items-center gap-4">
      <div className="w-1/2">
        <WorkSheetIcon />
      </div>
      <h2 className="font-bold text-center">Keep track of your task coverage!</h2>
      {questions.map((question, i) => <li key={`questions-${i}`}>{question}</li>)}
    </HoverCardContent>
  </HoverCard>
);
export default Worksheet;
