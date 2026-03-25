import MenuEntry from "@/src/components/menu/MenuEntry";
import Header from "@/src/components/Header";

interface PageProps {
  params: Promise<{ category: string }>;
}

const Category = async ({ params }: PageProps) => {
  const { category } = await params;

  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <>
      <Header>
        Menu
        <br />
        お品書き
      </Header>
      <MenuEntry items={products} activeCategory={category} />
    </>
  );
};

export default Category;
