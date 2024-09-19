import { useRef, useState, useEffect } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs";
import MdText from "src/lib/MdText";

interface AiRmfProps {
  [key: string]: {
    title: string;
    steps: string[][];
  }[];
}

const Page4: React.FC<AiRmfProps> = (props) => {
  const containerHeightRef = useRef<HTMLDivElement | null>(null);
  const menuHeightRef = useRef<HTMLDivElement | null>(null);
  const submenuHeightRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (containerHeightRef?.current?.clientHeight && menuHeightRef?.current?.clientHeight && submenuHeightRef?.current?.clientHeight) {

      setContentHeight(containerHeightRef.current.clientHeight - menuHeightRef.current.clientHeight - submenuHeightRef.current.clientHeight -10);
    }
  }, []);

  const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2  className="text-lg font-bold mb-6 pb-2 sticky top-0 bg-white">{children}</h2>

  return <Tabs defaultValue={Object.keys(props)[0]} className="m-5 overflow-hidden h-full" ref={containerHeightRef}>
    <TabsList className="grid w-full grid-cols-2" ref={menuHeightRef}>
      {Object.entries(props).map(([key]) => (
        <TabsTrigger key={`menu-${key}`} value={key}>{key}</TabsTrigger>
      ))}
    </TabsList>
    {Object.entries(props).map(([key, sections]) => (
      <TabsContent value={key} key={`content-${key}`}>
        <Tabs defaultValue="overview">
          <TabsList ref={submenuHeightRef}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="worksheet">WorkSheet</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <div className="h-screen overflow-scroll" style={{ height: contentHeight }}>
            <TabsContent value="overview" className="">
              {sections.map((section, index) => (
                <div key={`overview-${index}`}>
                  <SectionTitle>{section.title}</SectionTitle>
                  {section.steps.map((step, i) => (
                    <div key={`overview-steps-${i}`} className="mb-10 [&:nth-child(odd)]:bg-red-100 p-5">
                      <MdText className="text-xs text-gray-500" text={step[0]} />
                      <MdText className="text-xs font-bold mb-2 text-gray-500" text={step[1]} />
                      <MdText className="text-sm font-bold mb-2" text={step[2]} />
                      <MdText text={step[30]} />
                    </div>
                  ))}
                </div>
              ))}
            </TabsContent>
            <TabsContent value="worksheet">
              {sections.map((section, index) => (
                <div key={`worksheets-${index}`}>
                  <SectionTitle>{section.title}</SectionTitle>
                  {section.steps.map((step, i) => (
                    <div key={`worksheets-steps-${i}`} className="[&>div>ul]:list-none [&>div>ul]:gap-0 [&>div>ul>li:nth-child(odd)]:bg-red-500/10 [&>div>ul]:-mx-5 [&>div>ul>li]:px-12 [&>div>ul>li]:py-4 [&>div>ul>li]:list-inside mb-10 [&:nth-child(odd)]:bg-red-100 p-5 [&>div>h2]:text-lg [&>div>h2]:pb-5">
                      <MdText className="text-xs text-gray-500" text={step[0]} />
                      <MdText className="text-xs font-bold mb-2 text-gray-500" text={step[1]} />
                      <MdText className="text-sm font-bold mb-2" text={step[2]} />
                      <MdText text={step[4]} />
                      <MdText text={step[5]} />
                    </div>
                  ))}
                </div>
              ))}
            </TabsContent>
            <TabsContent value="resources">
              {sections.map((section, index) => (
                <div key={`resources-${index}`}>
                  <SectionTitle>{section.title}</SectionTitle>
                  {section.steps.map((step, i) => (
                    <div key={`resources-steps-${i}`} className="mb-10 [&:nth-child(odd)]:bg-red-100 p-5">
                      <MdText className="text-xs text-gray-500" text={step[0]} />
                      <MdText className="text-xs font-bold mb-2 text-gray-500" text={step[1]} />
                      <MdText className="text-sm font-bold mb-2" text={step[2]} />
                      <MdText text={step[6]} />
                    </div>
                  ))}
                </div>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </TabsContent>
    ))}
  </Tabs>
}

export default Page4;
