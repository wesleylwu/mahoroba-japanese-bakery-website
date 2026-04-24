import MenuEntry from "@/src/components/menu/MenuEntry";
import Header from "@/src/components/Header";

const Menu = async () => {
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

      <MenuEntry items={products} activeCategory="all" />
    </>
  );
};

export default Menu;
