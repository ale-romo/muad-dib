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
import { replaceUnderscoresWithSpaces } from "./lib/handleNames";


interface RowProps {
  row: (string | number)[];
}

interface SheetProps {
  title: string;
  sheet: (string | number)[][];
}

const Row: React.FC<RowProps> = ({ row }) => {
    return <TableRow>{row.map((cell: string | number, i: number) => (
      <TableCell key={i} className="align-top max-w-96">{cell}</TableCell>
    ))}</TableRow>
};
const HeaderRow: React.FC<RowProps> = ({ row }) => {
  return <TableRow>{row.map((cell: string | number, i: number) => (
    <TableHead key={i} className="align-top">{cell}</TableHead>
  ))}</TableRow>
};

const Page: React.FC<SheetProps> = ({ sheet, title }) => {
  return <Card className="overflow-scroll">
    <CardHeader>
      <CardTitle>{replaceUnderscoresWithSpaces(title)}</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <HeaderRow key={`table-header`} row={sheet[0]} />
        </TableHeader>
        <TableBody>
          {sheet.slice(1).map((row: (string | number)[], i: number) => {
            return <Row key={i} row={row} />
          })}
        </TableBody>

      </Table>
    </CardContent>
  </Card>
}
export default Page;
