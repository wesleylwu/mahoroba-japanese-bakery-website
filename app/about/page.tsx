import Header from "@/components/Header";
import WhoWeAre from "@/components/about/WhoWeAre";
import OurStory from "@/components/about/OurStory";
import ThePastries from "@/components/about/ThePastries";

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
