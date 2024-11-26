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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";
import Fuse from 'fuse.js';
import CollapsibleMDText from "./lib/CollapsibleMDText";
import { updateQueryParams } from "./lib/utils";

const generateArrayOfIdentifiers = (identifiers: string): string[] => {
  const regex = /[A-Z]{1,2}-\d{1,2}\b/g;
  const resultsArray = identifiers.match(regex);
  return resultsArray ?? [''];
}

interface PageProps {
  title: string;
  sheet: string[][];
  filters?: string[];
}

const Page1: React.FC<PageProps> = ({ sheet, title, filters }) => {

  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<string[][]>(sheet);
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [dialogContent, setDialogContent] = useState<string>('');
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const closeDialog = () => {
    setDialogIsOpen(false);
  };

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
              // onClick={() => scrollToSelectedIdentifier(`#${item}`)}
              onClick={() => {
                setDialogContent(item);
                setDialogIsOpen(true);
              }}
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

  const getDialogContent = (identifier: string) => {
    const content = sheet.find(row => row[0] === identifier);

    return content ? (
      <div className="flex flex-col gap-2">
        {content.slice(0, -1).map((cell, i) => <div key={cell}>
          <label className="text-sm text-muted-foreground">{sheet[0][i]}</label>
          <p>{cell}<br /></p>
        </div>)}

      </div>
    ) : (
      <div></div>
    );
  };
  // TODO: add debounce to make search more efficient

  const fuse = new Fuse(sheet.slice(1), {
    keys: Array.from({ length: sheet[0].length }, (_, i) => `${i}`).filter(i => i !== '4'),
    threshold: 0.2,
    includeScore: true,
    shouldSort: false,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
    updateQueryParams({ search: query });
  };

  const handleFilter = (filter: string) => {
    const newFilter = filter === activeFilter ? '' : filter;
    setActiveFilter(newFilter);
    updateQueryParams({ filter: newFilter });
  };

  useEffect(() => {
    // Check for query params and set it as filter and query
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const filterParam = params.get('filter');
    const searchParam = params.get('search');

    if (filterParam && filterParam !== activeFilter) setActiveFilter(filterParam);
    if (searchParam) setQuery(searchParam);

    // Filter by Query
    let searchResults = query ? fuse.search(query).map(result => result.item) : sheet.slice(1);

    // Filter by Filter
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
        {filters?.length ? <ToggleGroup type="single" variant="outline" value={activeFilter}>
          {filters.map(filter => (
            filter.length ? <ToggleGroupItem
              onClick={() => handleFilter(filter)}
              key={filter}
              value={filter}

              aria-label={`Filter ${filter}`}
            >
              {filter}
            </ToggleGroupItem> : ''
          ))}
          <ToggleGroupItem
            onClick={() => handleFilter('')}
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
              // let filters = [''];
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
                  </TableCell>
                })}</TableRow>
              })}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={dialogIsOpen} onOpenChange={closeDialog}>
      <DialogContent aria-describedby={undefined} className="max-h-[80vh] overflow-hidden max-w-4xl">
        <DialogHeader className="sticky top-0">
          <DialogTitle>{}</DialogTitle>
        </DialogHeader>
        <div className="overflow-scroll max-h-[calc(80vh-80px)]">
          {getDialogContent(dialogContent)}
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default Page1;
