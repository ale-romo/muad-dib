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
import CollapsibleMDText from "./lib/CollapsibleMDText";
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
  return <CollapsibleMDText text={inputString} />;
}

interface PageProps {
  title: string;
  sheet: string[][];
  filters?: string[];
}

const Page1: React.FC<PageProps> = ({ sheet, title, filters = [] }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<string[][]>(sheet);
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeFilter, setActiveFilter] = useState<string | string[]>('');

  // TODO: add debounce to make search more efficient

  const fuse = new Fuse(sheet.slice(1), {
    keys: Array.from({ length: sheet[0].length }, (_, i) => `${i}`).filter(i => i !== '4'),
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
    let searchResults;

    // Step 1: Perform the Fuse search if there's a query
    if (query) {
      searchResults = fuse.search(query).map(result => result.item);
    } else {
      searchResults = sheet.slice(1); // If no query, use the full sheet without the header
    }

    // Step 2: Filter based on activeFilter if it's present
    if (activeFilter) {
      if (Array.isArray(activeFilter)) {
        searchResults = searchResults.filter(row => activeFilter.some(filter => row.includes(filter)));
      } else {
        searchResults = searchResults.filter(row => row.includes(activeFilter));
      }
    }

    // Step 3: Sorting helper function to parse and sort by letters, dash number, and parentheses number
    const sortByIdentifier = (a, b) => {
      const parseIdentifier = (str) => {
        const match = str.match(/^([a-zA-Z]+)-(\d+)(?:\((\d+)\))?$/);
        if (match) {
          const [_, letters, mainNumber, parenNumber] = match;
          return {
            letters: letters.toLowerCase(),
            mainNumber: parseInt(mainNumber, 10),
            parenNumber: parenNumber ? parseInt(parenNumber, 10) : null,
          };
        }
        return { letters: str.toLowerCase(), mainNumber: null, parenNumber: null };
      };

      const idA = parseIdentifier(a[0].toString());
      const idB = parseIdentifier(b[0].toString());

      // Compare letters first (e.g., ac, bc)
      if (idA.letters !== idB.letters) {
        return idA.letters.localeCompare(idB.letters);
      }

      // Compare main number (after the dash) (e.g., ac-12 vs ac-2)
      if (idA.mainNumber !== idB.mainNumber) {
        return idA.mainNumber - idB.mainNumber;
      }

      // Compare parentheses number if both have it (e.g., ac-12(1) vs ac-12(2))
      if (idA.parenNumber !== null && idB.parenNumber !== null) {
        return idA.parenNumber - idB.parenNumber;
      }

      // If only one has parentheses number, it comes after the one without it
      if (idA.parenNumber !== null) return 1;
      if (idB.parenNumber !== null) return -1;

      return 0; // If everything is equal
    };

    // Step 4: Reorder results based on query match and identifier sorting
    if (query) {
      const lowerQuery = query.toLowerCase();

      // Exact matches (cells that exactly match the query)
      const exactMatches = searchResults.filter(row =>
        row.some(cell => cell.toString().toLowerCase() === lowerQuery)
      );

      // Starts-with matches (cells that start with the query)
      const startsWithMatches = searchResults.filter(row =>
        !row.some(cell => cell.toString().toLowerCase() === lowerQuery) &&
        row.some(cell => cell.toString().toLowerCase().startsWith(lowerQuery))
      );

      // Sort starts-with matches naturally
      startsWithMatches.sort(sortByIdentifier);

      // Partial matches (don't start with the query)
      const partialMatches = searchResults.filter(row =>
        !row.some(cell => cell.toString().toLowerCase() === lowerQuery) &&
        !row.some(cell => cell.toString().toLowerCase().startsWith(lowerQuery))
      );

      // Sort partial matches naturally
      partialMatches.sort(sortByIdentifier);

      // Combine exact matches, starts-with matches, and partial matches
      searchResults = [...exactMatches, ...startsWithMatches, ...partialMatches];
    }

    // Step 5: Update the results (including the header row)
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
        {filters.length ? <ToggleGroup type="single" variant="outline">
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
        </ToggleGroup> : ''}
      </CardHeader>
      <CardContent className="flex gap-10 max-h-full overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {results[0].map((cell: string, i: number) => (
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
            {results.slice(1).map((row: string[], i: number) => {
              let rowId = "";
              let filters = [''];
              return <TableRow key={i}>{row.map((cell: string, j: number) => {
                if (j === 0) {
                  rowId = cell;
                }
                if (j === 4) {
                  filters = generateArrayOfIdentifiers(`${rowId}, ${cell}`);
                }
                return <TableCell
                  key={j}
                  className="align-top max-w-96"
                  id={`${j === 0 ? cell : ""}`}
                >
                  {j === 4 ? GenerateIdentifierLinks(cell) : <CollapsibleMDText text={cell} />}
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
