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
  CardContent,
  CardHeader,
  CardTitle,
} from "src/components/ui/card"
import { replaceUnderscoresWithSpaces } from "./lib/handleNames";
import {
  ToggleGroup,
  ToggleGroupItem,
} from 'src/components/ui/toggle-group';
import Fuse from 'fuse.js';
import TruncatedText from "./lib/TruncatedText";

const scrollNavigate = (href: string) => {
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

const ExtractPatterns = (inputString: string) => {
  // Define the regex pattern to match the entire string
  const regex = /[A-Z]{1,2}-\d{1,2}\b/g;

  if (regex.test(inputString)) {
    const matches = inputString.match(regex);

    if (matches) {
      return matches.map((item, i) => {
        return (
          <button
            key={`${i}-${item}`}
            onClick={() => scrollNavigate(`#${item}`)}
            className="mr-2 cursor:pointer underline hover:opacity-60"
          >
            {item.trim()}
          </button>
        );
      });
    }
  }
  // Return an empty array if the string does not match the pattern
  return <TruncatedText text={inputString} />;
}

interface RowProps {
  row: (string | number)[];
}

const Row: React.FC<RowProps> = ({ row }) => {
  return <TableRow>{row.map((cell: string | number, i: number) => (
    <TableCell key={i} className="align-top max-w-96" id={`${i === 0 ? cell : ""}`}>
      {i === 4 ? ExtractPatterns(cell.toString()) : <TruncatedText text={cell} />}
      {i === 4 ?<button>Filter related</button>: ""}
      </TableCell>
  ))}</TableRow>
};

interface HeaderRowProps {
  row: (string | number)[];
  onSort: (index: number) => void;
  sortColumn: number;
  sortDirection: 'asc' | 'desc';
}

const HeaderRow: React.FC<HeaderRowProps> = ({ row, onSort, sortColumn, sortDirection }) => {
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

interface PageProps {
  title: string;
  sheet: (string | number)[][];
  filters?: string[];
}

const Page1: React.FC<PageProps> = ({ sheet, title, filters = [] }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<(string | number)[][]>(sheet);
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeFilter, setActiveFilter] = useState<string>('');

  // TOD: add debounce to make search more efficient

  const fuse = new Fuse(sheet.slice(1), {
    keys: Array.from({ length: sheet[0].length }, (_, i) => `${i}`),
    threshold: 0.3,
    includeScore: true,
    useExtendedSearch: true,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
  }

  const handleFilters = (filter: string) => {
    const newFilter = filter === activeFilter ? '' : filter;
    setActiveFilter(newFilter);
  }

  useEffect(() => {
    let searchResults = query ? fuse.search(query).map(result => result.item).sort((a, b) => sheet.slice(1).indexOf(a) - sheet.slice(1).indexOf(b)) : sheet.slice(1);

    if (activeFilter) {
      searchResults = searchResults.filter(row => row.includes(activeFilter));
    }

    setResults([sheet[0], ...searchResults]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeFilter]);


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
    <>
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
            filter.length ? <ToggleGroupItem
              onClick={() => handleFilters(filter)}
              key={filter}
              value={filter}
              aria-label={`Filter ${filter}`}
            >
              {filter}
            </ToggleGroupItem> : ''
          ))}
        </ToggleGroup>
      </CardHeader>
      <CardContent className="flex gap-10 max-h-full overflow-hidden">
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
    </>
  );
};

export default Page1;
