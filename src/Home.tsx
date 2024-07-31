import content from './lib/content'

// const Row = (row) => {
//   return <>{Object.keys(row).map(([key, value]) => {
//     <div>{key}: {value}</div>
//   }) }</>
// }

// const Sheet = (sheet) => {
//   return <ul>{Object.keys(sheet).map(([key, value],i) =>  {
//     return <Row>
//   })}</ul>
// }

const Home = () => {
  console.log()
  return <h2 className="text-red-500">
    Home Page
    {content.Sheet1[0].Type_1}
    {/* {Object.keys(content).map(([key, value],i) =>  <Sheet key={`sheets-${i}`} sheet={value} />)} */}
  </h2>;
};

export default Home;
