import { useState } from 'react';
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

const SectionTitle = ({ children }: { children: React.ReactNode, top?: number }) => <h2  className="text-lg font-bold p-5 z-10 sticky bg-white top-0">{children}</h2>

const scrollToSection =  (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
}

const Page5: React.FC<AiRmfProps> = (props) => {
  const [currentSteps, setCurrentSteps] = useState<number[]>([3]);

  return <Tabs defaultValue={Object.keys(props)[0]} className="h-full grid grid-rows-[auto,1fr]">
    <TabsList className="grid grid-cols-4 m-5">
      {Object.entries(props).map(([key]) => (
        <TabsTrigger key={`menu-${key}`} value={key}>{key}</TabsTrigger>
      ))}
    </TabsList>
    <div className="overflow-hidden">
      {Object.entries(props).map(([key, sections]) => (
        <TabsContent value={key} key={`content-${key}`} className="h-full">
          <div className="flex flex-col h-full">
            <div className="gap-3 flex justify-end items-center top-0 bg-white mx-5">
              <label>{key}:</label>
              {sections.map((section, i) => <Button key={`${section.title}-${i}`} variant="outline" onClick={() => scrollToSection(`#${section.title}`)}>{i+1}</Button>)}
              <Button variant={currentSteps[0] === 3 ? 'secondary' : 'outline'} onClick={() => setCurrentSteps([3])}>Overview</Button>
              <Button variant={currentSteps[0] === 4 ? 'secondary' : 'outline'} onClick={() => setCurrentSteps([4, 5])}>Tasks</Button>
              <Button variant={currentSteps[0] === 6 ? 'secondary' : 'outline'} onClick={() => setCurrentSteps([6])}>References</Button>
              <Button asChild>
                <a href="worksheets" target="_blank">Download Worksheet</a>
              </Button>
            </div>
            <div className="flex-grow overflow-y-scroll">
              {sections.map((section, i) => (
                <Accordion
                  id={section.title}
                  type="multiple"
                  key={`overview-${i}`}
                  defaultValue={['overview-steps-0-0']}
                >
                  <SectionTitle>{section.title}:<br /> <span className="text-base text-">{section.description}</span></SectionTitle>
                  {section.steps.map((step, j) => (
                    <AccordionItem value={`overview-steps-${i}-${j}`} key={`overview-steps-${i}-${j}`} className="[&:nth-child(odd)]:bg-gray-100/50 p-5">
                      <AccordionTrigger className="text-left">
                        <div>
                          <MdText className="text-sm font-bold mb-2">{`${step[2]}`}</MdText>

                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex gap-10">
                        <div className="">
                        {currentSteps.map(currentStep => <div key={`step-${currentStep}`}><MdText className="text-xs mb-2 text-gray-500">{`${step[0]} | ${step[1]}`}</MdText><MdText>{step[currentStep]}</MdText></div>)}
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
}

export default Page5;
