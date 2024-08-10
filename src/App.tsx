import React, { useEffect, useState } from 'react';
import { data } from 'src/lib/content';
import {
  Sheet,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "src/components/ui/sheet"
import { Button } from "src/components/ui/button"
import Home from 'src/Home';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import { replaceUnderscoresWithSpaces } from './lib/handleNames';
import{ Card } from "src/components/ui/card"

type View = string;

const App: React.FC = () => {
  const [view, setView] = useState<View>(() => window.location.hash ? window.location.hash.substring(1) : '');

useEffect(() => {
  const handleHash = () => {
    const hash = window.location.hash.substring(1);
    setView(hash);
  }

  window.addEventListener('hashchange', handleHash);

  return () => window.removeEventListener('hashchange', handleHash);
}, []);

  const navigate = (newView: View) => {
    setView(newView);
    window.location.hash = newView;
  }

  const renderView = () => {
    if (view === '') return <Home />
    switch (data[view][0][1]) {
      case 'A':
        return <Page1 key={view} title={view} sheet={data[view].slice(2)} filters={convertNumbersToStrings(data[view][1][1]).split(', ')} />
      case 'B':
        return <Page2 key={view} title={view} sheet={data[view].slice(1)} />
      case 'C':
        return <Page3 key={view} title={view} sheet={data[view].slice(1)} />
      default:
        <Page1 key={view} title={view} sheet={data[view].slice(2)} filters={convertNumbersToStrings(data[view][1][1]).split(', ')} />
    }
  };

  function convertNumbersToStrings(item: (string | number)) {
      if (typeof item === 'number') {
        return item.toString();
      }
      return item;
  }

  return (
    <div className="h-svh overflow:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">Open</Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Muad'Dib</SheetTitle>
              <SheetDescription>
                Access the forbidden knowledge
              </SheetDescription>
            </SheetHeader>
            <nav>
              <SheetClose asChild>
                <Button onClick={() => navigate('')}>Home</Button>
              </SheetClose>
              {Object.entries(data).map(([key]) =>
                <SheetClose key={key} asChild>
                  <Button onClick={() => navigate(key)}>{replaceUnderscoresWithSpaces(key)}</Button>
                </SheetClose>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <main className="flex gap-5 p-5 h-full overflow-hidden">
          <nav className="hidden md:flex items-stretch flex-col gap-5">
            <Button onClick={() => navigate('')}>Home</Button>
            {Object.entries(data).map(([key]) =>
              <Button key={key} onClick={() => navigate(key)}>{replaceUnderscoresWithSpaces(key)}</Button>
            )}
          </nav>
        <Card className="flex flex-col h-full w-full">{renderView()}</Card>
      </main>
    </div>
  );
};

export default App;
