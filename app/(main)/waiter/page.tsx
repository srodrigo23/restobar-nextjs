'use client';

import ProductsComp from '@/componests/waiter/productsComp';
import OrderDrawer from '@/componests/waiter/orderDrawer';
import { OrderProvider, useOrder } from '@/context/OrderContext';
// import { Button, Badge } from '@heroui/react';
import { useState } from 'react';

const WaiterPageContent = () => {
  const { 
    clearOrder, 
    // orderItems, 
    // getTotalPrice 
  } = useOrder();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleReset = () => {
    clearOrder();
  };

  const handleConfirmOrder = () => {
    // Lógica para confirmar el pedido
    console.log('Pedido confirmado');
    // Aquí podrías enviar el pedido al backend
  };

  // const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className='h-[calc(100vh-64px)] w-full p-2 overflow-auto pb-24'>
        <ProductsComp />
      </div>

      {/* Botón flotante para ver el pedido */}
      {/* <div className='fixed bottom-4 right-4 z-50'>
        <Badge
          content={totalItems}
          color='danger'
          isInvisible={totalItems === 0}
          showOutline={false}
          size='lg'
        >
          <Button
            color='success'
            size='lg'
            className='font-bold shadow-lg px-6 py-6'
            onPress={() => setIsDrawerOpen(true)}
          >
            <div className='flex items-center '>
              <span className='text-2xl'>🛒</span>
              <span className='text-xs mt-1'>Ver Pedido</span>
              {getTotalPrice() > 0 && (
                <span className='text-xs font-bold'>
                  Bs. {getTotalPrice().toFixed(2)}
                </span>
              )}
            </div>
          </Button>
        </Badge>
      </div> */}

      {/* Drawer/Modal del pedido */}
      <OrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onConfirmOrder={handleConfirmOrder}
        onResetOrder={handleReset}
      />
    </>
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
