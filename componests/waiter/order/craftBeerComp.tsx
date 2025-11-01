import { useState } from "react";
import { useOrder } from "@/context/OrderContext";

import {
  RadioGroup,
  Radio, 
  Button
} from '@heroui/react';

import { ToggleButtonGroup, ToggleButton } from '@mui/material';   

interface CraftBeerCompProps {}

export const CraftBeerComp: React.FC<CraftBeerCompProps> = () => {
  const { addOrderItem } = useOrder();
  const [beerSize, setBeerSize] = useState<string | null>(null);
  const [beerType, setBeerType] = useState<string>('');

  const beerTypes = [
    { id: 'ipa', label: 'IPA'},
    { id: 'lager', label: 'Lager'},
    { id: 'stout', label: 'Stout'},
    { id: 'ale', label: 'Ale'},
  ];

  const handleSizeChange = (
    event: React.MouseEvent<HTMLElement>,
    newSize: string | null
  ) => {
    setBeerSize(newSize);
  };

  const addBeerToOrder = () => {
    if (!beerSize || !beerType) return;

    const beerName = beerTypes.find((b) => b.id === beerType)?.label || '';
    const sizeText = beerSize === 'medium' ? 'Vaso mediano' : 'Vaso grande';
    const price = beerSize === 'medium' ? 25 : 35;

    const newOrderItem = {
      id: `${Date.now()}-beer-${beerType}`,
      productType: 'cerveza' as const,
      description: `Cerveza ${beerName} - ${sizeText}`,
      quantity: 1,
      price: price,
      details: {
        size: beerSize,
      },
    };

    addOrderItem(newOrderItem);

    // Reiniciar selección
    setBeerSize(null);
    setBeerType('');
  };

  const isValid = beerSize !== null && beerType !== '';
  const currentPrice =
    beerSize === 'medium' ? 25 : beerSize === 'large' ? 35 : 0;

  return (
    <div className='space-y-6'>
      {/* Tipo de Cerveza */}
      <div className='bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200'>
        <h3 className='text-lg font-bold text-amber-800 mb-3 flex items-center gap-2'>
          🍺 Cerveza Artesanal
        </h3>
        <RadioGroup value={beerType} onValueChange={setBeerType}>
          <div className='grid grid-cols-2 gap-3'>
            {beerTypes.map((beer) => (
              <Radio key={beer.id} value={beer.id} className='p-2'>
                <span className='font-medium'>
                  {beer.label}
                </span>
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Tamaño */}
      <div className='bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-200'>
        <h3 className='text-lg font-bold text-amber-800 mb-3'>Tamaño</h3>
        <ToggleButtonGroup
          value={beerSize}
          exclusive
          onChange={handleSizeChange}
          className='w-full'
        >
          <ToggleButton value='medium' className='flex-1'>
            <div className='flex flex-col items-center py-1'>
              <span className='font-semibold'>Mediano</span>
              <span className='text-xs text-gray-600'>Bs. 25</span>
            </div>
          </ToggleButton>
          <ToggleButton value='large' className='flex-1'>
            <div className='flex flex-col items-center py-1'>
              <span className='font-semibold'>Grande</span>
              <span className='text-xs text-gray-600'>Bs. 35</span>
            </div>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* Vista Previa */}
      {isValid && (
        <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
          <h4 className='text-sm font-semibold text-blue-800 mb-2'>
            Vista Previa:
          </h4>
          <p className='text-blue-900 font-medium'>
            Cerveza {beerTypes.find((b) => b.id === beerType)?.label} -{' '}
            {beerSize === 'medium' ? 'Vaso mediano' : 'Vaso grande'}
          </p>
          <p className='text-blue-700 text-sm mt-1'>
            Precio: Bs. {currentPrice.toFixed(2)}
          </p>
        </div>
      )}

      {/* Botón Agregar */}
      <div className='flex justify-end'>
        <Button
          isDisabled={!isValid}
          color='secondary'
          onPress={addBeerToOrder}
          size='lg'
          className='font-bold'
        >
          Agregar al Pedido
        </Button>
      </div>
    </div>
  );
};
