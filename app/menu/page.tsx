import Header from "@/components/Header";
import MenuEntry from "@/components/menu/MenuEntry";
import Products from "@/data/Products";

const Menu = () => {
  return (
    <>
      <Header>
        Menu
        <br />
        お品書き
      </Header>
      <MenuEntry items={Products} />
    </>
  );
};

export default Menu;
