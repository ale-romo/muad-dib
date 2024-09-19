import WordByWordAnimation from "./components/WordByWordAnimation";

const Home = () => {
  return (
    <div className="flex flex-col gap-20 text-center">
      <WordByWordAnimation>
          Welcome,<br />
          This website is your <span className="text-green-500">friend.</span><br />
          As your friend, we will help your organization manage <span className="text-green-500">risk.</span><br />
          Please check out our resources to enhance your organization's <span className="text-green-500">Cybersecurity</span> posture.<br />
          If you would like a resource or excel template to be added, please send a friendly email to <span className="text-green-500">__________________</span><br />
          -Cybersecurity Risk Management Friend<br />
          P.S. This website has some cool lore/stuff in the blog<br /><br />
          <p className="text-7xl">🧿</p>
      </WordByWordAnimation>
    </div>
  );
};

export default Home;
