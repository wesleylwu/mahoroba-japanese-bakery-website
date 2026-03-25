import Header from "@/src/components/Header";
import WhoWeAre from "@/src/components/about/WhoWeAre";
import OurStory from "@/src/components/about/OurStory";
import ThePastries from "@/src/components/about/ThePastries";

const About = () => {
  return (
    <>
      <Header>
        About
        <br />
        私たちについて
      </Header>{" "}
      <WhoWeAre />
      <OurStory />
      <ThePastries />
    </>
  );
};

export default About;
