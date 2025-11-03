'use client';

import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import { Checkbox, Button, Badge } from '@heroui/react'; 
import {
  ChickenWingsComp,
  CraftBeerComp,
  SoftDriknsComp,
  DrinksComp,
} from './order';

interface ProductsCompProps {}

const ProductsComp: React.FC<ProductsCompProps> = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex gap-2.5 justify-between m-3'>
        <div className='font-semibold text-2xl text-center'>NUEVO PEDIDO</div>
        <Badge
          // content={totalItems}
          color='danger'
          // isInvisible={totalItems === 0}
          showOutline={false}
          size='lg'
        >
          <Button
            color='success'
            size='sm'
            className='font-semibold'
            // onPress={() => setIsDrawerOpen(true)}
          >
            <div className='flex items-center '>
              {/* <span className='text-2xl'>🛒</span> */}
              <span className='text-xs mt-1'>Ver Pedido</span>
              {/* {getTotalPrice() > 0 && (
                <span className='text-xs font-bold'>
                  Bs. {getTotalPrice().toFixed(2)}
                </span>
              )} */}
            </div>
          </Button>
        </Badge>
      </div>

      <Tabs aria-label='Menu options' className='flex flex-col' size='lg'>
        <Tab key='alitas' title='🍗 Alitas'>
          <Card>
            <CardBody>
              <ChickenWingsComp />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='cerveza' title='🍺 Cerveza'>
          <Card>
            <CardBody>
              <CraftBeerComp />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='soda' title='🥤 Refrescos'>
          <Card>
            <CardBody>
              <SoftDriknsComp />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='drinks' title='🍷 Tragos'>
          <Card>
            <CardBody>
              <DrinksComp />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProductsComp;
