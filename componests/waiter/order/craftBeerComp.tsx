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
    {
      id: 'miel',
      label: 'Miel',
      icon: '🍯',
    },
    {
      id: 'rubia',
      label: 'Rubia',
      icon: '👱🏻‍♀️',
    },
    {
      id: 'negra',
      label: 'Negra',
      icon: '⚫️',
    },
    {
      id: 'roja',
      label: 'Roja',
      icon: '🔴',
    },
  ];

  const beerSizes = [
    {
      id: 'mid-chop',
      price: 15,
      label: 'Chop Mediano',
    },
    {
      id: 'big-chop',
      price: 25,
      label: 'Chop Grande',
    },
    {
      id: 'beer-mug',
      price: 45,
      label: 'Jarra',
    },
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

    setBeerSize(null);
    setBeerType('');
  };

  const isValid = beerSize !== null && beerType !== '';
  const currentPrice = beerSize === 'medium' ? 25 : beerSize === 'large' ? 35 : 0;

  return (
    <div className='space-y-2'>
      <div 
      // className='bg-gradient-to-r from-amber-50 to-yellow-50 p-2 rounded-lg border border-amber-200'
      >
        <h3 className='text-lg font-bold text-amber-800 mb-1 flex items-center gap-2'>
          🍺 Artesanal
        </h3>
        <div className='flex flex-col gap-2 '>
          <div className='p-4 rounded-lg border border-yellow-200'>
            {/* <h3 className='text-lg font-bold text-amber-800 mb-3 flex items-center gap-2'>
              Disponibles
            </h3> */}
            <RadioGroup value={beerType} onValueChange={setBeerType}>
              <div
                className='flex gap-2 justify-center'
                // className='grid grid-cols-1 gap-3'
              >
                {beerTypes.map((beer) => (
                  <Radio key={beer.id} value={beer.id} className='p-2'>
                    <span className='font-medium'>
                      {beer.icon} {beer.label}
                    </span>
                  </Radio>
                ))}
              </div>
            </RadioGroup>
          </div>
          {/* Tamaño */}
          <div 
          // className='bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-200'
          >
            {/* <h3 className='text-lg font-bold text-amber-800 mb-3'>Tamaño</h3> */}
            <ToggleButtonGroup
              value={beerSize}
              // orientation='vertical'
              exclusive
              onChange={handleSizeChange}
              size='small'
              className='w-full'
            >
              {beerSizes.map((element, index) => {
                return (
                  <ToggleButton
                    key={index}
                    value={element.id}
                    className='flex-1'
                  >
                    <div className='flex flex-col items-center py-1'>
                      <span className='font-semibold'>{element.label}</span>
                      <span className='text-xs text-gray-600'>
                        Bs. {element.price}
                      </span>
                    </div>
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </div>
        </div>
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
          size='md'
          className='font-bold'
        >
          Agregar al Pedido
        </Button>
      </div>
    </div>
  );
};
