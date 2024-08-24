import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs"

interface AiRmfProps {
  [key: string]: {
    title: string;
    steps: string[][];
  }[];
}

const Page4: React.FC<AiRmfProps> = (props) => {
  return <Tabs defaultValue={Object.keys(props)[0]} className="p-5">
    <TabsList className="grid w-full grid-cols-2">
      {Object.entries(props).map(([key]) => (
        <TabsTrigger key={key} value={key}>{key}</TabsTrigger>
      ))}
    </TabsList>
      {Object.entries(props).map(([key, sections]) => (
        <TabsContent value={key} key={key}>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="worksheet">WorkSheet</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              {sections.map((section, index) => (
                <>
                  <h3 key={index}>{section.title}</h3>
                  {section.steps.map((step) => (
                    <>
                      <p>{step[0]}</p>
                      <p>{step[1]}</p>
                      <p>{step[2]}</p>
                      <p>{step[3]}</p>
                    </>
                  ))}
                </>
              ))}
            </TabsContent>
            <TabsContent value="worksheet">
              {sections.map((section, index) => (
                <>
                  <h3 key={index}>{section.title}</h3>
                  {section.steps.map((step) => (
                    <>
                      <p>{step[4]}</p>
                      <p>{step[5]}</p>
                    </>
                  ))}
                </>
              ))}
            </TabsContent>
            <TabsContent value="resources">
              {sections.map((section, index) => (
                <>
                  <h3 key={index}>{section.title}</h3>
                  {section.steps.map((step) => (
                    <>
                      <p>{step[6]}</p>
                    </>
                  ))}
                </>
              ))}
            </TabsContent>
          </Tabs>
        </TabsContent>
      ))}
  </Tabs>
}

export default Page4;
