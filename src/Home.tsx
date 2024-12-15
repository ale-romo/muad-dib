import Typewriter from "./components/Typewritter";
const text = `Welcome,\n
  This website is your friend.\n
  As your friend, we will help your organization manage risk.\n
  Please check out our resources to enhance your organization's Cybersecurity posture.\n
  If you would like a resource or excel template to be added, please send a friendly email to ________________\n
  -Cybersecurity Risk Management Friend\n
  P.S. This website has some cool lore/stuff in the blog\n\n
  🧿`;


const Home = () => {
  return (
    <div className="flex flex-col gap-20 text-left justify-start h-full p-20">
      <Typewriter text={text} speed={5} />
    </div>
  );
};

export default Home;
