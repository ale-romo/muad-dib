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
import Page from './Page';
import { replaceUnderscoresWithSpaces } from './lib/handleNames';

type View = string;

const App: React.FC = () => {
  // const [view, setView] = useState<View>(() => {
  //   console.log(window.location.pathname)
  //   return window.location.pathname.slice(1);
  // });
  const [view, setView] = useState<View>(() => window.location.hash.substring(1));

useEffect(() => {
  const handleHash = () => {
    const hash = window.location.hash.substring(1);
    setView(hash);
  }

  window.addEventListener('hashchange', handleHash);

  return () => window.removeEventListener('hashchange', handleHash);
}, []);

  // Listen for popstate events (when the user clicks the back or forward buttons)
  // useEffect(() => {
  //   const handlePopState = () => {
  //     const path = window.location.pathname;
  //     setView(path.slice(1));
  //   };

  //   window.addEventListener('popstate', handlePopState);

  //   return () => {
  //     window.removeEventListener('popstate', handlePopState);
  //   };
  // }, []);

  const navigate = (newView: View) => {
    setView(newView);
    window.location.hash = newView;
  }

  // const navigate = (newView: View) => {
  //   setView(newView);
  //   // Push the new URL to the history stack
  //   const newPath = `/${newView}`;
  //   window.history.pushState({}, '', newPath);
  // };

  const renderView = () => {
    if (view === 'home') return <Home />
    // return <Page key={view} title={view} />
    return <Page key={view} title={view} sheet={data[view]} />
  };

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
                <Button onClick={() => navigate('home')}>Home</Button>
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
            <Button onClick={() => navigate('home')}>Home</Button>
            {Object.entries(data).map(([key]) =>
              <Button key={key} onClick={() => navigate(key)}>{replaceUnderscoresWithSpaces(key)}</Button>
            )}
          </nav>
        {renderView()}
      </main>
    </div>
  );
};

export default App;
