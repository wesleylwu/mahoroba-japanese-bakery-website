import MenuEntry from "@/components/menu/MenuEntry";
import Products from "@/data/Products";

const MenuPage = () => {
  return <MenuEntry items={Products} activeCategory="ALL" />;
};

export default MenuPage;
