import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../Contexts/OrderContext";
import { SelectedContext } from "../Contexts/SelectedContext";
import { IOrder } from "../@types/order";
import "../App.css";

type Props = {};

export default function OrderTable(props: Props) {
  const OrderState = useContext(OrderContext);
  const { selectedItems, setSelectedItems } = useContext(SelectedContext);
  const [selectAll, setSelectAll] = useState(true);

  const handleSelect = (orderId: string) => {
    setSelectedItems((prevState) => {
      const updatedSelectedItems = new Set(prevState);
      if (updatedSelectedItems.has(orderId)) {
        updatedSelectedItems.delete(orderId);
      } else {
        updatedSelectedItems.add(orderId);
      }
      return updatedSelectedItems;
    });
  };

  const handleSelectAll = async () => {
    await setSelectAll(!selectAll);
    if (selectAll) {
      const selected = new Set<string>(
        OrderState.orderItems.map((order) => order.orderId!)
      );
      setSelectedItems(selected);
    } else {
      setSelectedItems(new Set<string>());
    }
  };

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <th>
          <input
            type="checkbox"
            checked={!selectAll}
            onChange={handleSelectAll}
          />
        </th>
        <th>Order ID</th>
        <th>Creation Date</th>
        <th>Created By</th>
        <th>Order Type</th>
        <th>Customer</th>
      </thead>
      <tbody>
        {OrderState.orderItems.map((order: IOrder) => {
          return (
            <React.Fragment key={order.orderId}>
              <tr key={order.orderId}>
                <th scope="row">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(order.orderId!)}
                    onChange={() => handleSelect(order.orderId!)}
                  />
                </th>
                <td>{order.orderId}</td>
                <td>
                  {order.createdDate
                    ? new Date(order.createdDate).toLocaleDateString("en-US")
                    : ""}
                </td>
                <td>{order.createdByUsername}</td>
                <td>{order.orderType}</td>
                <td>{order.customerName}</td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
