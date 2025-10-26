'use client';

import OrderDetail from '@/componests/waiter/orderDetailComp';
import ProductsComp from '@/componests/waiter/productsComp';

import { Button } from '@heroui/react';

interface WaiterPageProps {}

const WaiterPage: React.FC<WaiterPageProps> = () => {
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
          <Button variant='solid' color='warning'>
            REINICIAR
          </Button>
          <Button variant='solid' color='success'>
            CONFIRMAR PEDIDO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaiterPage;
