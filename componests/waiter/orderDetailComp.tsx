'use client';

import { useOrder } from '@/context/OrderContext';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@heroui/react';

interface OrderDetailProps {}

const OrderDetail: React.FC<OrderDetailProps> = () => {
  const { orderItems, removeOrderItem, updateOrderItem, getTotalPrice } = useOrder();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateOrderItem(id, newQuantity);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='font-semibold mb-4 text-lg'>Detalle de la Orden</div>

      {orderItems.length === 0 ? (
        <div className='text-center text-gray-500 py-8'>
          No hay productos en el pedido
        </div>
      ) : (
        <>
          <div className='flex-1 overflow-auto'>
            <Table aria-label='Tabla de productos del pedido'>
              <TableHeader>
                <TableColumn>PRODUCTO</TableColumn>
                <TableColumn>CANTIDAD</TableColumn>
                <TableColumn>PRECIO UNIT.</TableColumn>
                <TableColumn>TOTAL</TableColumn>
                <TableColumn>ACCIONES</TableColumn>
              </TableHeader>
              <TableBody>
                {orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className='flex flex-col'>
                        <span className='font-semibold'>{item.description}</span>
                        {item.details?.sauces && (
                          <span className='text-xs text-gray-500'>
                            Salsas: {item.details.sauces.join(', ')}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Button
                          isIconOnly
                          size='sm'
                          variant='flat'
                          onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className='min-w-[30px] text-center'>{item.quantity}</span>
                        <Button
                          isIconOnly
                          size='sm'
                          variant='flat'
                          onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>Bs. {item.price.toFixed(2)}</TableCell>
                    <TableCell>Bs. {(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        size='sm'
                        color='danger'
                        variant='light'
                        onPress={() => removeOrderItem(item.id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className='mt-4 pt-4 border-t'>
            <div className='flex justify-between items-center font-bold text-lg'>
              <span>TOTAL:</span>
              <span>Bs. {getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;