import Carousel from "@/components/home/Carousel";
import CarouselPhotos from "@/data/CarouselPhotos";
import Header from "@/components/home/Header";
import Menu from "@/components/home/Menu";
import OurDailyPromise from "@/components/home/OurDailyPromise";

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
