import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { OrderContext } from "../Contexts/OrderContext";
import { IOrder } from "../@types/order";
import Modal from "react-bootstrap/Modal";

interface Props {
    show: boolean;
    setShow: (value: boolean) => void;
  }

export default function NewOrderForm({ show, setShow }: Props) {
  const [createdBy, setCreatedBy] = useState("");
  const [orderType, setOrderType] = useState("");
  const [customer, setCustomer] = useState("");

  const { orderItems, setOrders } = useContext(OrderContext);

  const handleClose = () => {
    setCreatedBy("");
    setOrderType("");
    setCustomer("");
    setShow(false);
  }

  const handleSave = () => {
    setShow(false);
  }

  const handleSubmit = async () => {
    console.log(createdBy);
    console.log(orderType);
    console.log(customer);
    const newOrder: Omit<IOrder, "orderId" | "createdDate"> = {
      orderType: orderType,
      customerName: customer,
      createdByUsername: createdBy,
    };
    console.log(typeof newOrder.orderType);
    console.log(JSON.stringify(newOrder));
    try {
      console.log("big", orderItems);
      const response = await fetch("http://localhost:5108/api/Order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      const data = await response.json();
      console.log("resonse", data);
      setOrders([...orderItems, data]);
      handleClose();
      setCreatedBy("");
      setOrderType("");
      setCustomer("");
      return data;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Created By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={createdBy}
                onChange={(event) => setCreatedBy(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Order Type</label>
              <select
                className="form-control"
                value={orderType}
                onChange={(event) => setOrderType(event.target.value)}
              >
                <option value={'Sale Order'}>Sale Order</option>
                <option value={'Standard Order'}>Standard Order</option>
                <option value={'Purchase Order'}>Purchase Order</option>
                <option value={'Transfer Order'}>Transfer Order</option>
                <option value={'Return Order'}>Return Order</option>
              </select>
            </div>
            <div className="form-group">
              <label>Customer Name</label>
              <textarea
                className="form-control"
                rows={3}
                value={customer}
                onChange={(event) => setCustomer(event.target.value)}
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn btn-danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" className="btn btn-warning" onClick={handleSave}>
            Save & Exit
          </Button>
          <Button variant="tertiary" className="btn btn-success" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
