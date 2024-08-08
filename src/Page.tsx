import { useState } from "react";
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
import {
  ToggleGroup,
  ToggleGroupItem,
} from 'src/components/ui/toggle-group';
import Fuse from 'fuse.js'


interface RowProps {
  row: (string | number)[];
}

interface SheetProps {
  title: string;
  sheet: (string | number)[][];
  filters?: string[];
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

const Page: React.FC<SheetProps> = ({ sheet, title, filters = [] }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<(string | number)[][]>(sheet);
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeFilter, setActiveFilter] = useState<string>('');

  const fuse = new Fuse(sheet.slice(1), {
    keys: Array.from({ length: sheet[0].length }, (_, i) => `${i}`),
    threshold: 0.3,
    includeScore: true,
    useExtendedSearch: true,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
    let searchResults = query ? fuse.search(query).map(result => result.item) : sheet.slice(1);
    if (activeFilter) {
      searchResults = searchResults.filter(row => row.includes(activeFilter));
    }
    setResults([sheet[0], ...searchResults]);
  };

  const handleFilters = (filter: string) => {
    const newFilter = filter === activeFilter ? '' : filter;
    setActiveFilter(newFilter);
    const searchResults = query ? fuse.search(query).map(result => result.item) : sheet.slice(1);
    const filteredResults = newFilter ? searchResults.filter(row => row.includes(newFilter)) : searchResults;
    setResults([sheet[0], ...filteredResults]);
  };

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

  return (
    <Card className="overflow-scroll">
      <CardHeader>
        <CardTitle>{replaceUnderscoresWithSpaces(title)}</CardTitle>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search..."
          className="mb-4 p-2 border rounded"
        />
        <ToggleGroup type="single" variant="outline">
          {filters.map(filter => (
            <ToggleGroupItem
              onClick={() => handleFilters(filter)}
              key={filter}
              value={filter}
              aria-label={`Filter ${filter}`}
            >
              {filter}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
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
  );
};

export default Page;
