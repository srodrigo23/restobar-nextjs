'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IOrderItem } from '@/util/types';

interface OrderContextType {
  orderItems: IOrderItem[];
  addOrderItem: (item: IOrderItem) => void;
  removeOrderItem: (id: string) => void;
  updateOrderItem: (id: string, quantity: number) => void;
  clearOrder: () => void;
  getTotalPrice: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);

  const addOrderItem = (item: IOrderItem) => {
    setOrderItems((prev) => [...prev, item]);
  };

  const removeOrderItem = (id: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateOrderItem = (id: string, quantity: number) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  const getTotalPrice = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        orderItems,
        addOrderItem,
        removeOrderItem,
        updateOrderItem,
        clearOrder,
        getTotalPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
