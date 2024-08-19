import {
  CardHeader,
  CardTitle,
  CardContent,
} from "src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "src/components/ui/table"

interface SheetProps {
  title: string;
  sheet: (string | number)[][];
}

import { marked } from 'marked';

// Reorganize nested data

function countEmptySpacesBelow(matrix: (string | number)[][], row: number, col: number): number {
  // Check if the initial cell is within bounds
  if (row < 0 || col < 0 || row >= matrix.length || col >= matrix[0].length) {
    throw new Error("Invalid cell coordinates.");
  }

  // Initialize the count of empty spaces
  let count = 0;

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

  return count + 1;
}



const Page3: React.FC<SheetProps> = ({ sheet, title }) => {
  return <>
    <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-10 max-h-full overflow-hidden">
        <Table>
          <TableBody>
          {sheet.map((item, i:number) => (
            <TableRow key={`row-${i}`}>
              {item.map((cell, j:number) => {
                return cell !== '' ? <TableCell key={`cell-${i}-${j}`} className="align-top" rowSpan={countEmptySpacesBelow(sheet, i, j)} dangerouslySetInnerHTML={{__html:marked(cell.toString()) }} /> : '';

              })}
            </TableRow>)
          )}
          </TableBody>
        </Table>
      </CardContent>
  </>
}

export default Page3;
