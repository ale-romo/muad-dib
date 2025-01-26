import { Themes, View } from 'src/App';
import { DataType } from 'src/lib/content';
import { replaceUnderscoresWithSpaces } from '../lib/handleNames';
import { Button } from './ui/button';
import NavTitle from './ui/NavTitle';
import {
  ToggleGroup,
  ToggleGroupItem,
} from 'src/components/ui/toggle-group';
import DissolveButton from './svgFilters/DissolveButton';

interface Props {
  navigate: (newView: View) => void;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
  theme: string;
  data: DataType;
}

const Nav = ({ navigate, setTheme, theme, data }: Props) => <nav className="flex items-stretch flex-col gap-1">
  <Button onClick={() => navigate('')}>Home</Button>
  <NavTitle>Auditing & Incident Report</NavTitle>
  {Object.entries(data).map(([key], i) => {

    return <span key={key} className="w-full flex flex-col">
      {i === 4 && <NavTitle>Publications & Frameworks</NavTitle>}
      {i === 6 &&
        <>
          <Button onClick={() => navigate('AI_RMF')} className="w-full">NIST AI RMF</Button>
          <NavTitle>Helpful</NavTitle>
        </>
      }
      <Button key={key} onClick={() => navigate(key)}>{replaceUnderscoresWithSpaces(key)}</Button>
    </span>
  })}
  <NavTitle>Community</NavTitle>
  <Button onClick={() => navigate('blog')}>Blog</Button>
  <ToggleGroup type="single" variant="outline" value={theme}>
    <DissolveButton />
    <ToggleGroupItem onClick={() => setTheme('dark')} value="dark">
      D
    </ToggleGroupItem>
    <ToggleGroupItem onClick={() => setTheme('light')} value="light" className={`dark:text-foreground`}>
      L
    </ToggleGroupItem>
  </ToggleGroup>
</nav>

export default Nav;
