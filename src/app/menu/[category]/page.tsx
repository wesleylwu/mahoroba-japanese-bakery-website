import MenuEntry from "@/src/components/menu/MenuEntry";
import Header from "@/src/components/Header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ category: string }>;
}

const Category = async ({ params }: PageProps) => {
  const { category } = await params;

  let serializedProducts: {
    id: string;
    title: string;
    desc: string;
    price: string;
    img: string;
    catSlug: string;
  }[] = [];

  try {
    const products = await prisma.product.findMany({
      orderBy: { title: "asc" },
    });

    serializedProducts = products.map((p) => ({
      ...p,
      price: p.price.toString(),
    }));
  } catch (err) {
    console.error("Failed to load products from database:", err);
  }

  return (
    <>
      <Header>
        Menu
        <br />
        お品書き
      </Header>
      <MenuEntry items={serializedProducts} activeCategory={category} />
    </>
  );
};

export default Category;
