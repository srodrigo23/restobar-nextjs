'use client';

import { useOrder } from '@/context/OrderContext';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/react';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmOrder: () => void;
  onResetOrder: () => void;
}

const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  onConfirmOrder,
  onResetOrder,
}) => {
  const { orderItems, removeOrderItem, updateOrderItem, getTotalPrice } = useOrder();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateOrderItem(id, newQuantity);
    }
  };

  const handleConfirm = () => {
    onConfirmOrder();
    onClose();
  };

  const handleReset = () => {
    onResetOrder();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='full'
      scrollBehavior='inside'
      classNames={{
        wrapper: 'items-end sm:items-center',
        base: 'sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] m-0 sm:m-4',
      }}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          <h2 className='text-2xl font-bold'>Detalle de la Orden</h2>
          {orderItems.length > 0 && (
            <p className='text-sm text-gray-500'>
              {orderItems.length} {orderItems.length === 1 ? 'producto' : 'productos'}
            </p>
          )}
        </ModalHeader>

        <ModalBody>
          {orderItems.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12 text-center'>
              <div className='text-6xl mb-4'>🍽️</div>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                No hay productos en el pedido
              </h3>
              <p className='text-gray-500'>
                Agrega productos desde el menú para comenzar
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              <Table
                aria-label='Tabla de productos del pedido'
                removeWrapper
              >
                <TableHeader>
                  <TableColumn>PRODUCTO</TableColumn>
                  <TableColumn>CANT.</TableColumn>
                  <TableColumn>PRECIO</TableColumn>
                  <TableColumn>TOTAL</TableColumn>
                  <TableColumn width={100}> </TableColumn>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className='flex flex-col py-2'>
                          <span className='font-semibold text-sm'>{item.description}</span>
                          {item.details?.sauces && (
                            <span className='text-xs text-gray-500'>
                              Salsas: {item.details.sauces.join(', ')}
                            </span>
                          )}
                          {item.details?.fries && (
                            <span className='text-xs text-gray-500'>
                              Papas: {item.details.fries === 'medium' ? 'Medianas' : 'Grandes'}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-1'>
                          <Button
                            isIconOnly
                            size='sm'
                            variant='flat'
                            onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className='min-w-[30px] text-center font-semibold'>
                            {item.quantity}
                          </span>
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
                      <TableCell>
                        <span className='text-sm'>Bs. {item.price.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <span className='font-semibold'>
                          Bs. {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </TableCell>
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

              {/* Total */}
              <div className='bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200'>
                <div className='flex justify-between items-center'>
                  <span className='text-xl font-bold text-green-800'>TOTAL:</span>
                  <span className='text-2xl font-bold text-green-900'>
                    Bs. {getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter className='flex flex-col gap-2'>
          {orderItems.length > 0 && (
            <>
              <Button
                color='success'
                onPress={handleConfirm}
                className='w-full font-bold text-lg'
                size='lg'
              >
                Confirmar Pedido
              </Button>
              <Button
                color='warning'
                variant='flat'
                onPress={handleReset}
                className='w-full'
              >
                Reiniciar Pedido
              </Button>
            </>
          )}
          <Button
            color='default'
            variant='light'
            onPress={onClose}
            className='w-full'
          >
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderDrawer;
