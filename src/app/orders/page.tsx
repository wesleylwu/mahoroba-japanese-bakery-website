import Header from "@/src/components/Header";
import OrdersPage from "@/src/components/orders/OrdersPage";
const Orders = () => {
  return (
    <>
      <Header>
        Orders
        <br />
        注文履歴
      </Header>
      <OrdersPage />
    </>
  );
};

export default Orders;
