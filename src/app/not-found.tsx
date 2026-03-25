import Link from "next/link";

const NotFound = () => {
  return (
    <div className="bg-bakery-cream text-bakery-burgundy font-bakery-noto flex h-screen w-screen flex-col items-center justify-center gap-12 p-4 text-center font-bold">
      <div className="text-3xl leading-snug sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
        404 <br /> Page Not Found
      </div>

      <Link
        href="/"
        className="bg-bakery-burgundy block rounded-full px-8 py-3 text-lg text-white sm:text-xl md:px-12 md:py-4 md:text-2xl lg:px-16 lg:py-6 lg:text-3xl xl:text-4xl 2xl:text-5xl"
      >
        Home
      </Link>
    </div>
  );
};

export default NotFound;
