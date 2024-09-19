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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";

interface SheetProps {
  title: string;
  sheet: string[][];
  references: Map<string, string>;
}
import { replaceUnderscoresWithSpaces } from "./lib/handleNames";
import CollapsibleMDText from "./lib/CollapsibleMDText";
import MdText from "./lib/MdText";

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

// Function to parse and render
const parseAndRender = (str: string, setContent: any, setDialog: any) => {
  const result: (string | JSX.Element)[] = [];

  const openDialog = (identifier: string) => {
    setContent(identifier);
    setDialog(true);
  }

  // Define subcategories and regex patterns
  const aiRmfSubcategories = ['Govern', 'Measure', 'Manage', 'Map'];
  const owaspPattern = /OWASP:\s([A-Za-z0-9-]+)/g;
  let hasAiRmf = false;

  // Iterate over AI RMF subcategories
  aiRmfSubcategories.forEach((subcategory) => {
    const regex = new RegExp(`${subcategory}\\s([\\d.,\\s]+)`, 'g');
    const match = regex.exec(str);

    if (match) {
      const numbers = match[1].split(',').map(num => num.trim());
      if (numbers.length > 0) {
        // Add "AI RMF" if there is at least one subcategory with data
        if (!hasAiRmf) {
          result.push('AI RMF: ');
          hasAiRmf = true;
        }

        // Add the subcategory name (without wrapping it in <h4> or other elements)
        result.push(`${subcategory} `);

        // Generate buttons for each number
        numbers.forEach((number) => {
          result.push(
            <button
              className="underline"
              key={`${subcategory}_${number}`}
              onClick={() => openDialog(`${subcategory.toLowerCase()}_${number.replace('.', '_')}`)}
            >
              {number}
            </button>
          );
          result.push(' '); // Add space between buttons
        });
      }
    }
  });

  // OWASP section
  const owaspMatches = [...str.matchAll(owaspPattern)];
  if (owaspMatches.length > 0) {
    result.push('OWASP: ');
    owaspMatches.forEach((match) => {
      const identifier = match[1];
      result.push(
        <button
          className="underline"
          key={`${identifier}`}
          // onClick={() => console.log(`owasp_${identifier.replace('-', '_')}`)}
          onClick={() => openDialog(`${identifier.replace('-', '_')}`)}
        >
          {identifier}
        </button>
      );
      result.push(' '); // Add space between buttons
    });
  }

  return result;
};

const formatPattern = (pattern: string): string => {
  const [prefix, ...numbers] = pattern.split('_');
  return `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} ${numbers.join('.')}`;
};


const Page3: React.FC<SheetProps> = ({ sheet, title, references }) => {
  const tableHeaderRef = useRef<HTMLTableSectionElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [dialogContent, setDialogContent] = useState<string>('');
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const closeDialog = () => {
    setDialogIsOpen(false);
  };

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
                if (j === 4) return <TableCell
                key={`cell-${i}-${j}`}
                className="align-top gap-2"
                rowSpan={cell.length > 0 ? countEmptySpacesBelow(sheet, i, j) : 1}
                >{parseAndRender(cell, setDialogContent, setDialogIsOpen)}</TableCell>;
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
      <Dialog open={dialogIsOpen} onOpenChange={closeDialog}>
  <DialogContent aria-describedby={undefined} className="max-h-[80%] overflow-hidden">
    <DialogHeader className="sticky top-0">
      <DialogTitle>{formatPattern(dialogContent)}</DialogTitle>
    </DialogHeader>
    <div className="overflow-scroll max-h-[calc(80vh-80px)]">
      <MdText text={references.get(dialogContent) || 'TBD'} />
    </div>
  </DialogContent>
</Dialog>
  </>
}

export default Page3;
