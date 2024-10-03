import { useState } from 'react';
import Fuse from 'fuse.js';
import {
  CardHeader,
  CardTitle,
  CardContent,
} from "src/components/ui/card";

interface SheetProps {
  sheet: string[][];
  title: string;
}

const Page2: React.FC<SheetProps> = ({ sheet, title }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [query, setQuery] = useState<string>('');

  const fuse = new Fuse(sheet, {
    keys: ['0'], // Assuming the search should match the first column (adjust if needed)
    threshold: 0.3,
  });

  const filteredItems = query
    ? fuse.search(query).map(result => result.item)
    : sheet;

  return (
    <div className="h-full overflow-hidden mb-5">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-10 max-h-full">
        <div className="flex flex-col max-h-full overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="mb-4 p-2 border rounded"
          />
          <ul className="flex flex-col gap-5 max-h-full overflow-y-scroll">
            {filteredItems.map((record, i) => (
              <li>
                <button
                  onClick={() => setCurrentItem(sheet.indexOf(record))}
                  key={`menu-${i}`}
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
    </div>
  );
};

export default Page2;
