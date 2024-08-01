import { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "src/components/ui/card"


interface RowProps {
  row: (string | number)[];
}

interface SheetProps {
  title: string;
  sheet: (string | number)[][];
}

const Row: React.FC<RowProps> = ({ row }) => {
    return <TableRow>{row.map((cell: string | number, i: number) => (
      <TableCell key={i}>{cell}</TableCell>
    ))}</TableRow>
};
const HeaderRow: React.FC<RowProps> = ({ row }) => {
  return <>{row.map((cell: string | number, i: number) => (
    <TableHead key={i}>{cell}</TableHead>
  ))}</>
};

const Page: React.FC<SheetProps> = ({ sheet, title }) => {
  return <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <HeaderRow key={`table-header`} row={sheet[0]} />
        </TableHeader>
        <TableBody>
          {sheet.slice(1).map((row: (string | number)[], i: number) => {
            return <Row key={`Ports-${i}`} row={row} />
          })}
        </TableBody>

      </Table>
    </CardContent>
  </Card>
}
export default Page;
