'use client';

import OrderDetail from '@/componests/waiter/orderDetailComp';
import ProductsComp from '@/componests/waiter/productsComp';
import { OrderProvider, useOrder } from '@/context/OrderContext';

import { Button } from '@heroui/react';

const WaiterPageContent = () => {
  const { clearOrder } = useOrder();

  const handleReset = () => {
    clearOrder();
  };

  const handleConfirmOrder = () => {
    // Lógica para confirmar el pedido
    console.log('Pedido confirmado');
  };

  return (
    <div className='h-[calc(100vh-64px)] w-full flex flex-col gap-2 p-2'>
      <div className='flex-1 border p-2 overflow-auto'>
        <ProductsComp />
      </div>
      <div className='flex-1 border p-2 flex flex-col'>
        <div className='flex-1 overflow-auto'>
          <OrderDetail />
        </div>
        <div className='flex flex-col gap-2 mt-4'>
          <Button variant='solid' color='warning' onPress={handleReset}>
            REINICIAR
          </Button>
          <Button variant='solid' color='success' onPress={handleConfirmOrder}>
            CONFIRMAR PEDIDO
          </Button>
        </div>
      </div>
    </div>
  );
};

const WaiterPage = () => {
  return (
    <OrderProvider>
      <WaiterPageContent />
    </OrderProvider>
  );
};

export default WaiterPage;
