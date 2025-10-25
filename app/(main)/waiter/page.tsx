'use client';

import OrderDetail from '@/componests/waiter/orderDetailComp';
import ProductsComp from '@/componests/waiter/productsComp';

import { Button } from '@heroui/react';

interface WaiterPageProps {}

const WaiterPage: React.FC<WaiterPageProps> = () => {
  return (
    <>
      <div className='flex flex-row m-4'>
        <div className='w-1/2'>
          <ProductsComp />
        </div>
        <div className='w-1/2'>
          <OrderDetail />
          <div className='flex flex-col gap-2'>
            <Button variant='solid' color='warning'>
              REINICIAR
            </Button>
            <Button variant='solid' color='success'>
              CONFIRMAR PEDIDO
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaiterPage;
