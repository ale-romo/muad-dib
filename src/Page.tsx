import { useState, useEffect } from "react";
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
import Fuse from 'fuse.js'


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

const HeaderRow: React.FC<{
  row: (string | number)[];
  onSort: (index: number) => void;
  sortColumn: number;
  sortDirection: 'asc' | 'desc';
}> = ({ row, onSort, sortColumn, sortDirection }) => {
  return (
    <TableRow>
      {row.map((cell: string | number, i: number) => (
        <TableHead
          key={i}
          className="align-top cursor-pointer"
          onClick={() => onSort(i)}
        >
          {cell} {i === sortColumn ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
        </TableHead>
      ))}
    </TableRow>
  );
};

const Page: React.FC<SheetProps> = ({ sheet, title }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<(string | number)[][]>(sheet);
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');


  const fuse = new Fuse(sheet.slice(1), {
    keys: Array.from({ length: sheet[0].length }, (_, i) => `${i}`),
    threshold: 0.3,
    includeScore: true,
    useExtendedSearch: true,
  });

  // Handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
    if (query) {
      const searchResults = fuse.search(query).map(result => result.item);
      setResults([sheet[0], ...searchResults]);
    } else {
      setResults(sheet);
    }
  };

  // Sort data
  const handleSort = (index: number) => {
    const direction = sortColumn === index && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(index);
    setSortDirection(direction);
    const sortedResults = [...results.slice(1)].sort((a, b) => {
      const aValue = a[index];
      const bValue = b[index];
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setResults([results[0], ...sortedResults]);
  };

  // Extract unique values per column
  const logUniqueValues = () => {
    const uniqueValues: { [key: number]: Set<string | number> } = {};

    results.slice(1).forEach(row => {
      row.forEach((value, index) => {
        if (!uniqueValues[index]) uniqueValues[index] = new Set();
        uniqueValues[index].add(value);
      });
    });

    Object.keys(uniqueValues).forEach(columnIndex => {
      console.log(`Column ${parseInt(columnIndex) + 1} Unique Values:`, Array.from(uniqueValues[columnIndex]));
    });
  };

  useEffect(() => {
    logUniqueValues();
  }, [results]);

  return <Card className="overflow-scroll">
    <CardHeader>
      <CardTitle>{replaceUnderscoresWithSpaces(title)}</CardTitle>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        className="mb-4 p-2 border rounded"
      />
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <HeaderRow
            key={`table-header`}
            row={results[0]}
            onSort={handleSort}
            sortColumn={sortColumn ?? -1}
            sortDirection={sortDirection}
            />
        </TableHeader>
        <TableBody>
          {results.slice(1).map((row: (string | number)[], i: number) => {
            return <Row key={i} row={row} />
          })}
        </TableBody>

      </Table>
    </CardContent>
  </Card>
}
export default Page;
