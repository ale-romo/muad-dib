// NIST-AI-800-218A

import { useRef, useState, useEffect } from "react";
import {
  CardHeader,
  CardTitle,
  CardContent,
} from "src/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "src/components/ui/table"
interface SheetProps {
  title: string;
  sheet: string[][];
}
import { replaceUnderscoresWithSpaces } from "./lib/handleNames";
import CollapsibleMDText from "./lib/CollapsibleMDText";

// Reorganize nested data

function countEmptySpacesBelow(matrix: string[][], row: number, col: number): number {
  // Check if the initial cell is within bounds
  if (row < 0 || col < 0 || row >= matrix.length || col >= matrix[0].length) {
    throw new Error("Invalid cell coordinates.");
  }

  // Initialize the count of empty spaces
  let count = 1;

  // Start from the cell below the specified cell
  let currentRow = row + 1;

  // Iterate downwards in the same column
  while (currentRow < matrix.length) {
    if (matrix[currentRow][col] === '') {
      count++;
    } else {
      break; // Stop counting as soon as a non-empty cell is encountered
    }
    currentRow++;
  }

  return count;
}



const Page3: React.FC<SheetProps> = ({ sheet, title }) => {
  const tableHeaderRef = useRef<HTMLTableSectionElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (tableHeaderRef?.current?.clientHeight) setHeaderHeight(tableHeaderRef.current.clientHeight)
  }, []);

  return <>
    <CardHeader>
        <CardTitle>{replaceUnderscoresWithSpaces(title)}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-10 max-h-full overflow-hidden">
        <Table>
          <TableHeader ref={tableHeaderRef} className="top-0 sticky bg-white">
            <TableRow>
              {sheet[0].map((cell: string, i: number) => (
                <TableHead
                  key={i}
                  className="align-top"
                >
                  {cell}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
          {sheet.slice(1).map((row, i:number) => (
            <TableRow key={`row-${i}`} className={`${row[0].includes('sticky') ? 'sticky bg-secondary' : ''}`} style={{ top: headerHeight - 2}}>
              {row.map((cell, j:number) => {
                let styledCell = cell.replace(/\bsticky\b\s*/g, '');
                if (cell === 'x') styledCell = '';
                return <TableCell
                  key={`cell-${i}-${j}`}
                  className="align-top"
                  rowSpan={cell.length > 0 ? countEmptySpacesBelow(sheet, i, j) : 1}
                  ><CollapsibleMDText text={styledCell} /></TableCell>;

              })}
            </TableRow>)
          )}
          </TableBody>
        </Table>
      </CardContent>
  </>
}

export default Page3;
