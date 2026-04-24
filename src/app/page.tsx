import Carousel from "@/src/components/home/Carousel";
import CarouselPhotos from "@/src/data/CarouselPhotos";
import Header from "@/src/components/home/Header";
import Menu from "@/src/components/home/Menu";
import OurDailyPromise from "@/src/components/home/OurDailyPromise";

const Home = () => {
  return (
    <>
      <Carousel photos={CarouselPhotos} />
      <Header />
      <Menu />
      <OurDailyPromise />
    </>
  );
};

export default Home;
