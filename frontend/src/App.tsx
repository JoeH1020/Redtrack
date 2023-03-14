import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import ActionsPanel from "./Components/Actions";
import Header from "./Components/Header";
import NewOrderForm from "./Components/NewOrderForm";
import { OrderContext } from "./Contexts/OrderContext";
import { SelectedContext } from "./Contexts/SelectedContext";
import OrderTable from "./Components/OrderTable";
import { IOrder } from "./@types/order";

function App() {
  const [orderItems, setOrders] = useState<IOrder[]>([]);
  const [selectedItems, setSelectedItems] = useState(new Set<string>());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('in the big usef')
    async function fetchOrders() {
      const response = await fetch("http://localhost:5108/api/Order");
      const data = await response.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log("order items111", orderItems);
  }, [orderItems]);

  return (
    <div className="App">
      <Header />
      <SelectedContext.Provider value={{ selectedItems, setSelectedItems }}>
        <OrderContext.Provider value={{ orderItems, setOrders }}>
          <ActionsPanel />
        </OrderContext.Provider>
      </SelectedContext.Provider>
      <SelectedContext.Provider value={{ selectedItems, setSelectedItems }}>
        <OrderContext.Provider value={{ orderItems, setOrders }}>
          <OrderTable />
        </OrderContext.Provider>
      </SelectedContext.Provider>
      <OrderContext.Provider value={{ orderItems, setOrders }}>
        <NewOrderForm 
        show={showModal}
        setShow={setShowModal}/>
      </OrderContext.Provider>
    </div>
  );
}

export default App;
