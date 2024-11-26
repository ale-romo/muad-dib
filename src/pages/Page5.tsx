import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs";
import { BlogProps } from "src/content/blog-content";
import MdText from "src/lib/MdText";
import { updateQueryParams, checkParam } from '../lib/utils'

const getCategoriesAndSubcategories = (steps: string[][]) => {
  // Use a Set to keep categories and subcategories unique
  const categories = new Set<string>();
  const subcategories: { [category: string]: Set<string> } = {};

  steps.forEach(([category, subcategory]) => {
    // Add category to Set
    categories.add(category);

    // Initialize the subcategory set for each category if not exists
    if (!subcategories[category]) {
      subcategories[category] = new Set<string>();
    }

    // Add subcategory to the category-specific Set
    subcategories[category].add(subcategory);
  });

  return { categories: Array.from(categories), subcategories };
};

function getDate(serialDate: string) {
    const dateNumber = Number(serialDate); // Convert to number
    const baseDate = new Date(1900, 0, 1); // January 1, 1900
    const resultDate = new Date(baseDate.getTime() + (dateNumber - 1) * 24 * 60 * 60 * 1000);
    return resultDate.toLocaleDateString();
}

const Page5: React.FC<BlogProps> = (props) => {
  const [section, setSection] = useState<string>('');

  const updateSection = (newTab: string, options: string[]) => {
    const param = checkParam(newTab, options);
    updateQueryParams({'section': param});
    setSection(param);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const sectionParam = params.get('section');
    if(sectionParam) setSection(sectionParam);
  },[]
  );
  return (
    <Tabs
      value={checkParam(section, Object.keys(props)) || Object.keys(props)[0]}
      className="h-full grid grid-rows-[auto,1fr]"
      onValueChange={newTab => updateSection(newTab, Object.keys(props))}
    >
      <TabsList className="grid grid-cols-4 m-5">
        {Object.entries(props).map(([key]) => (
          <TabsTrigger key={`menu-${key}`} value={key}>{key}</TabsTrigger>
        ))}
      </TabsList>
      <div className="overflow-hidden">
        {Object.entries(props).map(([key, posts]) => {
          const { categories, subcategories } = getCategoriesAndSubcategories(posts.slice(1));

          return <TabsContent value={key} key={`content-${key}`} className="h-full">
            <div className="flex flex-col h-full p-5 pt-0">
              <div className="flex gap-5">
                {categories.map((category) => (
                  <div key={category} className="flex gap-4">
                    <h3>{category}</h3>
                    <div className="flex space-x-2">
                      {Array.from(subcategories[category] || []).map((subcategory) => (
                        <button key={subcategory} className="btn-filter">
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-grow overflow-y-scroll">
              {posts
                .slice(1)
                .map((post, index) => (
                  <div className="my-5" key={index}>
                    <h2 className="text-lg font-bold">{post[3]}</h2>
                    <h3 className="text-muted-foreground">{post[0]} / {post[1]}</h3>
                    <h4 className="text-muted-foreground mb-4">{getDate(post[2])}</h4>
                    <MdText text={post[4]} />
                    <hr className="mt-10" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        })}
      </div>
    </Tabs>
  )
}
export default Page5;
