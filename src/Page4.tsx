import { useState, useEffect} from 'react';
import { Button } from "src/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs";
import MdText from "src/lib/MdText";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/components/ui/accordion";
import { AiRmfProps } from './lib/ai-rmf-content';
import Worksheet from "src/components/Worksheet";
import { updateQueryParams, checkParam } from './lib/utils';

const SectionTitle = ({ children }: { children: React.ReactNode, top?: number }) => <h2  className="text-lg font-bold p-5 z-10 sticky top-0 bg-white dark:bg-black">{children}</h2>

const scrollToSection =  (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
}

const Page4: React.FC<AiRmfProps> = (props) => {
  const [CatId, setCatId] = useState<number[]>([3]);
  const [sectionParam, setSectionParam] = useState<string>('');
  const [subsection, setSubsection] = useState<string>('');

  const worksheetContent = [
    "title 1",
    "title 2",
    "title 3",
  ]

  const updateSection = (newTab: string, options: string[]) => {
    const param = checkParam(newTab, options);
    updateQueryParams({'section': param});
    updateQueryParams({'subsection': `${param}-1`});
    setSubsection(`${param}-1`);
    setSectionParam(param);
  }

  const updateSubsection = (title: string) => {
    setSubsection(title);
    updateQueryParams({'subsection': title});
    scrollToSection(`#${title}`);
  }

  const updateCategory = (newCategory: string, steps: number[]) => {
    setCatId(steps);
    updateQueryParams({'category': newCategory});
  }



  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const sectionParam = params.get('section');
    const categoryParam = params.get('category');
    const subsectionParam = params.get('subsection');

    if (sectionParam) setSectionParam(sectionParam);

    if (subsectionParam) setSubsection(subsectionParam);

    setTimeout(() => {
      scrollToSection(`#${subsectionParam}`);
    }, 1);

    switch (categoryParam) {
      case "Overview": setCatId([3]);
      break;
      case "Tasks": setCatId([4, 5]);
      break;
      case "References": setCatId([6]);
      break;
      default: setCatId([3]);
    }
  },[]);

  return (
    <Tabs
      value={checkParam(sectionParam, Object.keys(props)) || Object.keys(props)[0]}
      className="h-full grid grid-rows-[auto,1fr]"
      onValueChange={newTab => updateSection(newTab, Object.keys(props))}
    >
      <TabsList className="grid grid-cols-4 m-5">
        {Object.entries(props).map(([key]) => (
          <TabsTrigger key={`menu-${key}`} value={key}>{key}</TabsTrigger>
        ))}
      </TabsList>
      <div className="overflow-hidden">
        {Object.entries(props).map(([key, steps]) => (
          <TabsContent value={key} key={`content-${key}`} className="h-full">
            <div className="flex flex-col h-full">
              <div className="gap-3 flex justify-end items-center top-0 mx-5">
                <label>{key}:</label>
                {steps.map((step, i) => (
                  <Button key={`${step.title}`} variant={subsection === step.title ? "secondary" : "outline"} onClick={() => updateSubsection(step.title)}>{i+1}</Button>
                ))}
                <Button variant={CatId[0] === 3 ? 'secondary' : 'outline'} onClick={() => updateCategory('Overview', [3])}>Overview</Button>
                <Button variant={CatId[0] === 4 ? 'secondary' : 'outline'} onClick={() => updateCategory('Tasks', [4, 5])}>Tasks</Button>
                <Button variant={CatId[0] === 6 ? 'secondary' : 'outline'} onClick={() => updateCategory('References', [6])}>References</Button>
                <Worksheet questions={worksheetContent} />
              </div>
              <div className="flex-grow overflow-y-scroll">
                {steps.map((step, i) => (
                  <Accordion
                    id={step.title}
                    type="single"
                    key={`section-${i}`}
                    defaultValue={`${step.title}-1`}
                  >
                    <SectionTitle>{step.title}:<br /> <span className="text-base">{step.description}</span></SectionTitle>
                    {step.steps.map((substep, j) => (
                      <AccordionItem id={`${step.title}-${j+1}`}  value={`${step.title}-${j+1}`} key={`${step.title}-${j}`} className="[&:nth-child(odd)]:bg-foreground/5 dark:[&:nth-child(odd)]:bg-background/5 p-5">
                        <AccordionTrigger className="text-left">
                          <div>
                            <MdText className="text-sm font-bold mb-2" text={substep[2]} />
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex gap-10">
                          <div>
                          <MdText className="text-xs mb-2 text-gray-500" text={`${substep[0]} | ${substep[1]}`} />
                          {CatId.map(CatId => <div key={`step-${CatId}`}>
                              <MdText text={substep[CatId]} />
                            </div>)}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}

export default Page4;
