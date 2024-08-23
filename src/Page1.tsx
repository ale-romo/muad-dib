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
import { Toggle } from "./components/ui/toggle";


const scrollToSelectedIdentifier = (href: string) => {
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

const generateArrayOfIdentifiers = (identifiers: string): string[] => {
  const regex = /[A-Z]{1,2}-\d{1,2}\b/g;
  const resultsArray = identifiers.match(regex);
  return resultsArray ?? [''];
}

const GenerateIdentifierLinks = (inputString: string) => {
  // Define the regex pattern to match the entire string
  const regex = /[A-Z]{1,2}-\d{1,2}\b/g;

  if (regex.test(inputString)) {
    const matches = inputString.match(regex);

    if (matches) {
      return matches.map((item, i) => {
        return (
          <button
            key={`${i}-${item}`}
            onClick={() => scrollToSelectedIdentifier(`#${item}`)}
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
  const [activeFilter, setActiveFilter] = useState<string | string[]>('');

  // TOD): add debounce to make search more efficient

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

  const handleStringFilter = (filter: string) => {
    const newFilter = filter === activeFilter ? '' : filter;
    setActiveFilter(newFilter);
  }

  const handleArrayFilter = (filter: string[]) => {
    console.log(JSON.stringify(filter) )
    console.log(JSON.stringify(activeFilter))
    const newFilter = JSON.stringify(filter) === JSON.stringify(activeFilter) ? '' : filter;
    console.log(newFilter)
    setActiveFilter(newFilter);
  }

  useEffect(() => {
    let searchResults = query ? fuse.search(query).map(result => result.item).sort((a, b) => sheet.slice(1).indexOf(a) - sheet.slice(1).indexOf(b)) : sheet.slice(1);

    if (activeFilter) {
      if (Array.isArray(activeFilter)) {
        searchResults = searchResults.filter(row => activeFilter.some(filter => row.includes(filter)));
      } else {
        searchResults = searchResults.filter(row => row.includes(activeFilter));
      }
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
        {filters.length && <ToggleGroup type="single" variant="outline">
          {filters.map(filter => (
            filter.length ? <ToggleGroupItem
              onClick={() => handleStringFilter(filter)}
              key={filter}
              value={filter}
              aria-label={`Filter ${filter}`}
            >
              {filter}
            </ToggleGroupItem> : ''
          ))}
          <ToggleGroupItem
            onClick={() => handleStringFilter('')}
            value=""
            aria-label="Clear all filters"
          >
            Clear all filters
          </ToggleGroupItem>
        </ToggleGroup>}
      </CardHeader>
      <CardContent className="flex gap-10 max-h-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {results[0].map((cell: string | number, i: number) => (
                <TableHead
                  key={i}
                  className="align-top cursor-pointer"
                  onClick={() => handleSort(i)}
                >
                  {cell} {i === sortColumn ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.slice(1).map((row: (string | number)[], i: number) => {
              let rowId = "";
              let filters = [''];
              return <TableRow key={i}>{row.map((cell: string | number, j: number) => {
                if (j === 0) {
                  rowId = cell.toString();
                }
                if (j === 4) {
                  filters = generateArrayOfIdentifiers(`${rowId}, ${cell.toString()}`);
                }
                return <TableCell
                  key={j}
                  className="align-top max-w-96"
                  id={`${j === 0 ? cell : ""}`}
                >
                  {j === 4 ? GenerateIdentifierLinks(cell.toString()) : <TruncatedText text={cell} />}
                  {j === 4 && filters.length > 1 ? <Toggle className="block" onClick={() => handleArrayFilter(filters)}>Filter related</Toggle> : ""}
                  </TableCell>
                })}</TableRow>
              })}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
};

export default Page1;
