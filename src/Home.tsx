import { data } from './lib/content';
import { ReactNode } from 'react';


interface CellProps {
  children: ReactNode | ReactNode[];
}

const Cell: React.FC<CellProps> = ({ children }) => {
  return <li>{children}</li>;
};

interface RowProps {
  row: (string | number)[];
}

interface SheetProps {
  title: string;
  sheet: (string | number)[][];
}

const Row: React.FC<RowProps> = ({ row }) => {
  return (
    <ul className="flex gap-4 text-left">
      {row.map((cell: string | number, i: number) => (
        <Cell key={i}>{cell}</Cell>
      ))}
    </ul>
  );
};

const Sheet: React.FC<SheetProps> = ({ sheet, title }) => {
  return <ul>
    <h2 className="text-xl font-bold">{title}</h2>
    <li>  {sheet.map((row: (string | number)[], i: number) => (
        <Row key={`Ports-${i}`} row={row} />
      ))}
    </li>
  </ul>
}

const Home = () => {
  return (
    <div className="flex">
      {Object.entries(data).map(([key, sheet]) => <Sheet key={key} title={key} sheet={sheet} />)}
      {/* <Sheet sheet={data.Ports} /> */}
    </div>
  );
};

export default Home;
