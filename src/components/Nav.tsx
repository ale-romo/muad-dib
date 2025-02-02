import { Themes, View } from 'src/App';
import { DataType } from 'src/lib/content';
import { replaceUnderscoresWithSpaces } from '../lib/handleNames';
import { Button } from './ui/button';
import NavTitle from './ui/NavTitle';
import {
  ToggleGroup,
  ToggleGroupItem,
} from 'src/components/ui/toggle-group';
import Jiggle from './ui/Jiggle';
interface Props {
  navigate: (newView: View) => void;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
  theme: string;
  data: DataType;
}

const Nav = ({ navigate, setTheme, theme, data }: Props) => <nav className="flex items-stretch flex-col gap-1">
  <Jiggle>
    <Button onClick={() => navigate('')}>Home</Button>
  </Jiggle>
  <NavTitle>Auditing & Incident Report</NavTitle>
  {Object.entries(data).map(([key], i) => {
    return <span key={key} className="w-full flex flex-col">
      {i === 4 && <NavTitle>Publications & Frameworks</NavTitle>}
      {i === 6 &&
        <>
          <Jiggle>
            <Button onClick={() => navigate('AI_RMF')} className="w-full">NIST AI RMF</Button>
          </Jiggle>
          <NavTitle>Helpful</NavTitle>
        </>
      }
      <Jiggle>
        <Button key={key} onClick={() => navigate(key)}>{replaceUnderscoresWithSpaces(key)}</Button>
      </Jiggle>
    </span>
  })}
  <NavTitle>Community</NavTitle>
  <Jiggle>
    <Button onClick={() => navigate('blog')}>Blog</Button>
  </Jiggle>
  <ToggleGroup type="single" variant="outline" value={theme}>
    <ToggleGroupItem onClick={() => setTheme('dark')} value="dark">
      D
    </ToggleGroupItem>
    <ToggleGroupItem onClick={() => setTheme('light')} value="light" className={`dark:text-foreground`}>
      L
    </ToggleGroupItem>
  </ToggleGroup>
</nav>

export default Nav;
