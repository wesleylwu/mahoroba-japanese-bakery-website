import MenuEntry from "@/components/menu/MenuEntry";
import Products from "@/data/Products";

interface PageProps {
  params: Promise<{ category: string }>;
}

const Category = async ({ params }: PageProps) => {
  const { category } = await params;

  const categoryMap: Record<string, string> = {
    sweet: "sweet",
    savory: "savory",
    "pies-danishes": "pies & danishes",
    "loaves-rolls": "loaves & rolls",
  };

  const actualCategory = categoryMap[category] || category;
  const filteredItems = Products.filter(
    (item) => item.category === actualCategory,
  );

  return (
    <>
      <div>
        <p className="capitalize">{actualCategory}</p>
      </div>
      <MenuEntry items={filteredItems} />
    </>
  );
};

export default Category;
