import React, { useEffect, useState } from 'react';
import { data } from './lib/content';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./components/ui/sheet"
import { Button } from "./components/ui/button"

import Home from './Home';
import About from './About';

type View = 'home' | 'about';

const App: React.FC = () => {
  const [view, setView] = useState<View>(() => {
    // Determine the initial view based on the URL
    const path = window.location.pathname;
    return path === '/about' ? 'about' : 'home';
  });

  // Listen for popstate events (when the user clicks the back or forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setView(path === '/about' ? 'about' : 'home');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (newView: View) => {
    setView(newView);
    // Push the new URL to the history stack
    const newPath = newView === 'about' ? '/about' : '/';
    window.history.pushState({}, '', newPath);
  };

  const renderView = () => {
    switch (view) {
      case 'about':
        return <About />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent>
            <button onClick={() => navigate('home')}>Home</button>
            <button onClick={() => navigate('about')}>About</button>
          </SheetContent>
        </Sheet>
      </nav>
      {renderView()}
    </div>
  );
};

export default App;
