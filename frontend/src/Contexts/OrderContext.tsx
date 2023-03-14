import React, { useState, useEffect, createContext } from 'react';
import { IOrder } from '../@types/order';

export interface OrderContextProps {
    orderItems: IOrder[];
    setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
  }

export const OrderContext = createContext<OrderContextProps>({
    orderItems: [],
    setOrders: () => {},
  })


