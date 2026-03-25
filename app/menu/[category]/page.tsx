import MenuEntry from "@/components/menu/MenuEntry";
import Products from "@/data/Products";

interface PageProps {
  params: Promise<{ category: string }>;
}

const CategoryPage = async ({ params }: PageProps) => {
  const { category } = await params;

  const categoryMap: Record<string, string> = {
    sweet: "SWEET",
    savory: "SAVORY",
    "pies-and-danishes": "PIES & DANISHES",
    "loaves-and-rolls": "LOAVES & ROLLS",
  };

  const activeCategory = categoryMap[category];

  return <MenuEntry items={Products} activeCategory={activeCategory} />;
};

export default CategoryPage;
