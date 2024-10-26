import { useEffect, useState, useRef } from 'react';
import Fuse from 'fuse.js';
import {
  CardHeader,
  CardTitle,
  CardContent,
} from "src/components/ui/card";
import { updateQueryParams } from "./lib/utils";

interface SheetProps {
  sheet: string[][];
  title: string;
}

const Page2: React.FC<SheetProps> = ({ sheet, title }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [query, setQuery] = useState<string>('');
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const addToRefs = (el: HTMLButtonElement) => {
    if (el && !buttonRefs.current.includes(el)) {
      buttonRefs.current.push(el);
    }
  };


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
  };

  const handleCurrentItem = (i: number, title: string) => {
    setCurrentItem(i);
    updateQueryParams({ filter: title });
  };

  useEffect(() => {
    const setCurrentItemByTitle = (title: string) => {
      // Find the index of the item based on the title
      const index = sheet.findIndex(record => record[0] === title);

      if (index !== -1) { // Ensure the item was found
        setCurrentItem(index); // Update the current item index
        updateQueryParams({ filter: title }); // Update the query params with the title
      }
    };

    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const filterParam = params.get('filter');
    if (filterParam) {
      setCurrentItemByTitle(filterParam);
    }
  }, [sheet]);

  useEffect(() => {
    if (buttonRefs.current[currentItem]) {
      buttonRefs.current[currentItem]?.scrollIntoView({
        behavior: 'smooth', // Optional: Adds smooth scrolling
        block: 'nearest', // Aligns the element to the nearest edge
      });
    }
  }, [currentItem]);

  const fuse = new Fuse(sheet, {
    keys: ['0'], // Assuming the search should match the first column (adjust if needed)
    threshold: 0.3,
  });

  const filteredItems = query
    ? fuse.search(query).map(result => result.item)
    : sheet;

  return (
    <>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-10 max-h-full overflow-hidden">
        <div className="flex flex-col max-h-full overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search..."
            className="mb-4 p-2 border rounded"
          />
          <ul className="flex flex-col gap-5 max-h-full overflow-y-scroll">
            {filteredItems.map((record, i) => (
              <li key={`menu-${i}`}>
                <button
                  ref={addToRefs}
                  onClick={() => handleCurrentItem(sheet.indexOf(record), record[0])}
                  className={`${currentItem === sheet.indexOf(record) ? 'font-bold' : ''} text-left`}
                >
                  {record[0]}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <section className="flex flex-col w-2/3 gap-5 max-h-full overflow-y-scroll">
          <h1 className="font-bold">{sheet[currentItem][0]}</h1>
          <p>{sheet[currentItem][1]}</p>
        </section>
      </CardContent>
    </>
  );
};

export default Page2;
