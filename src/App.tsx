import React, { useEffect, useState } from 'react';
import { data } from 'src/lib/content';
import { aiRmfData, AiRmfProps } from 'src/lib/ai-rmf-content';
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
import Page5 from './Page5';
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

  function reduceAiRmfProps(data: AiRmfProps): string[][] {
    const result: string[][] = [];

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key].forEach(section => {
          section.steps.forEach(step => {
            const title = step[2].toLowerCase().match(/^[a-z]+[-\s]\d+\.\d+/)?.[0].replace(/[-\s]+/g, '_').replace('.', '_') || '';
            const description = step[4];
            result.push([title, description]);
          });
        });
      }
    }

    return result;
  }

  const renderView = () => {
    if (view === '') return <Home />
    if (view === 'AI_RMF') return <Page5 {...aiRmfData} />
    switch (data[view][0][1]) {
      case 'A':
        // SP 800 53 (Consider breaking out own template)
        // Ports
        // ACAS Plugins
        // Event Codes
        // Keyboard Shortcuts

        return <Page1
          key={view}
          title={view}
          sheet={(data[view].slice(2))}
          filters={data[view][1][1].length > 0 ? data[view][1][1].split(', ') : []}
        />
      case 'B':
        // Splunk Queries
        return <Page2
          key={view}
          title={view}
          sheet={data[view].slice(1)}
        />
      case 'C':
        // NIST-AI-800-218A
        return <Page3
          key={view}
          title={view}
          sheet={data[view].slice(1)}
          references={reduceAiRmfProps(aiRmfData)}
        />
      default:
        <Page1 key={view} title={view} sheet={data[view].slice(2)} filters={data[view][1][1].split(', ')} />
    }
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
            <Button onClick={() => navigate('AI_RMF')}>NIST AI RMF</Button>
          </nav>
        <Card className="flex flex-col h-full w-full">{renderView()}</Card>
      </main>
    </div>
  );
};

export default App;
