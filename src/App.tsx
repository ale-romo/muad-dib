import React, { useEffect, useState } from 'react';
import { data } from 'src/lib/content';
import { aiRmfData, AiRmfProps } from 'src/lib/ai-rmf-content';
import { blogData } from './content/blog-content';
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
import NotFound from './pages/NotFound';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './pages/Page5';
import Nav from './components/Nav';
import{ Card } from "src/components/ui/card"

export type View = string;
export type Themes = 'light' | 'dark';

const App: React.FC = () => {
  const [view, setView] = useState<View>('');
  const [theme, setTheme] = useState<Themes>('light');

  useEffect(() => {
    const updateStateFromHash = () => {
      const hash = window.location.hash.substring(1);
      const section = hash.match(/^\w+/)?.[0] || '';
      setView(section);
    };

    updateStateFromHash();

    window.addEventListener('hashchange', updateStateFromHash);

    return () => window.removeEventListener('hashchange', updateStateFromHash);
  }, []);

  const navigate = (newView: View) => {
    setView(newView);
    window.location.hash = newView;
  }

  function reduceAiRmfProps(data: AiRmfProps): Map<string, string> {
    const result = new Map<string, string>();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key].forEach(section => {
          section.steps.forEach(step => {
            const title = step[2]
              .toLowerCase()
              .match(/^[a-z]+[-\s]\d+\.\d+/)?.[0]
              .replace(/[-\s]+/g, '_')
              .replace('.', '_') || '';
            const description = step[4];
            if (title) {
              result.set(title, description);
            }
          });
        });
      }
    }

    return result;
  }

  const renderView = () => {
    if (view === '') return <Home />
    if (view === 'AI_RMF') return <Page4 {...aiRmfData} />
    if (view === 'blog') return <Page5 {...blogData} />
    if (!data[view]) return <NotFound />
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
        <Page1
          key={view}
          title={view}
          sheet={data[view].slice(2)}
          filters={data[view][1][1].split(', ')}
        />
    }
  };

  return (
    <div className={`h-svh overflow:hidden font-mono ${theme}`}>
      <Sheet>
        <div className="flex w-full justify-between p-5">
          <h1>Muad'Dib</h1>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">Menu</Button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Muad'Dib</SheetTitle>
            <SheetDescription>
              Access the forbidden knowledge
            </SheetDescription>
            <Nav navigate={navigate} setTheme={setTheme} theme={theme} data={data} />
          </SheetHeader>
          <SheetClose asChild />
        </SheetContent>
      </Sheet>
      <main className="flex gap-5 p-5 pt-0 h-full overflow-hidden dark:bg-black">
        <div className="hidden md:flex">
          <Nav navigate={navigate} setTheme={setTheme} theme={theme} data={data} />
        </div>
        <Card className="flex flex-col w-full justify-start">{renderView()}</Card>
      </main>
    </div>
  );
};

export default App;
