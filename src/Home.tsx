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

const Row: React.FC<RowProps> = ({ row }) => {
  return (
    <ul className="flex gap-4 text-left">
      {row.map((cell: string | number, i: number) => (
        <Cell key={i}>{cell}</Cell>
      ))}
    </ul>
  );
};

const Home = () => {
  return (
    <div>
      <h2 className="text-red-500">Home Page</h2>
      {data.Ports.map((row: (string | number)[], i: number) => (
        <Row key={`Ports-${i}`} row={row} />
      ))}
    </div>
  );
};

export default Home;
