import React, { useState, useContext, useEffect } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import OrderModal from "./NewOrderForm";
import { IOrder } from "../@types/order";
import { SelectedContext } from "../Contexts/SelectedContext";
import { OrderContext } from "../Contexts/OrderContext";

export default function Actions() {
  const { selectedItems, setSelectedItems } = useContext(SelectedContext);
  const { orderItems, setOrders } = useContext(OrderContext);
  const [showModal, setShowModal] = useState(false);
  const [customerFilter, setCustomerFilter] = useState("");
  const [orderTypeFilter, setOrderTypeFilter] = useState("Order Type");

  useEffect(() => {
    fetchAndSortType();
  }, [orderTypeFilter]);

  async function fetchOrders() {
    const response = await fetch("http://localhost:5108/api/Order");
    const data = await response.json();
    setOrders(data);
  }

  const handleCustomerFilter = () => {
    const newOrders = orderItems.filter((order: IOrder) =>
      order.customerName?.toLowerCase().startsWith(customerFilter.toLowerCase())
    );
    setOrders(newOrders);
  };

  const handleCreateOrder = () => {
    setShowModal(true);
  };

  const handleDeleteOrder = async () => {
    const toDelete = selectedItems;
    console.log("ids", toDelete);
    for await (const order of toDelete) {
      await deleteOrder(order);
    }
    fetchOrders();
  };

  async function deleteOrder(order: string): Promise<any> {
    try {
      const response = await fetch(`http://localhost:5108/api/Order/${order}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      const data = await response.json();
      console.log("resonse", data);
      return data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  const handleCustomerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerFilter(event.target.value);
  };

  const handleOrderTypeChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newOrderType = await event.target.value;
    setOrderTypeFilter(newOrderType);
  };

  async function fetchAndSortType() {
    const response = await fetch("http://localhost:5108/api/Order");
    const data = await response.json();
    const sortedData = await sortType(data);
    setOrders(sortedData);
  }

  function sortType(data: IOrder[]) {
    if (orderTypeFilter === "Order Type") return data;
    else {
      const sortedItems = data.filter(
        (order: IOrder) => order.orderType === orderTypeFilter
      );
      return sortedItems;
    }
  }

  const handleShowAll = () => {
    fetchOrders();
    setCustomerFilter("");
    setOrderTypeFilter("Order Type");
  };

  return (
    <div className="container">
      <div className="row py-3">
        <div className="col-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Customer Search"
              value={customerFilter}
              onChange={handleCustomerSearch}
              aria-label="Customer Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <span className="input-group-btn" id="basic-addon2">
                <Button className="btn-danger" onClick={handleCustomerFilter}>
                  Search
                </Button>
              </span>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <Button className="btn-danger" onClick={handleCreateOrder}>
            Create Order
          </Button>
        </div>
        <div className="col-sm">
          <Button className="btn-danger" onClick={handleDeleteOrder}>
            Delete Selected
          </Button>
        </div>
        <div className="col-sm">
          <select
            className="form-select"
            aria-label="Select Oder Type"
            value={orderTypeFilter}
            onChange={handleOrderTypeChange}
          >
            <option selected>Order Type</option>
            <option value="Sale Order">Sale Order</option>
            <option value="Standard Order">Standard Order</option>
            <option value="Purchase Order">Purchase Order</option>
            <option value="Transfer Order">Transfer Order</option>
            <option value="Return Order">Return Order</option>
          </select>
        </div>
        <div className="col-sm">
          <Button className="btn-danger" onClick={handleShowAll}>
            Show All
          </Button>
        </div>
        <div>
          <OrderModal show={showModal} setShow={setShowModal} />
        </div>
      </div>
    </div>
  );
}
